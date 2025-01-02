const BACK_HOST = process.env.NEXT_PUBLIC_BACK_HOST;
const BACK_PORT = process.env.NEXT_PUBLIC_BACK_PORT;

interface FormData {
  message: string;
  name?: string;
  username?: string;
  phone?: string;
  bot?: boolean;
}

interface QueryParams {
  [key: string]: string | null | undefined;
  refId?: string | null | undefined;
  sub1?: string | null | undefined;
  sub2?: string | null | undefined;
  sub3?: string | null | undefined;
  sub4?: string | null | undefined;
  sub5?: string | null | undefined;
  sub6?: string | null | undefined;
  sub7?: string | null | undefined;
  sub8?: string | null | undefined;
  fbp?: string | null | undefined;
}

const getDefaultUrl = (): string =>
  typeof window !== 'undefined'
    ? document.referrer || 'Не вказано'
    : 'Не вказано';
const url = getDefaultUrl();

const getQueryParams = (): QueryParams => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    refId: searchParams.get('ref_id'),
    sub1: searchParams.get('sub1'),
    sub2: searchParams.get('sub2'),
    sub3: searchParams.get('sub3'),
    sub4: searchParams.get('sub4'),
    sub5: searchParams.get('sub5'),
    sub6: searchParams.get('sub6'),
    sub7: searchParams.get('sub7'),
    sub8: searchParams.get('sub8'),
    fbp: searchParams.get('fbp'),
  };
};

function getParamString(queryParams: QueryParams): string {
  let message = '';

  for (const key in queryParams) {
    if (queryParams[key]) {
      message += `${key} <b>${queryParams[key]}</b>\n`;
    }
  }

  return message;
}

const sendPostRequest = async (
  endpoint: string,
  data: object
): Promise<void> => {
  try {
    const response = await fetch(
      `http://${BACK_HOST}:${BACK_PORT}${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send data to ${endpoint}`);
    }
  } catch (error) {
    console.error(`Error sending data to ${endpoint}:`, error);
    throw error;
  }
};

export const sendToGoogleScript = async (data: FormData): Promise<void> => {
  const requestData = { ...data, url, ...getQueryParams() };
  await sendPostRequest('/api/send-to-google-script', requestData);
};

export const sendMessage = async (sendData: FormData): Promise<void> => {
  const baseMessage = sendData.bot
    ? '<b>Користувач перейшов в бот:</b>'
    : `<b>Користувач відправив форму:</b>\nФІО: <b>${
        sendData.name || ''
      }</b>\nТелефон: <b>${sendData.phone || ''}</b>\nTg username: <b>${
        sendData.username || ''
      }</b>`;

  const message = `${baseMessage}\nUrl: <b>${url}</b>\n${getParamString(
    getQueryParams()
  )}`;

  await sendPostRequest('/api/send-message', { message });
};

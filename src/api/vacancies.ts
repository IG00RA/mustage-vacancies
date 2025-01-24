export interface Skill {
  id: number;
  Skill: string;
}

export interface Requirement {
  id: number;
  Requirement: string;
}

export interface Responsibility {
  id: number;
  Responsibility: string;
}

export interface Advantage {
  id: number;
  Advantage: string;
}

export interface Localization {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Vacancy {
  id: number;
  documentId: string;
  Title: string;
  Description?: string;
  DescriptionFull?: string;
  DescriptionFullAdditional?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  Skills?: Skill[];
  Requirements?: Requirement[];
  Responsibilities?: Responsibility[];
  Advantages?: Advantage[];
  localizations?: Localization[];
}

const host = process.env.NEXT_PUBLIC_ADMIN_HOST;

export async function fetchVacancies(locale: string): Promise<Vacancy[]> {
  let lang = locale;
  if (locale === 'uk') {
    lang = 'uk-UA';
  }
  const url = `${host}/api/vacancies?locale=${lang}&populate=*`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch vacancies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

export async function fetchVacancyById(
  id: string | string[] | undefined,
  locale: string
): Promise<Vacancy> {
  let lang = locale;
  if (locale === 'uk') {
    lang = 'uk-UA';
  }
  const url = `${host}/api/vacancies/${id}?locale=${lang}&populate=*`;

  console.log('url', url);

  const response = await fetch(url);
  console.log('response', response);
  if (!response.ok) {
    throw new Error(`Failed to fetch vacancy: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

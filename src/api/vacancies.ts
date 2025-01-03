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
  Description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Skills: Skill[];
  Requirements: Requirement[];
  Responsibilities: Responsibility[];
  Advantages: Advantage[];
  localizations: Localization[];
}
export async function fetchVacancies(locale: string): Promise<Vacancy[]> {
  const host = process.env.NEXT_PUBLIC_ADMIN_HOST;
  const port = process.env.NEXT_PUBLIC_ADMIN_PORT;

  let lang = locale;
  if (locale === 'uk') {
    lang = 'uk-UA';
  }
  const url = `http://${host}:${port}/api/vacancies?locale=${lang}&populate=*`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch vacancies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

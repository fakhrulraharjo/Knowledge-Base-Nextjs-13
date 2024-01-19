export interface Category {
  id: string;
  sort: null | string; // Assuming sort can be either a string or null
  user_created: string;
  date_created: string;
  user_updated: null | string; // Assuming user_updated can be either a string or null
  date_updated: null | string; // Assuming date_updated can be either a string or null
  name: string;
  description: string;
  slug: string;
}
export interface Post {
  id: string;
  sort: null | string;
  user_created: string;
  date_created: string;
  user_updated: null | string;
  date_updated: null | string;
  title: string;
  content: string;
  tags: number[];
  category: string;
  description: string;
  slug: string;
}

export interface faq {
  question: string;
  answer: string;
}
export interface Scheema {
  category: Category[]; // regular collections are array types
  post: Post[]; // regular collections are array types
  faq: faq[];
}

export interface Language {
  id: string,
  name: string,
  description: string,
  created_at: string,
}

export interface ActiveLanguages {
  [languageName: string]: boolean
}

export interface ConceptItem {
  id: string,
  concept_id:string,
  concept_name: string,
  text: string,
  language: string,
  created_at: string,
  category?: string,
  rank ?: string,
}
export interface ActiveConceptItem extends ConceptItem {
  checked: boolean
}
export interface ConceptTopic {
  id: string,
  name: string,
  description: string,
  created_at: string,
  rank: number,
  category: string,
}
export interface User {
  id: string,
  username: string,
  password ?: string,
  email: string
  created: string,
  isAdmin:boolean,
  imageUrl ?: string,
  strikes: number,
  isbanned: boolean
}

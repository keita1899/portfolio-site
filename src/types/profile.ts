export interface Profile {
  name: string
  title: string
  description: string
  image: string
  location: string
  email: string
  github: string
  linkedin: string
  x: string
}

export interface Skill {
  name: string
  imageUrl: string
  learnings?: string[]
  capabilities?: string[]
}

export interface Skills {
  frontend: Skill[]
  backend: Skill[]
  database: Skill[]
  tools: Skill[]
}

export interface Career {
  company: string
  position: string
  startDate: string
  endDate?: string // 現在の職場の場合はundefined
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements?: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  score?: string
}

export interface Hobby {
  name: string
  description: string
  icon: string
}

export interface ProfileData {
  profile: Profile
  skills: Skills
  career: Career[]
  certifications: Certification[]
  hobbies: Hobby[]
}

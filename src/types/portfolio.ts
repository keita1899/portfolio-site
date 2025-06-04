export type Portfolio = {
  id?: number
  name: string
  thumbnail: string | null
  demo_video: string | null
  url: string | null
  github_url: string | null
  blog_url: string | null
  image1: string | null
  image2: string | null
  image3: string | null
  image4: string | null
  description: string
  period: string
  highlights: string
  challenges: string
  published?: boolean
  created_at?: string
  updated_at?: string
}

export type Feature = {
  id?: number
  portfolio_id: number
  name: string
  created_at?: string
  updated_at?: string
}

export type Page = {
  id?: number
  portfolio_id: number
  name: string
  created_at?: string
  updated_at?: string
}

export type TechStack = {
  id?: number
  portfolio_id: number
  name: string
  version: string | null
  created_at?: string
  updated_at?: string
}

// 関連データを含むポートフォリオの型
export type PortfolioWithRelations = Portfolio & {
  features: Pick<Feature, 'id' | 'name'>[]
  pages: Pick<Page, 'id' | 'name'>[]
  tech_stack: Pick<TechStack, 'id' | 'name' | 'version'>[]
}

export type CreatePortfolioRequest = {
  portfolio: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>
  features: string[]
  pages: string[]
  techStack: Array<{
    name: string
    version?: string
  }>
}

export type UpdatePortfolioRequest = {
  portfolio: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>
  features: string[]
  pages: string[]
  techStack: Array<{
    name: string
    version?: string
  }>
}

// React Hook Form用の型定義
export type PortfolioFormData = {
  name: string
  thumbnail: string
  demo_video: string
  url: string
  github_url: string
  blog_url: string
  image1: string
  image2: string
  image3: string
  image4: string
  description: string
  period: string
  highlights: string
  challenges: string
  published: boolean
  features: Array<{ name: string }>
  pages: Array<{ name: string }>
  techStack: Array<{ name: string; version: string }>
}

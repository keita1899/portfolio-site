import {
  useForm,
  useFieldArray,
  UseFormReturn,
  UseFieldArrayReturn,
} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PortfolioFormData, CreatePortfolioRequest } from '@/types/portfolio'
import { PortfolioService } from '@/services/portfolioService'

export type UsePortfolioFormReturn = {
  form: UseFormReturn<PortfolioFormData>
  featureFields: UseFieldArrayReturn<PortfolioFormData, 'features', 'id'>
  pageFields: UseFieldArrayReturn<PortfolioFormData, 'pages', 'id'>
  techStackFields: UseFieldArrayReturn<PortfolioFormData, 'techStack', 'id'>
  onSubmit: (data: PortfolioFormData) => Promise<void>
}

export const usePortfolioForm = (): UsePortfolioFormReturn => {
  const router = useRouter()

  const form = useForm<PortfolioFormData>({
    defaultValues: {
      name: '',
      thumbnail: '',
      demo_video: '',
      url: '',
      github_url: '',
      blog_url: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      description: '',
      period: '',
      highlights: '',
      challenges: '',
      published: true,
      features: [{ name: '' }],
      pages: [{ name: '' }],
      techStack: [{ name: '', version: '' }],
    },
  })

  const featureFields = useFieldArray({
    control: form.control,
    name: 'features',
  })

  const pageFields = useFieldArray({
    control: form.control,
    name: 'pages',
  })

  const techStackFields = useFieldArray({
    control: form.control,
    name: 'techStack',
  })

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      // データを整形（ファイルアップロード機能は削除）
      const requestData: CreatePortfolioRequest = {
        portfolio: {
          name: data.name,
          thumbnail: data.thumbnail || null,
          demo_video: data.demo_video || null,
          url: data.url || null,
          github_url: data.github_url || null,
          blog_url: data.blog_url || null,
          image1: data.image1 || null,
          image2: data.image2 || null,
          image3: data.image3 || null,
          image4: data.image4 || null,
          description: data.description,
          period: data.period,
          highlights: data.highlights,
          challenges: data.challenges,
          published: data.published,
        },
        features: data.features
          .filter((f) => f.name.trim() !== '')
          .map((f) => f.name),
        pages: data.pages
          .filter((p) => p.name.trim() !== '')
          .map((p) => p.name),
        techStack: data.techStack
          .filter((t) => t.name.trim() !== '')
          .map((t) => ({
            name: t.name,
            version: t.version || undefined,
          })),
      }

      await PortfolioService.createPortfolio(requestData)
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error creating portfolio:', error)
      alert('ポートフォリオの作成に失敗しました')
    }
  }

  return {
    form,
    featureFields,
    pageFields,
    techStackFields,
    onSubmit,
  }
}

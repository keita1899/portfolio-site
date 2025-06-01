'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PortfolioFormData } from '@/types/portfolio'
import { PortfolioService } from '@/services/portfolioService'

export const usePortfolioEdit = (portfolioId: string) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [portfolioName, setPortfolioName] = useState('')

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

  // ポートフォリオデータを取得してフォームに設定
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!portfolioId) return

      try {
        const response = await PortfolioService.getPortfolio(portfolioId)
        const portfolio = response.portfolio

        setPortfolioName(portfolio.name)

        // フォームデータを設定
        form.reset({
          name: portfolio.name || '',
          thumbnail: portfolio.thumbnail || '',
          demo_video: portfolio.demo_video || '',
          url: portfolio.url || '',
          github_url: portfolio.github_url || '',
          blog_url: portfolio.blog_url || '',
          image1: portfolio.image1 || '',
          image2: portfolio.image2 || '',
          image3: portfolio.image3 || '',
          image4: portfolio.image4 || '',
          description: portfolio.description || '',
          period: portfolio.period || '',
          highlights: portfolio.highlights || '',
          challenges: portfolio.challenges || '',
          published: portfolio.published === true,
          features:
            portfolio.features?.length > 0
              ? portfolio.features.map((f) => ({ name: f.name }))
              : [{ name: '' }],
          pages:
            portfolio.pages?.length > 0
              ? portfolio.pages.map((p) => ({ name: p.name }))
              : [{ name: '' }],
          techStack:
            portfolio.tech_stack?.length > 0
              ? portfolio.tech_stack.map((t) => ({
                  name: t.name,
                  version: t.version || '',
                }))
              : [{ name: '', version: '' }],
        })
      } catch (err) {
        console.error('Failed to fetch portfolio:', err)
        setError('ポートフォリオの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioId])

  const onSubmit = async (data: PortfolioFormData) => {
    // 編集機能は未実装
    alert('編集機能は未実装です')
    console.log(data)
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await PortfolioService.deletePortfolio(portfolioId)
      alert('ポートフォリオを削除しました')
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error deleting portfolio:', error)
      alert('ポートフォリオの削除に失敗しました')
    } finally {
      setDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return {
    form,
    featureFields,
    pageFields,
    techStackFields,
    onSubmit,
    loading,
    error,
    deleting,
    showDeleteDialog,
    portfolioName,
    setShowDeleteDialog,
    handleDelete,
  }
}

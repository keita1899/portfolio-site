'use client'

import { useParams } from 'next/navigation'
import { usePortfolioEdit } from '@/hooks/usePortfolioEdit'
import { PortfolioForm } from '@/components/PortfolioForm'
import Link from 'next/link'

export default function EditPortfolioPage() {
  const params = useParams()
  const portfolioId = params.id as string

  const {
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
  } = usePortfolioEdit(portfolioId)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Link
            href="/admin/dashboard"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PortfolioForm
      form={form}
      featureFields={featureFields}
      pageFields={pageFields}
      techStackFields={techStackFields}
      onSubmit={onSubmit}
      isEditMode={true}
      onDelete={handleDelete}
      deleting={deleting}
      showDeleteDialog={showDeleteDialog}
      portfolioName={portfolioName}
      setShowDeleteDialog={setShowDeleteDialog}
    />
  )
}

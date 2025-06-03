'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PortfolioWithRelations } from '@/types/portfolio'
import { PortfolioService } from '@/services/portfolioService'
import { PortfolioCardList } from '@/components/ui/PortfolioCardList'

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<PortfolioWithRelations[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await PortfolioService.getPortfolios()
        setPortfolios(data.portfolios || [])
      } catch (error) {
        console.error('Failed to fetch portfolios:', error)
        setPortfolios([])
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading...
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              すべてのポートフォリオ
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              これまでに制作したWebアプリケーションやプロジェクトの一覧です。
            </p>

            {/* ホームに戻るリンク */}
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ホームに戻る
            </Link>
          </div>

          {/* ポートフォリオ一覧 */}
          <PortfolioCardList
            portfolios={portfolios}
            showStatus={false}
            showEditLink={false}
            emptyStateTitle="ポートフォリオはありません"
            emptyStateDescription="現在、公開可能なポートフォリオはありません。"
            showAddButton={false}
          />
        </div>
      </div>
    </main>
  )
}

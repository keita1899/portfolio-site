'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { PortfolioWithRelations } from '@/types/portfolio'
import { useAuth } from '@clerk/nextjs'
import { StatsGrid, FilterType } from '@/components/dashboard/StatsGrid'
import { PortfolioCardList } from '@/components/dashboard/PortfolioCardList'
import Link from 'next/link'

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<PortfolioWithRelations[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const { userId, isLoaded, isSignedIn } = useAuth()

  console.log('Auth state:', { userId, isLoaded, isSignedIn })

  useEffect(() => {
    const fetchPortfolios = async () => {
      // 認証状態が読み込まれるまで待つ
      if (!isLoaded) {
        return
      }

      if (!isSignedIn || !userId) {
        setError('認証が必要です')
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()

        // ポートフォリオ一覧を取得（関連データも含む）
        const { data, error: fetchError } = await supabase
          .from('portfolios')
          .select(
            `
            *,
            features (id, name),
            pages (id, name),
            tech_stack (id, name, version)
          `,
          )
          .order('created_at', { ascending: false })

        if (fetchError) {
          console.error('Portfolio fetch error:', fetchError)
          setError('ポートフォリオの取得に失敗しました')
        } else {
          setPortfolios(data || [])
          setError(null) // エラーをクリア
        }
      } catch (err) {
        console.error('Failed to fetch portfolios:', err)
        setError('ポートフォリオの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [userId, isLoaded, isSignedIn])

  // 統計情報を計算
  const publishedCount = portfolios.filter((p) => p.published !== false).length
  const unpublishedCount = portfolios.filter(
    (p) => p.published === false,
  ).length

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter)
  }

  const handleClearFilter = () => {
    setCurrentFilter('all')
  }

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* エラー表示 */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* ポートフォリオ一覧のヘッダー */}
          {!error && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                ポートフォリオ一覧
              </h2>
              <Link
                href="/admin/dashboard/portfolios/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                ポートフォリオを追加
              </Link>
            </div>
          )}

          {/* 統計情報 */}
          {!error && (
            <StatsGrid
              totalCount={portfolios.length}
              publishedCount={publishedCount}
              unpublishedCount={unpublishedCount}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
            />
          )}

          {/* ポートフォリオ一覧 */}
          {!error && (
            <PortfolioCardList
              portfolios={portfolios}
              currentFilter={currentFilter}
              onClearFilter={handleClearFilter}
            />
          )}
        </div>
      </main>
    </div>
  )
}

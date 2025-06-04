import Link from 'next/link'
import { PortfolioWithRelations } from '@/types/portfolio'
import { AdminPortfolioCard } from './AdminPortfolioCard'

type AdminPortfolioCardListProps = {
  portfolios: PortfolioWithRelations[]
  emptyStateTitle?: string
  emptyStateDescription?: string
}

export const AdminPortfolioCardList = ({
  portfolios,
  emptyStateTitle = 'ポートフォリオがありません',
  emptyStateDescription = '最初のポートフォリオを追加して始めましょう。',
}: AdminPortfolioCardListProps) => {
  return (
    <div className="mb-8">
      {/* ポートフォリオ一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <AdminPortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>

      {/* 空の状態（ポートフォリオがない場合） */}
      {portfolios.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {emptyStateTitle}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {emptyStateDescription}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/dashboard/portfolios/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </div>
      )}
    </div>
  )
}

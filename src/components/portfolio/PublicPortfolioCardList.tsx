import { PortfolioWithRelations } from '@/types/portfolio'
import { PublicPortfolioCard } from './PublicPortfolioCard'

type PublicPortfolioCardListProps = {
  portfolios: PortfolioWithRelations[]
  emptyStateTitle?: string
  emptyStateDescription?: string
}

export const PublicPortfolioCardList = ({
  portfolios,
  emptyStateTitle = 'ポートフォリオはありません',
  emptyStateDescription = '現在、公開可能なポートフォリオはありません。',
}: PublicPortfolioCardListProps) => {
  return (
    <div className="mb-8">
      {/* ポートフォリオ一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <PublicPortfolioCard key={portfolio.id} portfolio={portfolio} />
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
        </div>
      )}
    </div>
  )
}

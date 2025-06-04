import { PortfolioWithRelations } from '@/types/portfolio'
import Link from 'next/link'
import Image from 'next/image'

type PublicPortfolioCardProps = {
  portfolio: PortfolioWithRelations
}

export const PublicPortfolioCard = ({
  portfolio,
}: PublicPortfolioCardProps) => {
  return (
    <Link
      href={`/portfolios/${portfolio.id}`}
      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer block"
    >
      {/* サムネイル画像 */}
      {portfolio.thumbnail && (
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          <Image
            src={portfolio.thumbnail}
            alt={portfolio.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {portfolio.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {portfolio.description}
        </p>

        {/* 技術スタック */}
        {portfolio.tech_stack && portfolio.tech_stack.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {portfolio.tech_stack.slice(0, 4).map((tech) => (
                <span
                  key={tech.id}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                >
                  {tech.name}
                  {tech.version && ` ${tech.version}`}
                </span>
              ))}
              {portfolio.tech_stack.length > 4 && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  +{portfolio.tech_stack.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div>
            作成:{' '}
            {portfolio.created_at
              ? new Date(portfolio.created_at).toLocaleDateString('ja-JP')
              : '不明'}
          </div>
        </div>
      </div>
    </Link>
  )
}

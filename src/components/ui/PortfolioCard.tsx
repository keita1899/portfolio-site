import { PortfolioWithRelations } from '@/types/portfolio'
import Link from 'next/link'
import Image from 'next/image'

type PortfolioCardProps = {
  portfolio: PortfolioWithRelations
  showStatus?: boolean
  showEditLink?: boolean
}

export const PortfolioCard = ({
  portfolio,
  showStatus = true,
  showEditLink = true,
}: PortfolioCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {portfolio.name}
          </h3>
          {showStatus && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                portfolio.published === true
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              {portfolio.published === true ? '公開中' : '非公開'}
            </span>
          )}
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

        {/* リンク */}
        <div className="flex gap-2 mb-4">
          {portfolio.url && (
            <a
              href={portfolio.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center ${
                showEditLink
                  ? 'px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700'
                  : 'px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              } rounded-md font-medium`}
            >
              <svg
                className={`${showEditLink ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {showEditLink ? 'Demo' : 'デモを見る'}
            </a>
          )}
          {portfolio.github_url && (
            <a
              href={portfolio.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center ${
                showEditLink
                  ? 'px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'px-3 py-2 text-sm bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              } rounded-md font-medium`}
            >
              <svg
                className={`${showEditLink ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>

        <div
          className={`${
            showEditLink ? 'flex items-center justify-between' : ''
          } text-xs text-gray-500 dark:text-gray-400`}
        >
          <div>
            <div>
              作成:{' '}
              {portfolio.created_at
                ? new Date(portfolio.created_at).toLocaleDateString('ja-JP')
                : '不明'}
            </div>
            {showEditLink &&
              portfolio.updated_at &&
              portfolio.updated_at !== portfolio.created_at && (
                <div>
                  更新:{' '}
                  {new Date(portfolio.updated_at).toLocaleDateString('ja-JP')}
                </div>
              )}
          </div>
          {showEditLink && (
            <div className="flex justify-end">
              <Link
                href={`/admin/dashboard/portfolios/${portfolio.id}/edit`}
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                編集
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

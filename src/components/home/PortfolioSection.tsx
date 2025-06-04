import Link from 'next/link'
import { PortfolioWithRelations } from '@/types/portfolio'
import { PublicPortfolioCardList } from '@/components/portfolio/PublicPortfolioCardList'

interface PortfolioSectionProps {
  portfolios: PortfolioWithRelations[]
}

export const PortfolioSection = ({ portfolios }: PortfolioSectionProps) => {
  // 最新の3つのポートフォリオのみ表示
  const displayedPortfolios = portfolios.slice(0, 3)

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Portfolio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              これまでに制作したWebアプリケーションやプロジェクトの一部をご紹介します。
            </p>
          </div>

          {/* ポートフォリオ一覧 */}
          {displayedPortfolios.length > 0 ? (
            <>
              <PublicPortfolioCardList portfolios={displayedPortfolios} />

              {/* すべて見るリンク */}
              <div className="text-center">
                <Link
                  href="/portfolios"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  すべてのポートフォリオを見る
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                現在、公開可能なポートフォリオはありません。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

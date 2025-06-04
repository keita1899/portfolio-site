'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PortfolioService } from '@/services/portfolioService'
import { PortfolioWithRelations } from '@/types/portfolio'
import Link from 'next/link'
import Image from 'next/image'

export default function PortfolioDetailPage() {
  const params = useParams()
  const [portfolio, setPortfolio] = useState<PortfolioWithRelations | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!params?.id) return

      try {
        const { portfolio: data } = await PortfolioService.getPortfolio(
          params.id as string,
        )
        setPortfolio(data)
      } catch (err) {
        console.error('Failed to fetch portfolio:', err)
        setError('ポートフォリオが見つかりません')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [params?.id])

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

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ポートフォリオが見つかりません
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error ||
              'お探しのポートフォリオは存在しないか、公開されていません。'}
          </p>
          <Link
            href="/portfolios"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            ポートフォリオ一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* ナビゲーション */}
          <div className="mb-8">
            <Link
              href="/portfolios"
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
              ポートフォリオ一覧に戻る
            </Link>
          </div>

          {/* ポートフォリオ名 */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {portfolio.name}
            </h1>
          </div>

          {/* 制作期間とリンク */}
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* 制作期間（左側） */}
            <div>
              {portfolio.period && (
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  <span className="font-medium">制作期間:</span>{' '}
                  {portfolio.period}
                </p>
              )}
            </div>

            {/* リンク（右側） */}
            <div className="flex flex-wrap gap-4">
              {portfolio.url && (
                <a
                  href={portfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  デモを見る
                </a>
              )}
              {portfolio.github_url && (
                <a
                  href={portfolio.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {portfolio.blog_url && (
                <a
                  href={portfolio.blog_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  ブログ記事
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* 概要 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                概要
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {portfolio.description}
              </p>
            </div>

            {/* 主な機能 */}
            {portfolio.features && portfolio.features.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  主な機能
                </h2>
                <ul className="space-y-2">
                  {portfolio.features.map((feature) => (
                    <li
                      key={feature.id}
                      className="text-gray-700 dark:text-gray-300 flex items-start"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 技術スタック */}
            {portfolio.tech_stack && portfolio.tech_stack.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  技術スタック
                </h2>
                <div className="flex flex-wrap gap-2">
                  {portfolio.tech_stack.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                    >
                      {tech.name}
                      {tech.version && (
                        <span className="ml-1 text-blue-600 dark:text-blue-300">
                          {tech.version}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ページ一覧 */}
            {portfolio.pages && portfolio.pages.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  ページ一覧
                </h2>
                <ul className="space-y-2">
                  {portfolio.pages.map((page) => (
                    <li
                      key={page.id}
                      className="text-gray-700 dark:text-gray-300 flex items-start"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {page.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* こだわった部分 */}
            {portfolio.highlights && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  こだわった部分
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {portfolio.highlights}
                </p>
              </div>
            )}

            {/* 苦労した部分 */}
            {portfolio.challenges && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  苦労した部分
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {portfolio.challenges}
                </p>
              </div>
            )}
          </div>

          {/* デモ動画（最後に配置） */}
          {portfolio.demo_video && (
            <div className="mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  デモ動画
                </h2>
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <video
                    src={portfolio.demo_video}
                    controls
                    className="w-full h-full object-cover"
                  >
                    お使いのブラウザはvideo要素をサポートしていません。
                  </video>
                </div>
              </div>
            </div>
          )}

          {/* 追加画像（最後に配置） */}
          {(portfolio.image1 ||
            portfolio.image2 ||
            portfolio.image3 ||
            portfolio.image4) && (
            <div className="mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  スクリーンショット
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    portfolio.image1,
                    portfolio.image2,
                    portfolio.image3,
                    portfolio.image4,
                  ]
                    .filter(Boolean)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image!}
                          alt={`${portfolio.name} スクリーンショット ${
                            index + 1
                          }`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

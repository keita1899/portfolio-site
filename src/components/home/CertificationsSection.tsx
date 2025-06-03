import { Certification } from '@/types/profile'

interface CertificationsSectionProps {
  certifications: Certification[]
}

const CertificationCard = ({
  certification,
}: {
  certification: Certification
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {certification.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {certification.issuer}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            取得日: {formatDate(certification.date)}
          </p>
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        {certification.credentialId && (
          <span className="text-gray-500 dark:text-gray-400">
            ID: {certification.credentialId}
          </span>
        )}
        {certification.score && (
          <span className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
            {certification.score}
          </span>
        )}
      </div>
    </div>
  )
}

export const CertificationsSection = ({
  certifications,
}: CertificationsSectionProps) => {
  if (certifications.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certifications
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              技術力向上と専門知識の証明として取得した資格・認定です。
            </p>
          </div>

          {/* 資格リスト */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((certification, index) => (
              <CertificationCard key={index} certification={certification} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

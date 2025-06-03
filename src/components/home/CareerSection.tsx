import { Career } from '@/types/profile'

interface CareerSectionProps {
  career: Career[]
}

const CareerCard = ({
  experience,
  isLast,
}: {
  experience: Career
  isLast: boolean
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })
  }

  const getPeriod = () => {
    const start = formatDate(experience.startDate)
    const end = experience.endDate ? formatDate(experience.endDate) : '現在'
    return `${start} - ${end}`
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600"></div>
      )}

      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>

      {/* Content */}
      <div className="ml-16 pb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          {/* Header */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {experience.company}
              </h3>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {getPeriod()}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {experience.position}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              💼 担当業務
            </h5>
            <ul className="space-y-1">
              {experience.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                >
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              🛠️ 使用技術
            </h5>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                🏆 主な成果・実績
              </h5>
              <ul className="space-y-1">
                {experience.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                  >
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const CareerSection = ({ career }: CareerSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Career Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              大学卒業後からの職歴です。様々な環境で経験を積み、技術力とチームワークを向上させてきました。
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {career.map((experience, index) => (
              <CareerCard
                key={index}
                experience={experience}
                isLast={index === career.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

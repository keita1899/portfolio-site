import { Hobby } from '@/types/profile'

interface HobbiesSectionProps {
  hobbies: Hobby[]
}

const HobbyCard = ({ hobby }: { hobby: Hobby }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-center">
      <div className="text-4xl mb-4">{hobby.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {hobby.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {hobby.description}
      </p>
    </div>
  )
}

export const HobbiesSection = ({ hobbies }: HobbiesSectionProps) => {
  if (hobbies.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hobbies & Interests
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              仕事以外の時間に取り組んでいることや興味のあることです。多様な経験が創造性と問題解決能力を育んでいます。
            </p>
          </div>

          {/* 趣味グリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <HobbyCard key={index} hobby={hobby} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

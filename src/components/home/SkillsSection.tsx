'use client'

import { useState } from 'react'
import { Skills, Skill } from '@/types/profile'
import Image from 'next/image'

interface SkillsSectionProps {
  skills: Skills
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex-shrink-0">
              <Image
                src={skill.imageUrl}
                alt={`${skill.name} logo`}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {skill.name}
            </h4>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isExpanded ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-700">
          {skill.learnings && skill.learnings.length > 0 && (
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                📚 学んだこと
              </h5>
              <ul className="space-y-1">
                {skill.learnings.map((learning, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                  >
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skill.capabilities && skill.capabilities.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                🚀 できること
              </h5>
              <ul className="space-y-1">
                {skill.capabilities.map((capability, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                  >
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const SkillCategory = ({
  title,
  skills,
  icon,
}: {
  title: string
  skills: Skill[]
  icon: string
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              これまでの開発経験で習得した技術スタックです。日々新しい技術の学習に取り組んでいます。
            </p>
          </div>

          {/* スキルカテゴリ */}
          <div className="space-y-12">
            <SkillCategory
              title="Frontend"
              skills={skills.frontend}
              icon="🎨"
            />
            <SkillCategory title="Backend" skills={skills.backend} icon="⚙️" />
            <SkillCategory
              title="Database"
              skills={skills.database}
              icon="🗄️"
            />
            <SkillCategory
              title="Tools & Others"
              skills={skills.tools}
              icon="🔧"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

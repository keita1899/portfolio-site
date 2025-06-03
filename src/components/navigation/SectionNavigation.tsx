'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'ホーム', icon: '🏠' },
  { id: 'skills', label: 'スキル', icon: '💻' },
  { id: 'career', label: '経歴', icon: '💼' },
  { id: 'portfolio', label: 'ポートフォリオ', icon: '🎨' },
  { id: 'certifications', label: '資格', icon: '🏆' },
  { id: 'hobbies', label: '趣味', icon: '🎯' },
]

export const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)

      // 現在のセクションを判定
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      const currentSection = sectionElements.find((section) => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (!isVisible) return null

  return (
    <nav className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full shadow-lg">
      <div className="flex items-center px-2 py-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-base">{section.icon}</span>
            <span className="hidden sm:block">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

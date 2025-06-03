'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { SkillsSection } from '@/components/home/SkillsSection'
import { CareerSection } from '@/components/home/CareerSection'
import { PortfolioSection } from '@/components/home/PortfolioSection'
import { CertificationsSection } from '@/components/home/CertificationsSection'
import { HobbiesSection } from '@/components/home/HobbiesSection'
import { SectionNavigation } from '@/components/navigation/SectionNavigation'
import profileData from '@/data/profile.json'
import { ProfileData } from '@/types/profile'
import { PortfolioWithRelations } from '@/types/portfolio'
import { PortfolioService } from '@/services/portfolioService'

const typedProfileData = profileData as ProfileData

export default function HomePage() {
  const [portfolios, setPortfolios] = useState<PortfolioWithRelations[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await PortfolioService.getPortfolios()
        setPortfolios(data.portfolios || [])
      } catch (error) {
        console.error('Failed to fetch portfolios:', error)
        setPortfolios([])
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* セクションナビゲーション */}
      <SectionNavigation />

      <main className="min-h-screen">
        {/* ヒーローセクション */}
        <section id="hero">
          <HeroSection profile={typedProfileData.profile} />
        </section>

        {/* 経歴セクション */}
        <section id="career">
          <CareerSection career={typedProfileData.career} />
        </section>

        {/* ポートフォリオセクション */}
        <section id="portfolio">
          <PortfolioSection portfolios={portfolios} />
        </section>

        {/* スキルセクション */}
        <section id="skills">
          <SkillsSection skills={typedProfileData.skills} />
        </section>

        {/* 資格セクション */}
        <section id="certifications">
          <CertificationsSection
            certifications={typedProfileData.certifications}
          />
        </section>

        {/* 趣味セクション */}
        <section id="hobbies">
          <HobbiesSection hobbies={typedProfileData.hobbies} />
        </section>
      </main>
    </>
  )
}

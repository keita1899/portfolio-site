'use client'

import { usePortfolioForm } from '@/hooks/usePortfolioForm'
import { PortfolioForm } from '@/components/PortfolioForm'

export default function NewPortfolioPage() {
  const portfolioFormProps = usePortfolioForm()

  return <PortfolioForm {...portfolioFormProps} />
}

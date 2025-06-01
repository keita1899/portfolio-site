import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { checkAuth } from '@/utils/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 認証チェック
    const { error: authError } = await checkAuth()
    if (authError) return authError

    const { id: portfolioId } = await params

    if (!portfolioId) {
      return NextResponse.json(
        { error: 'Portfolio ID is required' },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    // ポートフォリオの存在確認
    const { data: portfolio, error: fetchError } = await supabase
      .from('portfolios')
      .select('id, name')
      .eq('id', portfolioId)
      .single()

    if (fetchError || !portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 },
      )
    }

    // 関連データを削除（順序重要）
    console.log(`Deleting portfolio: ${portfolio.name} (${portfolioId})`)

    // tech_stack削除
    const { error: techStackError } = await supabase
      .from('tech_stack')
      .delete()
      .eq('portfolio_id', portfolioId)

    if (techStackError) {
      console.error('Tech stack deletion error:', techStackError)
      throw new Error('Failed to delete tech stack')
    }

    // pages削除
    const { error: pagesError } = await supabase
      .from('pages')
      .delete()
      .eq('portfolio_id', portfolioId)

    if (pagesError) {
      console.error('Pages deletion error:', pagesError)
      throw new Error('Failed to delete pages')
    }

    // features削除
    const { error: featuresError } = await supabase
      .from('features')
      .delete()
      .eq('portfolio_id', portfolioId)

    if (featuresError) {
      console.error('Features deletion error:', featuresError)
      throw new Error('Failed to delete features')
    }

    // ポートフォリオ本体を削除
    const { error: portfolioError } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', portfolioId)

    if (portfolioError) {
      console.error('Portfolio deletion error:', portfolioError)
      throw new Error('Failed to delete portfolio')
    }

    console.log(`Portfolio deleted successfully: ${portfolioId}`)

    return NextResponse.json(
      {
        message: 'Portfolio deleted successfully',
        deletedPortfolio: portfolio,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 認証チェック
    const { error: authError } = await checkAuth()
    if (authError) return authError

    const { id: portfolioId } = await params
    const supabase = await createClient()

    // ポートフォリオと関連データを取得
    const { data: portfolio, error } = await supabase
      .from('portfolios')
      .select(
        `
        *,
        features (id, name),
        pages (id, name),
        tech_stack (id, name, version)
      `,
      )
      .eq('id', portfolioId)
      .single()

    if (error || !portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ portfolio }, { status: 200 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

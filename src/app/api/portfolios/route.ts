import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { CreatePortfolioRequest } from '@/types/portfolio'
export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()
  const body: CreatePortfolioRequest = await request.json()

  const rollback = async (portfolioId: string) => {
    await supabase.from('tech_stack').delete().eq('portfolio_id', portfolioId)
    await supabase.from('pages').delete().eq('portfolio_id', portfolioId)
    await supabase.from('features').delete().eq('portfolio_id', portfolioId)
    await supabase.from('portfolios').delete().eq('id', portfolioId)
  }

  const insertRelatedData = async <T>(
    table: string,
    data: T[],
    rollbackFn: () => Promise<void>,
    errorMessage: string,
  ) => {
    const { error } = await supabase.from(table).insert(data)
    if (error) {
      console.error(`${table} insert error:`, error)
      await rollbackFn()
      throw new Error(errorMessage)
    }
  }

  try {
    // ポートフォリオ挿入
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolios')
      .insert([body.portfolio])
      .select()
      .single()

    if (portfolioError || !portfolio) {
      throw new Error('Failed to create portfolio')
    }

    const portfolioId = portfolio.id

    // features
    if (body.features.length > 0) {
      const features = body.features.map((name) => ({
        portfolio_id: portfolioId,
        name,
      }))
      await insertRelatedData(
        'features',
        features,
        async () => {
          await supabase.from('portfolios').delete().eq('id', portfolioId)
        },
        'Failed to create features',
      )
    }

    // pages
    if (body.pages.length > 0) {
      const pages = body.pages.map((name) => ({
        portfolio_id: portfolioId,
        name,
      }))
      await insertRelatedData(
        'pages',
        pages,
        async () => {
          await supabase
            .from('features')
            .delete()
            .eq('portfolio_id', portfolioId)
          await supabase.from('portfolios').delete().eq('id', portfolioId)
        },
        'Failed to create pages',
      )
    }

    // tech_stack
    if (body.techStack.length > 0) {
      const techStack = body.techStack.map((tech) => ({
        portfolio_id: portfolioId,
        name: tech.name,
        version: tech.version || null,
      }))
      await insertRelatedData(
        'tech_stack',
        techStack,
        async () => {
          await rollback(portfolioId)
        },
        'Failed to create tech stack',
      )
    }

    return NextResponse.json(
      {
        message: 'Portfolio created successfully',
        portfolio,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 },
    )
  }
}

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { checkAuth } from '@/utils/auth'

export async function GET() {
  try {
    // 管理画面では認証が必要
    const { error: authError } = await checkAuth()
    if (authError) return authError

    const supabase = await createClient()

    // 全てのポートフォリオを取得（公開・非公開問わず）
    const { data: portfolios, error } = await supabase
      .from('portfolios')
      .select(
        `
        *,
        features (id, name),
        pages (id, name),
        tech_stack (id, name, version)
      `,
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Portfolio fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch portfolios' },
        { status: 500 },
      )
    }

    return NextResponse.json({ portfolios }, { status: 200 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

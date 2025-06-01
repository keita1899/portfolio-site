import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

/**
 * API ルートで認証をチェックするユーティリティ関数
 * @returns userId または認証エラーレスポンス
 */
export async function checkAuth() {
  const { userId } = await auth()

  if (!userId) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      userId: null,
    }
  }

  return {
    error: null,
    userId,
  }
}

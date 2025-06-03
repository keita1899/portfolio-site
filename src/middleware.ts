import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// 保護されたルート（ログインが必要）
const isProtectedRoute = createRouteMatcher(['/admin/dashboard(.*)'])

// 公開ルート（認証不要）
const isPublicRoute = createRouteMatcher([
  '/',
  '/portfolios(.*)',
  '/api/portfolios(.*)', // ポートフォリオAPI（GET）は公開
])

export default clerkMiddleware(async (auth, req) => {
  // 公開ルートの場合は認証チェックをスキップ
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  if (isProtectedRoute(req)) {
    const { userId } = await auth()

    if (!userId) {
      // 未認証の場合、カスタムログインページにリダイレクト
      const signinUrl = new URL('/admin/signin', req.url)
      return NextResponse.redirect(signinUrl)
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

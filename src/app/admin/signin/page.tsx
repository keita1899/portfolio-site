'use client'

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            管理者ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            ポートフォリオ管理画面へのアクセス
          </p>
        </div>
        
        <div className="flex justify-center">
          <SignIn 
            routing="hash"
            fallbackRedirectUrl="/admin/dashboard"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white dark:bg-gray-800 shadow-lg border-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium",
                socialButtonsBlockButton: "hidden",
                footerAction: "hidden"
              }
            }}
          />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← サイトトップに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

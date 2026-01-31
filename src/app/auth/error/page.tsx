"use client"
import Link from "next/link"

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-6">
          Your account is not authorized to access this dashboard.
        </p>
        <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">
          Try again
        </Link>
      </div>
    </div>
  )
}

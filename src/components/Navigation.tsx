"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Skills", href: "/skills", icon: "🛠️" },
  ]

  return (
    <>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">TeleClaude</h1>
        </div>

        {session && (
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm hidden sm:inline">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="text-gray-400 hover:text-white text-sm"
            >
              Sign out
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <div className={`fixed left-0 top-14 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 top-14"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

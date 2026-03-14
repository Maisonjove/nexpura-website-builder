'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navGroups = [
  {
    label: 'Website',
    items: [
      { href: '/builder/pages', label: 'Pages', icon: '📄' },
      { href: '/builder/theme', label: 'Theme', icon: '🎨' },
      { href: '/builder/settings', label: 'Settings', icon: '⚙️' },
      { href: '/builder/migrate', label: 'Migrate Site', icon: '🔄' },
      { href: '/builder/connect', label: 'Connect', icon: '🔗' },
    ],
  },
  {
    label: 'Products',
    items: [
      { href: '/builder/passport', label: 'Passports', icon: '🔒' },
      { href: '/builder/documents', label: 'Documents', icon: '📋' },
    ],
  },
  {
    label: 'Communications',
    items: [
      { href: '/builder/emails', label: 'Emails', icon: '📧' },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/builder/billing', label: 'Billing', icon: '💳' },
    ],
  },
]

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-nexpura-forest text-white flex flex-col shadow-xl overflow-y-auto">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-nexpura-mint rounded-lg flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <div>
              <div className="font-playfair font-semibold text-sm tracking-wide">Nexpura</div>
              <div className="text-xs text-white/50">Website Builder</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-semibold text-white/30 uppercase tracking-wider mb-1.5">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-nexpura-mint text-white font-medium'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10 flex-shrink-0 space-y-1">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors py-1"
          >
            <span>👁</span>
            <span>Preview Site</span>
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors py-1"
          >
            <span>🔐</span>
            <span>Super Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

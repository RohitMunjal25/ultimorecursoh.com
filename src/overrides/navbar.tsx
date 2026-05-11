'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FileText, Mail, Menu, UserRound, Users, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

/** Matches the dark-CTA block on the home page (`/`) — “Sign up” / “Sign in”. */
const homeCtaSignUpClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8c00] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#e67e00]'

const homeCtaSignInClass =
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10'

const navItems = [
  { name: 'Home', href: '/', icon: null as null },
  { name: 'PDF Services', href: '/pdf', icon: FileText },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const activePath = useMemo(() => pathname, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#004040] text-white shadow-[0_2px_24px_rgba(0,0,0,0.12)]">
      <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white p-1.5 shadow-inner">
            <img src="/favicon.png?v=20260422" alt="" width={48} height={48} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-base font-bold uppercase tracking-[0.06em] text-white">{SITE_CONFIG.name}</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? activePath === '/' : activePath.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors',
                  isActive ? 'bg-white/15 text-white' : 'text-teal-100/90 hover:bg-white/10 hover:text-white',
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <>
              <Link href="/register" className={homeCtaSignUpClass}>
                Sign up
              </Link>
              <Link href="/login" className={homeCtaSignInClass}>
                Sign in
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#003535] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? activePath === '/' : activePath.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-wide',
                    isActive ? 'bg-white/15 text-white' : 'text-teal-100 hover:bg-white/10',
                  )}
                >
                  {Icon ? <Icon className="h-5 w-5 shrink-0 text-[#ff8c00]" /> : null}
                  {item.name}
                </Link>
              )
            })}
            {!isAuthenticated ? (
              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Link href="/register" onClick={() => setOpen(false)} className={`${homeCtaSignUpClass} w-full`}>
                  Sign up
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className={`${homeCtaSignInClass} w-full`}>
                  Sign in
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}

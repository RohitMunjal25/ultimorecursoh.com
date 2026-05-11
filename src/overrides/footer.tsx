import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="mt-auto border-t border-[#003030] bg-[#004040] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white p-2">
                <img src="/favicon.png?v=20260422" alt="" width={56} height={56} className="h-full w-full object-contain" />
              </span>
              <span className="block text-lg font-bold uppercase tracking-wide">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-teal-100/90">
              Production-grade PDFs and document systems for modern teams.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-[#ff8c00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e67e00]"
            >
              Contact us
            </Link>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff8c00]">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-teal-50">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pdf" className="transition-colors hover:text-white">
                  PDF services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff8c00]">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-teal-50">
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Page
                </Link>
              </li>
            </ul>
            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#ff8c00]">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-teal-50">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-teal-200/80">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

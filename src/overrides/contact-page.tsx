import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContactForm } from '@/components/contact/contact-form'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const sideImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80'

const handlingSteps = [
  { step: '01', title: 'Triage & owner', body: 'Your note lands in a project inbox—no “ticket number only” autoreplies. We name who reads it first.' },
  { step: '02', title: 'Clarify scope', body: 'If we need a sample file or a deadline, you will get one short email, not a chain of back-and-forth form letters.' },
  { step: '03', title: 'Next step in writing', body: 'We reply with options, a rough timeline, and how PDF work lines up with any profile work you mentioned.' },
]

const gridPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004040' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

export function ContactPageOverride() {
  const email = `hello@${SITE_CONFIG.domain}`

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden border-b border-[#d4e0df] bg-white">
          <div className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: gridPattern }} />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.02fr] lg:items-stretch lg:gap-14 lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#d4e0df] bg-white p-1.5 shadow-sm">
                  <Image src="/favicon.png" alt="" width={56} height={56} className="object-contain" />
                </div>
                <p className="inline-flex min-w-0 items-center border-l-4 border-[#ff8c00] pl-3 text-xs font-bold uppercase tracking-[0.24em] text-[#004040]">Contact</p>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-[#004040] sm:text-5xl">
                Let’s build your next <span className="text-[#ff8c00]">PDF</span> &amp; <span className="text-[#ff8c00]">profile</span> move
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Whether you are refreshing leadership bios, packaging a client proposal, or both—we read every message in context. Tell us the audience, the file types you
                are juggling, and the date you are aiming for.
              </p>
              <ul className="mt-8 space-y-3">
                {['Production questions: exports, hand-offs, and print settings', 'Profile: narrative, structure, and proof points', 'Ongoing work: retainer-style or project-by-project'].map((line) => (
                  <li key={line} className="flex gap-3 text-sm font-medium text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
                    {line}
                  </li>
                ))}
              </ul>

              
              <Link
                href="/pdf"
                className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#ff8c00] hover:underline"
              >
                Browse PDF service lanes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative hidden min-h-[300px] overflow-hidden rounded-[2rem] border border-[#d4e0df] shadow-[0_20px_60px_rgba(0,64,64,0.1)] lg:block">
              <Image src={sideImage} alt="Bright office collaboration" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004040]/8 via-[#004040]/25 to-[#004040]/55" />
              <p className="absolute bottom-6 left-6 right-6 text-sm font-semibold leading-snug text-white drop-shadow">
                The same palette as the homepage—deep teal for structure, orange for emphasis—so the site feels like one product, not a bolt-on form.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-[#f0f7f6] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Request details</p>
              <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-[#004040] sm:text-3xl">Share context—we’ll line up the right people</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                No account required. Use the form for structured requests, or email us if you already have a thread going with someone on the team.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-8 lg:col-span-5">
                <div className="rounded-[1.75rem] border border-[#d4e0df] bg-white p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-[#004040]">
                    <MessageSquare className="h-5 w-5 text-[#ff8c00]" />
                    <h3 className="text-sm font-extrabold uppercase tracking-wide">After you send</h3>
                  </div>
                  <ul className="mt-6 space-y-6">
                    {handlingSteps.map((h) => (
                      <li key={h.step} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7fbfa] text-xs font-extrabold text-[#004040] ring-1 ring-[#d4e0df]">
                          {h.step}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-[#004040]">{h.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#004040]/25 bg-white/60 p-4">
                  <Send className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-[#004040]">Pro tip:</span> attach or link to a redacted example PDF if you are troubleshooting layout—screenshots
                    of errors help too.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-[2rem] border border-border bg-card p-6 text-card-foreground shadow-[0_24px_80px_rgba(0,64,64,0.1)] sm:p-10">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#004040] py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
            <p className="text-sm text-teal-100/95">
              Have an account?{' '}
              <Link href="/login" className="font-semibold text-white underline-offset-2 hover:underline">
                Sign in
              </Link>{' '}
              so we can connect your message to the same workspace.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8c00] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#e67e00]"
              >
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

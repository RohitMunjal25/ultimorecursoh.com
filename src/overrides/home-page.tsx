import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileEdit,
  Headphones,
  Layers,
  LineChart,
  MessageSquare,
  Printer,
  RefreshCw,
  Share2,
  Shield,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const heroImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80'
const aboutImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'

const metrics = [
  { value: '48h', label: 'Typical first draft', hint: 'For standard PDF packages' },
  { value: '4.9', label: 'Client satisfaction', hint: 'Rolling internal review score' },
  { value: '12', label: 'Profile templates', hint: 'Layouts tuned for B2B teams' },
]

const focusCards = [
  {
    title: 'Aligned narratives',
    body: 'We keep the story between your public profile and PDF deliverables consistent—one voice, one design language.',
    icon: Target,
  },
  {
    title: 'Document systems',
    body: 'Handbooks, proposals, and one-pagers share a structure so clients always know where to look for answers.',
    icon: Layers,
  },
  {
    title: 'Human review',
    body: 'A second pair of eyes on high-stakes exports. No silent failures or “best effort” hand-offs.',
    icon: Headphones,
  },
]

const pdfServices = [
  {
    title: 'Edit & finalize',
    body: 'Tighten layouts, apply brand styles, and export print-ready or screen-ready PDFs in one pass.',
    icon: FileEdit,
  },
  {
    title: 'Format conversion',
    body: 'Move content from Office tools into a stable PDF that behaves the same on every device.',
    icon: RefreshCw,
  },
  {
    title: 'Print & hand-off',
    body: 'Bleed, color profiles, and page order checked before anything reaches a printer or a client.',
    icon: Printer,
  },
  {
    title: 'Distribute & archive',
    body: 'Merge related files, label sections, and build a share pack your team can reuse with confidence.',
    icon: Share2,
  },
]

const processSteps = [
  { step: '01', title: 'Discovery', body: 'We map audiences, file types, and how your profile and PDFs work together today.' },
  { step: '02', title: 'Structure', body: 'We define hierarchy, page flow, and profile copy blocks before full production.' },
  { step: '03', title: 'Production', body: 'Designers and writers pair on builds—exports are checked against your checklist.' },
  { step: '04', title: 'Iterate', body: 'Revisions for campaigns, reorgs, or new offers stay on a predictable cadence.' },
]

const skills = [
  { label: 'Layout & typography', value: 94 },
  { label: 'Profile & messaging', value: 89 },
  { label: 'On-time hand-offs', value: 96 },
]

const teamOrbit = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5c?w=200&q=80',
]

const faqItems = [
  {
    q: 'Do you work with existing design systems?',
    a: 'Yes—bring a PDF style guide, Notion spec, or Figma kit. We adapt rather than start from a blank page.',
  },
  {
    q: 'What does “profile” include here?',
    a: 'Structured public pages for teams: leadership bios, service lines, proof points, and calls-to-action—aligned to your documents.',
  },
  {
    q: 'Is work stored in the cloud?',
    a: 'We coordinate deliverables the way you prefer. Sign-in for this site stores a lightweight local session to demo the experience.',
  },
  {
    q: 'How do we start a larger engagement?',
    a: 'Send context via the contact form: timelines, file samples, and success criteria. We’ll reply with a next-step outline.',
  },
]

export async function HomePageOverride() {
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${baseUrl}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main>
        <section className="relative overflow-hidden border-b border-[#d4e0df] bg-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004040' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:px-8 lg:py-20">
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#d4e0df] bg-white p-1.5 shadow-sm">
                  <Image
                    src="/favicon.png"
                    alt=""
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <p className="inline-flex min-w-0 items-center border-l-4 border-[#ff8c00] pl-3 text-xs font-bold uppercase tracking-[0.2em] text-[#004040]">
                  {SITE_CONFIG.tagline}
                </p>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-[#004040] sm:text-5xl lg:text-[3.1rem]">
                Launch-ready <span className="text-[#ff8c00]">profiles</span> &amp; <span className="text-[#ff8c00]">PDFs</span> for modern teams
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Position your people and your paperwork with one coherent story. We combine public profile surfaces and production-grade PDFs—without bolt-on feeds
                you did not ask for.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff8c00] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#e67e00]"
                >
                  Start a project note
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-[#d4e0df] bg-[#f7fbfa] p-4">
                    <p className="text-2xl font-extrabold text-[#004040]">{m.value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#ff8c00]">{m.label}</p>
                    <p className="mt-2 text-xs text-muted-foreground leading-snug">{m.hint}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 flex justify-center lg:order-2">
              <div className="relative h-[min(420px,78vw)] w-[min(420px,78vw)] sm:h-[400px] sm:w-[400px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#004040]/20 to-[#ff8c00]/15 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-[0_24px_80px_rgba(0,64,64,0.18)]">
                  <Image
                    src={heroImage}
                    alt="Team reviewing documents together"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 78vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-[#f0f7f6]">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[520px]">
              <Image src={aboutImage} alt="Open studio workspace" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-[#004040]/50" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Why {SITE_CONFIG.name}</p>
                <p className="mt-2 text-2xl font-bold leading-snug">When your PDFs and your profile disagree, trust erodes. We line them up.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:px-12">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#004040] sm:text-4xl">
                Built for <span className="text-[#ff8c00]">clarity</span> at every touchpoint
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Decks, policies, and partner packs often drift from the story on your website. We work in both spaces—so prospects read the same promises whether they
                open a PDF or land on your team page.
              </p>
              <ul className="mt-8 space-y-4">
                {['Executive-ready biographies and role clarity', 'PDF sets that follow naming, order, and accessibility expectations', 'Guided review cycles for seasonal or compliance updates'].map(
                  (line) => (
                    <li key={line} className="flex gap-3 text-sm font-medium text-[#0a1f1f]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
                      {line}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Where we add leverage</p>
              <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-[#004040] sm:text-4xl">Three things clients ask for first</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {focusCards.map((c) => (
                <div key={c.title} className="flex flex-col rounded-[1.5rem] border border-[#d4e0df] bg-[#f7fbfa] p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#004040] text-white shadow-inner">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#004040]">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Document production</p>
              <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-[#004040] sm:text-4xl">PDF services at a glance</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Pick the lane you need; we can bundle multiple lanes into a program when your roadmap calls for it.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pdfServices.map((s) => (
                <div key={s.title} className="rounded-[1.35rem] border border-[#d4e0df] p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff8c00] text-white shadow-inner">
                    <s.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#004040]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-dashed border-[#d4e0df] bg-[#f7fbfa] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#004040] shadow-sm">
                  <Zap className="h-5 w-5 text-[#ff8c00]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#004040]">Rapid scoping for fixed-scope asks</p>
                  <p className="text-xs text-muted-foreground">Share example files and desired outcomes—expect a clear scope note back.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#004040] shadow-sm">
                  <Shield className="h-5 w-5 text-[#ff8c00]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#004040]">Brand guardrails in place</p>
                  <p className="text-xs text-muted-foreground">Color, type, and tone checks before anything ships externally.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-[#f7fbfa] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Delivery model</p>
              <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-[#004040]">A workflow you can plan around</h2>
            </div>
            <div className="relative mt-14 grid gap-8 md:grid-cols-4">
              <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-[#d4e0df] md:block" />
              {processSteps.map((p) => (
                <div key={p.step} className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border-4 border-white bg-[#004040] text-sm font-extrabold text-white shadow-md">
                    {p.step}
                  </div>
                  <h3 className="mt-6 text-base font-bold uppercase tracking-wide text-[#004040]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">People & craft</p>
                <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-[#004040]">A single crew for both surfaces</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Writers, layout designers, and project leads sit together—so feedback lands once and everyone sees the same brief.
                </p>
                <Link
                  href="/team"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#ff8c00] hover:underline"
                >
                  View our team
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3 rounded-2xl border border-[#d4e0df] bg-[#f7fbfa] p-4">
                    <LineChart className="h-5 w-5 shrink-0 text-[#ff8c00]" />
                    <div>
                      <p className="text-sm font-bold text-[#004040]">Measured outcomes</p>
                      <p className="text-xs text-muted-foreground">Clear checkpoints instead of open-ended back-and-forth.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-[#d4e0df] bg-[#f7fbfa] p-4">
                    <MessageSquare className="h-5 w-5 shrink-0 text-[#ff8c00]" />
                    <div>
                      <p className="text-sm font-bold text-[#004040]">Plain-language updates</p>
                      <p className="text-xs text-muted-foreground">We summarize decisions so stakeholders stay aligned.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto flex h-[300px] w-full max-w-[360px] items-center justify-center">
                <div className="absolute inset-8 rounded-full border border-dashed border-[#d4e0df]" />
                <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-[#004040] text-center text-xs font-extrabold uppercase leading-tight tracking-wide text-white shadow-lg">
                  Our
                  <br />
                  Team
                </div>
                {teamOrbit.map((src, i) => {
                  const angle = (i / teamOrbit.length) * 2 * Math.PI - Math.PI / 2
                  const r = 118
                  const x = Math.cos(angle) * r
                  const y = Math.sin(angle) * r
                  return (
                    <div
                      key={src}
                      className="absolute z-10 h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-md"
                      style={{
                        left: `calc(50% + ${x}px - 2rem)`,
                        top: `calc(50% + ${y}px - 2rem)`,
                      }}
                    >
                      <Image src={src} alt="" width={64} height={64} className="h-full w-full object-cover" />
                    </div>
                  )
                })}
                <Users className="pointer-events-none absolute bottom-2 right-2 h-8 w-8 text-[#004040]/15" />
              </div>
            </div>

            <div className="mt-16 grid gap-10 rounded-[2rem] border border-[#d4e0df] bg-[#f7fbfa] p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:p-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Practice areas</p>
                <p className="mt-2 text-4xl font-extrabold text-[#004040]">Cross-functional depth</p>
                <p className="mt-2 text-sm text-muted-foreground">Averages across the last twelve months of engagements—an internal pulse check, not a promise of future results.</p>
              </div>
              <div className="space-y-5">
                {skills.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-[#004040]">
                      <span>{s.label}</span>
                      <span className="text-[#ff8c00]">{s.value}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#d4e0df]">
                      <div className="h-full rounded-full bg-[#004040]" style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d4e0df] bg-[#f0f7f6] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8c00]">Common questions</p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-[#004040] sm:text-4xl">Before you write in</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[#d4e0df] bg-white p-6">
                  <p className="text-sm font-bold text-[#004040]">{item.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Still deciding? <Link className="font-semibold text-[#ff8c00] hover:underline" href="/contact">Message us with files or links</Link> and we will respond with
              a tailored note.
            </p>
          </div>
        </section>

        <section className="bg-[#004040] py-16 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">Open an account or continue where you left off</h2>
              <p className="mt-3 max-w-xl text-sm text-teal-100/90">The workspace is lightweight on purpose: sign in to explore PDF and profile tools tied to this demo build.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff8c00] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#e67e00]"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

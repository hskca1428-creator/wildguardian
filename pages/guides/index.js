import Head from 'next/head';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, BookOpen, Shield } from 'lucide-react';
import { getAllGuideSummaries } from '../../lib/guides';

const SITE_URL = 'https://www.wildguardian.com.au';

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

export default function GuidesIndex({ guides }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-900">
      <Head>
        <title>Australian Snake Safety Guides | WildGuardian</title>
        <meta
          name="description"
          content="Practical Australian snake safety guides on identification, bite first aid, backyard sightings, seasonal activity and bush preparation."
        />
        <link rel="canonical" href={`${SITE_URL}/guides`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WildGuardian" />
        <meta property="og:title" content="Australian Snake Safety Guides | WildGuardian" />
        <meta
          property="og:description"
          content="Australian guidance on safer snake sightings, snake-bite first aid, seasonal activity and bush preparation."
        />
        <meta property="og:url" content={`${SITE_URL}/guides`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Australian Snake Safety Guides | WildGuardian" />
        <meta
          name="twitter:description"
          content="Australian guidance on safer snake sightings, snake-bite first aid, seasonal activity and bush preparation."
        />
      </Head>

      <div className="bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white">
        In an emergency, call{' '}
        <a href="tel:000" className="underline">
          000
        </a>{' '}
        — WildGuardian is not a substitute for medical care.
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-blue-200">
          <Link href="/" className="transition hover:text-white">
            WildGuardian home
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span>Snake safety guides</span>
        </nav>

        <section className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-300/30 bg-blue-400/10 px-5 py-3 text-blue-100 backdrop-blur-sm">
            <BookOpen className="h-6 w-6 text-blue-300" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wide">Evidence-led Australian guidance</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Australian snake safety guides</h1>
          <p className="mt-5 text-lg leading-relaxed text-blue-100 sm:text-xl">
            Clear, practical guides for safer snake sightings, bush preparation and emergency first aid. Each guide
            puts distance, calm decisions and current Australian source material ahead of a quick species guess.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-amber-300/40 bg-amber-50 p-5 shadow-xl sm:p-6" aria-labelledby="emergency-heading">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-700" aria-hidden="true" />
            <div>
              <h2 id="emergency-heading" className="text-lg font-bold text-amber-950">
                A possible snake bite is an emergency
              </h2>
              <p className="mt-2 leading-relaxed text-amber-950">
                Call <a className="font-bold underline" href="tel:000">000</a> for an ambulance immediately. Do not wait
                to identify the snake or for symptoms. Keep the person still and follow official emergency instructions.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="guide-list-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Browse the series</p>
              <h2 id="guide-list-heading" className="mt-1 text-2xl font-bold text-white">
                {guides.length} detailed guides
              </h2>
            </div>
            <Link
              href="/"
              className="hidden items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white sm:inline-flex"
            >
              Try wildlife identification <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((guide, index) => (
              <article
                key={guide.slug}
                className="group flex h-full flex-col rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl transition duration-200 hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-800">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-slate-500">{guide.readingTime} min read</span>
                </div>
                <h3 className="text-xl font-bold leading-snug text-slate-950">
                  <Link href={`/guides/${guide.slug}`} className="transition group-hover:text-blue-700">
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate-700">{guide.excerpt}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                  <span className="text-xs text-slate-500">Reviewed {formatDate(guide.dateReviewed)}</span>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
                  >
                    Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-6 text-center text-blue-100 backdrop-blur-sm">
          <Shield className="mx-auto h-8 w-8 text-blue-300" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-bold text-white">A name is never a safety clearance</h2>
          <p className="mx-auto mt-2 max-w-2xl leading-relaxed">
            Australian snakes can be hard to identify from appearance alone. Stay back, keep children and pets away,
            and use an appropriately authorised local service when a sighting cannot safely be left alone.
          </p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-center text-sm text-blue-200/80">
        <p>General information only. In an emergency, always call 000.</p>
        <p className="mt-2">
          <Link href="/" className="underline hover:text-white">WildGuardian home</Link>
          <span className="mx-2">·</span>
          <Link href="/wildlife-database" className="underline hover:text-white">Wildlife database</Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="underline hover:text-white">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      guides: getAllGuideSummaries(),
    },
  };
}

import Head from 'next/head';
import NewsletterSignup from '../../components/NewsletterSignup';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MapPin, Ruler, Shield } from 'lucide-react';
import ArticleMarkdown from '../../components/ArticleMarkdown';
import { species } from '../../data/species';
import { getSpeciesPageBySlug, getSpeciesPageSlugs } from '../../lib/speciesPages';

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

function formatCategory(category) {
  return `${category.charAt(0).toUpperCase()}${category.slice(1)} profile`;
}

// Guides worth reading next, by profile slug. Kept explicit so related
// links are always chosen by a person, not guessed.
const RELATED_GUIDES = {
  'eastern-brown-snake': [
    { href: '/guides/how-to-identify-eastern-brown-snake-vs-common-tree-snake', label: 'Eastern brown snake vs common tree snake' },
    { href: '/guides/tiger-snake-vs-eastern-brown-how-to-tell-them-apart', label: 'Tiger snake vs eastern brown: how to tell them apart' },
    { href: '/guides/snake-bite-first-aid-pressure-immobilisation-technique', label: 'Snake bite first aid: the pressure-immobilisation technique' },
  ],
  'tiger-snake': [
    { href: '/guides/tiger-snake-vs-eastern-brown-how-to-tell-them-apart', label: 'Tiger snake vs eastern brown: how to tell them apart' },
    { href: '/guides/snake-bite-first-aid-pressure-immobilisation-technique', label: 'Snake bite first aid: the pressure-immobilisation technique' },
    { href: '/guides/snake-in-the-backyard-what-to-do-and-not-to-do', label: 'Snake in the backyard: what to do (and what not to do)' },
  ],
  'green-tree-snake': [
    { href: '/guides/how-to-identify-eastern-brown-snake-vs-common-tree-snake', label: 'Eastern brown snake vs common tree snake' },
    { href: '/guides/snake-in-the-backyard-what-to-do-and-not-to-do', label: 'Snake in the backyard: what to do (and what not to do)' },
    { href: '/guides/snake-bite-first-aid-pressure-immobilisation-technique', label: 'Snake bite first aid: the pressure-immobilisation technique' },
  ],
};

export default function WildlifeProfile({ page, databaseSpecies }) {
  const canonicalUrl = `${SITE_URL}/wildlife/${page.slug}`;
  const relatedGuides = RELATED_GUIDES[page.slug];
  const pageTitle = `${page.title} | WildGuardian`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.metaDescription,
    dateModified: page.dateReviewed,
    datePublished: page.dateReviewed,
    mainEntityOfPage: canonicalUrl,
    about: {
      '@type': 'Thing',
      name: databaseSpecies.name,
    },
    author: {
      '@type': 'Organization',
      name: 'WildGuardian',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WildGuardian',
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="WildGuardian" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </Head>

      <div className="bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white">
        In an emergency, call{' '}
        <a href="tel:000" className="underline">000</a> — WildGuardian is not a substitute for medical care.
      </div>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5">
          <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-slate-950">
            <Shield className="h-6 w-6 text-blue-700" aria-hidden="true" />
            WildGuardian
          </Link>
          <Link href="/wildlife-database" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-950">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Wildlife database
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/wildlife-database" className="hover:text-blue-700">Wildlife database</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-500">{databaseSpecies.name}</span>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <header>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {formatCategory(databaseSpecies.category)}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{page.title}</h1>
            <p className="mt-3 text-lg italic text-slate-600">{page.scientificName}</p>

            <dl className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <dt className="text-xs font-bold uppercase tracking-wide text-blue-700">Database risk label</dt>
                <dd className="mt-1 font-bold text-slate-950">{databaseSpecies.risk}</dd>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <dt className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Location
                </dt>
                <dd className="mt-1 font-medium text-slate-800">{databaseSpecies.location}</dd>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <dt className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                  <Ruler className="h-3.5 w-3.5" aria-hidden="true" /> Database size
                </dt>
                <dd className="mt-1 font-medium text-slate-800">{databaseSpecies.size}</dd>
              </div>
            </dl>
          </header>

          <ArticleMarkdown markdown={page.content} skipFirstHeading />

          <div className="mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
            Last reviewed: {formatDate(page.dateReviewed)}. This is general information, not a substitute for medical care.
          </div>
        </article>

        {relatedGuides && (
          <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Related snake safety guides</h2>
            <ul className="mt-3 space-y-2">
              {relatedGuides.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href} className="font-medium text-blue-700 underline hover:text-blue-950">
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <aside className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-slate-950">Use the wildlife database safely</h2>
          <p className="mt-2 leading-relaxed text-slate-700">
            A visual match is not a safety clearance. Stay back from wildlife, avoid handling it, and seek the right emergency or wildlife-service support when needed.
          </p>
          <Link href="/wildlife-database" className="mt-4 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-950">
            Browse the Australian Wildlife Database <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
          </Link>
        </aside>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Not sure what you saw?</h2>
          <p className="mt-2 leading-relaxed text-slate-700">
            Upload a photo for a quick, safety-first check. Take it from a safe distance, and never get closer for a better shot.
          </p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-950">
            Try the WildGuardian photo identifier <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
          </Link>
        </section>

        <div className="mt-7">
          <NewsletterSignup variant="light" adTracking="WG_Species" />
        </div>

        <div className="mt-8">
          <Link href="/wildlife-database" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-950">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to the Australian Wildlife Database
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600">
        <p>General information only. In an emergency, always call 000.</p>
        <p className="mt-2">
          <Link href="/" className="underline hover:text-blue-700">WildGuardian home</Link>
          <span className="mx-2">·</span>
          <Link href="/guides" className="underline hover:text-blue-700">Snake safety guides</Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="underline hover:text-blue-700">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: getSpeciesPageSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const page = getSpeciesPageBySlug(params.slug);
    const databaseSpecies = species.find((item) => item.id === Number(page.speciesId));

    if (!databaseSpecies) {
      return { notFound: true };
    }

    return {
      props: {
        page,
        databaseSpecies,
      },
    };
  } catch {
    return { notFound: true };
  }
}

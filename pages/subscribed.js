import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MailCheck, ArrowLeft } from 'lucide-react';

export default function Subscribed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Head>
        <title>Check your inbox | WildGuardian</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white">
        In an emergency, always call{' '}
        <a href="tel:000" className="underline">
          000
        </a>{' '}
        — this tool is not a substitute for medical care.
      </div>

      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-400/40">
          <MailCheck className="h-8 w-8 text-blue-300" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-black text-white">Almost there — check your inbox</h1>
        <p className="mt-4 leading-relaxed text-blue-200">
          We've sent you a confirmation email. Click the link inside to finish subscribing. If you can't see it within
          a few minutes, check your spam or promotions folder.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Identify a snake or spider
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
          >
            Read the snake safety guides
          </Link>
        </div>

        <p className="mt-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to WildGuardian
          </Link>
        </p>
        <p className="mt-4 text-xs text-blue-300/70">
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
        </p>
      </main>
    </div>
  );
}

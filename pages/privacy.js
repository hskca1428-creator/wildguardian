import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Shield } from 'lucide-react';

const SITE_URL = 'https://www.wildguardian.com.au';
const LAST_UPDATED = '24 October 2026';
const CONTACT_EMAIL = 'support@wildguardian.com.au';
const DESCRIPTION =
  'How WildGuardian handles your information: photos you upload for identification, email subscriptions, analytics, and the services we use.';

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline hover:text-blue-950">
      {children}
    </a>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="scroll-mt-8 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-3 space-y-4 leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

function SubHeading({ children }) {
  return <h3 className="mt-6 text-lg font-bold text-slate-900">{children}</h3>;
}

function List({ children }) {
  return <ul className="list-disc space-y-2 pl-6 marker:text-blue-600">{children}</ul>;
}

export default function Privacy() {
  const canonicalUrl = `${SITE_URL}/privacy`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Head>
        <title>Privacy Policy | WildGuardian</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WildGuardian" />
        <meta property="og:title" content="Privacy Policy | WildGuardian" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white">
        In an emergency, call{' '}
        <a href="tel:000" className="underline">
          000
        </a>{' '}
        — WildGuardian is not a substitute for medical care.
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

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

          <p className="mt-6 leading-relaxed text-slate-700">
            WildGuardian (“we”, “us”) helps people in Australia recognise wildlife safely. This policy explains what
            personal information we collect through wildguardian.com.au, why we collect it, who we share it with, and the
            choices you have. We aim to handle personal information in line with the Privacy Act 1988 (Cth) and the
            Australian Privacy Principles, and to send email in line with the Spam Act 2003 (Cth).
          </p>

          <aside className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-bold text-slate-950">The short version</h2>
            <List>
              <li>You don’t need an account to use WildGuardian.</li>
              <li>A photo you upload is used only to produce your result. We don’t keep a copy.</li>
              <li>If you subscribe, we keep your name and email address in our email service until you unsubscribe.</li>
              <li>We use Google Analytics (through Google Tag Manager) to see how the site is used.</li>
              <li>We don’t sell your personal information.</li>
            </List>
          </aside>

          <Section title="1. Who we are and how to contact us">
            <p>
              WildGuardian operates wildguardian.com.au. For any privacy question, to ask for access to or correction or
              deletion of your information, or to make a complaint, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-blue-700 underline hover:text-blue-950">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="2. What we collect and why">
            <SubHeading>Photos you upload for identification</SubHeading>
            <p>
              When you use the photo identifier, your browser first shrinks the photo. It is then sent to our server
              along with the optional animal type (snake or spider) and Australian state you choose, and our server
              passes it to Anthropic’s AI service to produce the result. We use it only to give you that result. We
              don’t ask for your name or email with the photo, and we don’t save the photo on our systems.
            </p>
            <p>
              Photos can contain more than you intend to share, such as people or private property. Re-drawing the image
              in your browser normally removes hidden metadata such as GPS location, but please don’t upload photos of
              people, and stay at a safe distance from any animal you photograph.
            </p>

            <SubHeading>Email subscriptions</SubHeading>
            <p>
              If you subscribe, you give us your name and email address through a form processed by AWeber, our email
              service. We also record which page you signed up from. We send a confirmation email first, and you only
              join once you confirm. We use your details to send WildGuardian safety guides, seasonal wildlife alerts and
              tool updates. Every email includes an unsubscribe link.
            </p>

            <SubHeading>How the site is used</SubHeading>
            <p>
              We use Google Tag Manager and Google Analytics to understand which pages are useful, how people find us and
              how the site performs. These tools collect information such as pages visited, approximate location (for
              example, city), device and browser type, and how you arrived, using cookies or similar identifiers. We use
              this to improve the site, not to identify you personally.
            </p>

            <SubHeading>Technical and security information</SubHeading>
            <p>
              To keep the free photo identifier fair and stop abuse, we limit how many photos one connection can submit.
              To do that we turn your IP address into a scrambled code (a salted hash) and store only that code, in
              counters that are deleted automatically within about 36 hours. Our hosting provider, Vercel, also keeps
              standard server logs (such as IP address, browser type and pages requested) to operate and secure the
              service.
            </p>

            <SubHeading>When you contact us</SubHeading>
            <p>
              If you email us, we keep your message and our reply so we can respond and improve the site.
            </p>
          </Section>

          <Section title="3. Who we share information with">
            <p>
              We use service providers to run WildGuardian. They handle information on our behalf for the purposes above,
              and each has its own privacy policy:
            </p>
            <List>
              <li>
                <strong>Anthropic</strong> (AI analysis of photos). Anthropic receives the photo and your optional animal
                type and state selections, not your name or email. Its handling of that data is covered by its own terms
                and policies. <ExternalLink href="https://www.anthropic.com/legal/privacy">Anthropic’s privacy policy</ExternalLink>.
              </li>
              <li>
                <strong>AWeber</strong> (email subscriptions and sending).{' '}
                <ExternalLink href="https://www.aweber.com/privacy.htm">AWeber’s privacy policy</ExternalLink>.
              </li>
              <li>
                <strong>Google</strong> (Analytics and Tag Manager).{' '}
                <ExternalLink href="https://policies.google.com/privacy">Google’s privacy policy</ExternalLink>.
              </li>
              <li>
                <strong>Vercel</strong> (website hosting).{' '}
                <ExternalLink href="https://vercel.com/legal/privacy-policy">Vercel’s privacy policy</ExternalLink>.
              </li>
            </List>
            <p>
              We don’t sell your personal information. We may disclose information if the law requires it or to protect
              someone’s safety.
            </p>
          </Section>

          <Section title="4. Information handled outside Australia">
            <p>
              These providers are largely based in the United States and may store or process information there or in
              other countries. We choose reputable providers, but we can’t control how their systems operate. By using
              the photo identifier or subscribing, you understand your information may be handled outside Australia.
            </p>
          </Section>

          <Section title="5. Cookies">
            <p>
              Google’s tags set cookies or similar identifiers in your browser to measure site usage, and AWeber may set
              cookies when you submit its sign-up form. You can block or delete cookies in your browser settings, or
              install Google’s{' '}
              <ExternalLink href="https://tools.google.com/dlpage/gaoptout">Analytics opt-out browser add-on</ExternalLink>.
              Blocking cookies won’t stop the site from working.
            </p>
          </Section>

          <Section title="6. How long we keep information">
            <List>
              <li>
                <strong>Photos:</strong> we don’t keep them.
              </li>
              <li>
                <strong>Fair-use counters (scrambled IP codes):</strong> deleted automatically within about 36 hours.
              </li>
              <li>
                <strong>Email subscription details:</strong> until you unsubscribe or ask us to delete them.
              </li>
              <li>
                <strong>Analytics data:</strong> for the period set in our Google Analytics settings.
              </li>
              <li>
                <strong>Emails you send us:</strong> for as long as needed to deal with your message.
              </li>
            </List>
          </Section>

          <Section title="7. Security">
            <p>
              We use encrypted connections (HTTPS) and rely on reputable providers to protect information. No method of
              transmission or storage is completely secure, so we can’t guarantee absolute security.
            </p>
          </Section>

          <Section title="8. Your choices and rights">
            <List>
              <li>
                <strong>Unsubscribe</strong> at any time using the link in any email, or by emailing us.
              </li>
              <li>
                <strong>Access, correction and deletion:</strong> email us and we’ll respond within a reasonable time,
                usually within 30 days.
              </li>
              <li>
                <strong>Complaints:</strong> contact us first so we can try to fix the problem. If you’re not satisfied,
                you can contact the{' '}
                <ExternalLink href="https://www.oaic.gov.au/">Office of the Australian Information Commissioner</ExternalLink>.
              </li>
            </List>
          </Section>

          <Section title="9. Children">
            <p>
              WildGuardian is a general safety resource and isn’t directed at children under 16. We don’t knowingly
              collect personal information from children. If you believe a child has subscribed, email us and we’ll
              remove the details.
            </p>
          </Section>

          <Section title="10. General information, not medical advice">
            <p>
              WildGuardian provides general information only. A photo result is a possibility, not a diagnosis, and
              nothing on this site replaces medical care. If you may have been bitten or stung, don’t wait for a photo
              result. Call 000.
            </p>
          </Section>

          <Section title="11. Changes to this policy">
            <p>
              We may update this policy from time to time. The “last updated” date at the top shows the current version.
              If we make a significant change, we’ll make it clear on the site.
            </p>
          </Section>
        </article>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-950">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to WildGuardian
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600">
        <p>General information only. In an emergency, always call 000.</p>
        <p className="mt-2">
          <Link href="/" className="underline hover:text-blue-700">WildGuardian home</Link>
          <span className="mx-2">·</span>
          <Link href="/guides" className="underline hover:text-blue-700">Snake safety guides</Link>
        </p>
      </footer>
    </div>
  );
}

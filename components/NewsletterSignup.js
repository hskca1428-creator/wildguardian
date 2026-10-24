import React, { useId } from 'react';
import { Mail } from 'lucide-react';

// Posts straight to AWeber using the IDs from the "Wild Guardian" web form
// (list awlist6981726, form 757337921). No JavaScript is involved in the
// submission, so it keeps working even if scripts fail to load.
//
// After AWeber receives the sign-up it sends the visitor to /subscribed
// (our own "check your inbox" page) instead of AWeber's generic thank-you page.
// If AWeber ever ignores the redirect, set the same Thank You URL in AWeber:
// Sign Up Forms -> your form -> Settings -> Thank You Page.
const AWEBER_ACTION = 'https://www.aweber.com/scripts/addlead.pl';
const AWEBER_LIST = 'awlist6981726';
const AWEBER_FORM_ID = '757337921';
const THANK_YOU_URL = 'https://www.wildguardian.com.au/subscribed';

/**
 * variant:     'dark' (on the navy homepage) | 'light' (on white article pages and modals)
 * adTracking:  AWeber "ad tracking" label, so AWeber reports show which page
 *              each subscriber came from (e.g. WG_Home, WG_Species, WG_Guide).
 * bare:        render only the form + consent line (no heading card), for modals.
 */
export default function NewsletterSignup({
  variant = 'dark',
  adTracking = 'Wild_Guardian_Form',
  heading = 'Stay safe in the Australian outdoors',
  blurb = 'New safety guides, seasonal wildlife alerts and tool updates, straight to your inbox.',
  buttonLabel = 'Subscribe',
  bare = false,
}) {
  const uid = useId();
  const dark = variant === 'dark';

  const wrapperClass = dark
    ? 'rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl'
    : 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';
  const headingClass = dark ? 'mb-2 text-lg font-bold text-white' : 'mb-2 text-xl font-bold text-slate-950';
  const blurbClass = dark ? 'mb-4 text-sm text-blue-200' : 'mb-4 text-sm leading-relaxed text-slate-600';
  const inputClass = dark
    ? 'w-full rounded-xl border-2 border-white/20 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none'
    : 'w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none';
  const labelClass = dark ? 'sr-only' : 'sr-only';
  const buttonClass =
    'w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400';
  const consentClass = dark ? 'mt-3 text-xs text-blue-300/70' : 'mt-3 text-xs text-slate-500';

  const form = (
    <form method="post" action={AWEBER_ACTION} acceptCharset="UTF-8" className="mx-auto max-w-md space-y-3 text-left">
      <input type="hidden" name="meta_web_form_id" defaultValue={AWEBER_FORM_ID} />
      <input type="hidden" name="meta_split_id" defaultValue="" />
      <input type="hidden" name="listname" defaultValue={AWEBER_LIST} />
      <input type="hidden" name="redirect" defaultValue={THANK_YOU_URL} />
      <input type="hidden" name="meta_redirect_onlist" defaultValue={THANK_YOU_URL} />
      <input type="hidden" name="meta_adtracking" defaultValue={adTracking} />
      <input type="hidden" name="meta_message" defaultValue="1" />
      <input type="hidden" name="meta_required" defaultValue="name,email" />
      <input type="hidden" name="meta_tooltip" defaultValue="" />

      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>
          Name
        </label>
        <input
          id={`${uid}-name`}
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>
          Email address
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <button type="submit" className={buttonClass}>
        {buttonLabel}
      </button>
      <p className={consentClass}>
        We'll email you a confirmation link first. You'll only hear from us about WildGuardian safety guides and tools,
        and you can unsubscribe at any time. See our{' '}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );

  if (bare) return form;

  return (
    <section aria-labelledby={`${uid}-heading`} className={wrapperClass}>
      <div className={`mb-1 flex items-center gap-2 ${dark ? 'justify-center' : ''}`}>
        <Mail className={`h-5 w-5 ${dark ? 'text-blue-300' : 'text-blue-600'}`} aria-hidden="true" />
        <h2 id={`${uid}-heading`} className={headingClass.replace('mb-2', 'mb-0')}>
          {heading}
        </h2>
      </div>
      <p className={blurbClass}>{blurb}</p>
      {form}
    </section>
  );
}

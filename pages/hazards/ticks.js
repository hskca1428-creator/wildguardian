import React from 'react';
import { AlertTriangle, ChevronRight, MapPin, ShieldAlert, HelpCircle } from 'lucide-react';
import { species } from '../../data/species';
import { firstAid, EMERGENCY_NOTE, LAST_REVIEWED } from '../../data/firstAid';

// Sources specific to this module — ticks have their own distinct,
// Australia-specific management advice (kill-in-place, not pull-and-remove)
// that differs from worldwide norms, so it gets its own dedicated sourcing.
const TICK_SOURCES = [
  { name: 'Healthdirect Australia — Tick bites', url: 'https://www.healthdirect.gov.au/tick-bites' },
  {
    name: 'ASCIA (Australasian Society of Clinical Immunology and Allergy) — Ticks',
    url: 'https://www.allergy.org.au/ticks',
  },
];

// What a photo genuinely can and can't establish, kept local to this page
// rather than added to the shared species schema since it's specific to
// this module's per-hazard template.
const PHOTO_LIMITATION = {
  tick_attachment:
    "A photo can help confirm it's a tick, but it can't show how long it's been attached, whether anything has been transmitted, or your personal allergy risk.",
};

const tickSpecies = species.filter((s) => s.category === 'tick');

export default function Ticks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="bg-red-700 text-white text-center text-sm font-semibold py-2 px-4">
        In an emergency, always call{' '}
        <a href="tel:000" className="underline">
          000
        </a>{' '}
        — this tool is not a substitute for medical care.
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            <ShieldAlert className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-black text-white">Tick Safety</h1>
          </div>
          <p className="text-blue-200 max-w-xl mx-auto">
            An attached tick can look harmless and still need careful handling. Could this be a plausible tick
            attachment, and what's the safest action while you're unsure? That question matters more than getting an
            exact ID.
          </p>
        </div>

        {/* Pre-content safety card */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">This page is not a diagnosis</p>
              <p>
                A photo can't confirm attachment duration, whether anything was transmitted, or your allergy risk. If
                anaphylaxis signs appear — difficulty breathing, facial or throat swelling, dizziness, widespread
                hives — call <a href="tel:000" className="underline font-semibold">000</a> immediately, before
                attempting anything else.
              </p>
            </div>
          </div>
        </div>

        {tickSpecies.map((s) => (
          <div
            key={s.id}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 mb-6"
          >
            <div className="bg-orange-100 border-b-4 border-orange-400 p-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{s.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-orange-900">{s.name}</h2>
                  <p className="text-sm italic text-gray-600">{s.scientificName}</p>
                  <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mt-2">
                    {s.risk} RISK
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">{s.description}</p>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700 uppercase mb-1">Where it may occur</p>
                    <p className="text-sm text-gray-800">
                      {s.location}. Habitat: {s.habitat}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                <p className="text-xs font-semibold text-orange-700 uppercase mb-1">Do not approach / disturb</p>
                <p className="text-sm text-gray-800">{s.encounterAdvice}</p>
              </div>

              {firstAid[s.firstAidId] && (
                <div className="bg-slate-900 text-white rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-300 uppercase mb-2">
                    If exposure is possible: {firstAid[s.firstAidId].title}
                  </p>
                  <ul className="text-sm text-slate-100 space-y-1 list-disc list-inside">
                    {firstAid[s.firstAidId].steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">What a photo cannot tell you</p>
                    <p className="text-sm text-gray-700">{PHOTO_LIMITATION[s.firstAidId]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Home
          </a>
        </div>

        <div className="text-center text-blue-300/60 text-sm">
          <p>
            Guidance last reviewed: {LAST_REVIEWED}. Sources:{' '}
            {TICK_SOURCES.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ', '}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">
                  {s.name}
                </a>
              </span>
            ))}
            . {EMERGENCY_NOTE}
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, ChevronRight, MapPin, ShieldAlert, HelpCircle, Flag } from 'lucide-react';
import { species } from '../../data/species';
import { firstAid, EMERGENCY_NOTE, LAST_REVIEWED } from '../../data/firstAid';

const INSECT_SOURCES = [
  {
    name: 'Better Health Channel — Bites and stings first aid',
    url: 'https://www.betterhealth.vic.gov.au/health/healthyliving/bites-and-stings-first-aid',
  },
  { name: 'National Fire Ant Eradication Program — Report a sighting', url: 'https://www.fireants.org.au' },
];

const PHOTO_LIMITATION = {
  insect_sting_allergy_watch:
    "A photo can help recognise the insect, but it can't confirm how many times you were stung or your personal allergy risk.",
  fire_ant_sting:
    "A photo can help recognise fire ants, but the biosecurity risk comes from the nest and colony, not any single ant — always report what you find rather than relying on a photo ID alone.",
};

const insectSpecies = species.filter((s) => s.category === 'insect');
const isRifa = (s) => s.firstAidId === 'fire_ant_sting';

export default function Insects() {
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
            <h1 className="text-3xl font-black text-white">Insect & Ant Safety</h1>
          </div>
          <p className="text-blue-200 max-w-xl mx-auto">
            Most single stings cause local pain and swelling — but anaphylaxis can follow even one sting, and one
            species here (red imported fire ants) is also an active national biosecurity concern.
          </p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">This page is not a diagnosis</p>
              <p>
                A photo can't tell you whether you're having, or about to have, an allergic reaction. Call{' '}
                <a href="tel:000" className="underline font-semibold">
                  000
                </a>{' '}
                immediately for difficulty breathing, facial or throat swelling, dizziness, or widespread hives —
                regardless of which insect was involved.
              </p>
            </div>
          </div>
        </div>

        {insectSpecies.map((s) => (
          <div
            key={s.id}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 mb-6"
          >
            <div className="bg-yellow-100 border-b-4 border-yellow-500 p-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{s.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-900">{s.name}</h2>
                  <p className="text-sm italic text-gray-600">{s.scientificName}</p>
                  <div className="bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mt-2">
                    {s.risk} RISK
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">{s.description}</p>

              {isRifa(s) && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Flag className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-700 uppercase mb-1">Biosecurity reporting required</p>
                      <p className="text-sm text-gray-800">
                        This is an invasive species under active national eradication. Report suspected sightings at{' '}
                        <a href="https://www.fireants.org.au" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                          fireants.org.au
                        </a>{' '}
                        rather than treating the nest yourself.
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                <p className="text-xs font-semibold text-yellow-700 uppercase mb-1">Do not disturb</p>
                <p className="text-sm text-gray-800">{s.encounterAdvice}</p>
              </div>

              {firstAid[s.firstAidId] && (
                <div className="bg-slate-900 text-white rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-300 uppercase mb-2">
                    If stung: {firstAid[s.firstAidId].title}
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
            {INSECT_SOURCES.map((s, i) => (
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

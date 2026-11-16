import React from 'react';
import { Phone, ExternalLink, AlertTriangle } from 'lucide-react';
import { TIER_LABEL } from '../data/firstAid';

// Renders a router card. Never renders treatment steps.
export default function FirstAidRouter({ aid, context = 'If bitten or stung' }) {
  if (!aid) return null;
  const urgent = aid.tier === 'call000';
  return (
    <div
      className={`rounded-lg p-4 border-2 ${
        urgent ? 'bg-red-950 border-red-500 text-white' : 'bg-slate-900 border-amber-400 text-white'
      }`}
    >
      <p className="text-xs font-semibold text-slate-300 uppercase mb-2">
        {context}: {aid.title}
      </p>
      <div className="flex items-start gap-2 mb-2">
        {urgent ? (
          <Phone className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <p className={`text-xs font-black tracking-wide ${urgent ? 'text-red-300' : 'text-amber-300'}`}>
            {TIER_LABEL[aid.tier]}
          </p>
          <p className="text-base font-bold">
            {urgent ? (
              <a href="tel:000" className="underline">
                {aid.headline}
              </a>
            ) : (
              aid.headline
            )}
          </p>
        </div>
      </div>
      <ul className="text-sm text-slate-100 space-y-1 list-disc list-inside mb-3">
        {aid.lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
      <p className="text-xs font-semibold text-slate-300 uppercase mb-1">Official guidance</p>
      <ul className="text-sm space-y-1">
        {aid.links.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline text-blue-200 hover:text-white"
            >
              {l.name} <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Upload,
  CheckCircle,
  XCircle,
  Info,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { firstAid, EMERGENCY_NOTE, LAST_REVIEWED, SOURCES } from '../data/firstAid';

const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const MAX_FREE_ANALYSES = 3;

export default function Home() {
  const [image, setImage] = useState(null);
  const [focus, setFocus] = useState(null); // 'snake' | 'spider' | null
  const [stateFilter, setStateFilter] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [betaEmail, setBetaEmail] = useState('');
  const [betaStatus, setBetaStatus] = useState(null);

 // Vercel serverless functions cap request bodies at ~4.5MB, and base64
// encoding inflates file size by ~33% — so a 4-5MB phone photo can blow
// past that limit and come back as a non-JSON error. Resize/compress in
// the browser first so uploads stay well under the limit regardless of
// the original photo size.
const MAX_DIMENSION = 1280;
const JPEG_QUALITY = 0.8;

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 20 * 1024 * 1024) {
    setError('That image is too large to process. Please choose a smaller photo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      setImage(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      setResult(null);
      setError(null);
    };
    img.onerror = () => setError('Could not read that image. Try a different photo.');
    img.src = event.target.result;
  };
  reader.onerror = () => setError('Could not read that file.');
  reader.readAsDataURL(file);
};

  const analyzeImage = async () => {
    if (analysisCount >= MAX_FREE_ANALYSES) {
      setShowUpgradeModal(true);
      return;
    }
    if (!image) return;

    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, focus, state: stateFilter || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Analysis failed');
      }

      setResult(data);
      setAnalysisCount((prev) => prev + 1);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setAnalyzing(false);
    }
  };

  const submitBetaSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: betaEmail }),
      });
      const data = await res.json();
      setBetaStatus(res.ok ? 'success' : data.error || 'error');
    } catch {
      setBetaStatus('error');
    }
  };

  const getRiskStyles = (risk) => {
    switch (risk) {
      case 'CRITICAL':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          border: 'border-red-400',
          text: 'text-red-900',
          badge: 'bg-red-500',
        };
      case 'HIGH':
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
          border: 'border-orange-400',
          text: 'text-orange-900',
          badge: 'bg-orange-500',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
          border: 'border-yellow-400',
          text: 'text-yellow-900',
          badge: 'bg-yellow-500',
        };
      case 'LOW':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-400',
          text: 'text-green-900',
          badge: 'bg-green-500',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-900',
          badge: 'bg-gray-500',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-gray-800">
      {/* Persistent emergency banner */}
      <div className="bg-red-700 text-white text-center text-sm font-semibold py-2 px-4">
        In an emergency, always call{' '}
        <a href="tel:000" className="underline">
          000
        </a>{' '}
        — this tool is not a substitute for medical care.
      </div>

      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-4 mb-6 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
            <Shield className="w-12 h-12 text-blue-400 drop-shadow-lg" />
            <div className="text-left">
              <h1 className="text-4xl font-black text-white tracking-tight">WildGuardian</h1>
              <p className="text-blue-300 text-sm font-medium">Australian Wildlife ID & Safety</p>
            </div>
          </div>
          <p className="text-lg text-blue-200 max-w-xl mx-auto leading-relaxed">
            Photograph a snake or spider, get an instant ID with a danger rating and first-aid
            steps if it bites.
          </p>
        </div>

        {/* Focus + state selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {[
            { key: null, label: 'Any species' },
            { key: 'snake', label: '🐍 Snake' },
            { key: 'spider', label: '🕷️ Spider' },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setFocus(opt.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                focus === opt.key
                  ? 'bg-blue-500 border-blue-400 text-white'
                  : 'bg-white/10 border-white/20 text-blue-200 hover:bg-white/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-blue-200"
          >
            <option value="">Where were you? (optional)</option>
            {AU_STATES.map((s) => (
              <option key={s} value={s} className="text-gray-900">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Upload card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          {!image && (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-14 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <span className="text-gray-600 font-semibold">Tap to upload a photo</span>
              <span className="text-gray-400 text-sm mt-1">JPG or PNG, under 5MB</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}

          {image && !result && (
            <div className="space-y-4">
              <img src={image} alt="Uploaded" className="w-full max-h-80 object-contain rounded-xl bg-gray-100" />
              {error && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 rounded-lg p-3">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={analyzeImage}
                  disabled={analyzing}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg"
                >
                  {analyzing ? 'Analyzing…' : '🔍 Identify'}
                </button>
                <button
                  onClick={() => {
                    setImage(null);
                    setError(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all"
                >
                  Choose Different Photo
                </button>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <img src={image} alt="Uploaded" className="w-full max-h-64 object-contain rounded-xl bg-gray-100" />

              {/* Pre-result safety card — shown before any species match, per
                  the principle that this is an avoidance/information tool,
                  not a diagnosis. */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">Before the result: this is a possibility, not a diagnosis</p>
                    <p>
                      A photo can't confirm the species, whether venom was delivered, how severe an exposure is, or
                      whether an area is safe. If a bite, sting, or tick attachment is possible right now, don't wait
                      for an ID —{' '}
                      <a href="tel:000" className="underline font-semibold">
                        call 000
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {result.imageQuality && (
                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-lg p-3 text-sm">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{result.imageQuality} — treat this result as a rough guide and consider a clearer photo.</span>
                </div>
              )}

              {result.matches.length === 0 && (
                <div className="text-center py-6 text-gray-600">
                  <p>Couldn't find a confident match in our database for this photo.</p>
                </div>
              )}

              {result.matches.map((match, idx) => {
                const s = match.species;
                const styles = getRiskStyles(s.risk);
                const aid = firstAid[s.firstAidId];
                return (
                  <div key={idx} className={`rounded-xl border-2 ${styles.border} ${styles.bg} p-5 shadow-md`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{s.icon}</span>
                        <div>
                          <h3 className={`font-bold text-xl ${styles.text}`}>{s.name}</h3>
                          <p className="text-sm italic text-gray-600">{s.scientificName}</p>
                          <p className="text-xs text-gray-500 mt-1">Match confidence: {match.confidence}%</p>
                        </div>
                      </div>
                      <div className={`${styles.badge} text-white text-sm font-black px-3 py-1 rounded-lg shadow`}>
                        {s.risk}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{match.reasoning}</p>

                    <div className="bg-white/70 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">If you see one</p>
                      <p className="text-sm text-gray-800">{s.encounterAdvice}</p>
                    </div>

                    {aid && (
                      <div className="bg-slate-900 text-white rounded-lg p-4">
                        <p className="text-xs font-semibold text-slate-300 uppercase mb-2">
                          If bitten or stung: {aid.title}
                        </p>
                        <ul className="text-sm text-slate-100 space-y-1 list-disc list-inside">
                          {aid.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:000"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all text-center shadow-lg"
                >
                  🚨 Emergency: 000
                </a>
                <button
                  onClick={() => {
                    setResult(null);
                    setImage(null);
                    setError(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all"
                >
                  🔄 Identify Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature links */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <a
            href="/wildlife-database"
            className="block bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
              Full Species Database
              <ChevronRight className="w-5 h-5" />
            </h3>
            <p className="text-blue-200 text-sm">Browse 60+ native species with ID guides and first-aid info</p>
          </a>

          <div className="block bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="bg-gradient-to-br from-green-500/70 to-green-600/70 rounded-xl w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Security Camera Alerts</h3>
            <p className="text-blue-200 text-sm">On the roadmap: automatic alerts from Eufy, Ring & Arlo cameras — join the waitlist below</p>
          </div>
        </div>

        {/* Hazard modules */}
        <div className="mb-10">
          <h3 className="text-white font-bold text-lg mb-4 text-center">Browse by hazard type</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/hazards/ticks"
              className="block bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all text-center"
            >
              <div className="text-3xl mb-2">🐛</div>
              <h4 className="font-bold text-white">Ticks</h4>
              <p className="text-blue-200 text-xs mt-1">Attachment and paralysis-tick guidance</p>
            </a>
            <a
              href="/hazards/marine"
              className="block bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all text-center"
            >
              <div className="text-3xl mb-2">🌊</div>
              <h4 className="font-bold text-white">Marine & Waterways</h4>
              <p className="text-blue-200 text-xs mt-1">Jellyfish, octopus, stonefish, crocodiles</p>
            </a>
            <a
              href="/hazards/insects"
              className="block bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all text-center"
            >
              <div className="text-3xl mb-2">🐜</div>
              <h4 className="font-bold text-white">Insects & Ants</h4>
              <p className="text-blue-200 text-xs mt-1">Stings, allergy watch, fire ant reporting</p>
            </a>
          </div>
        </div>

        {/* Beta / waitlist */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 text-center mb-10">
          <h3 className="text-white font-bold text-lg mb-2">More tools on the way</h3>
          <p className="text-blue-200 text-sm mb-4">
            Ticks, jellyfish, ants and more — leave your email to hear when they launch.
          </p>
          {betaStatus === 'success' ? (
            <p className="text-green-300 font-semibold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> You're on the list!
            </p>
          ) : (
            <form onSubmit={submitBetaSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={betaEmail}
                onChange={(e) => setBetaEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-white/20 bg-white/90 focus:border-blue-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                Notify Me
              </button>
            </form>
          )}
          {betaStatus === 'error' && (
            <p className="text-red-300 text-sm mt-2">Something went wrong — try again.</p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-blue-300/60 text-sm space-y-2">
          <p>
            First-aid guidance last reviewed: {LAST_REVIEWED}. Sources:{' '}
            {SOURCES.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ', '}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">
                  {s.name}
                </a>
              </span>
            ))}
            . {EMERGENCY_NOTE}
          </p>
          <p>© {new Date().getFullYear()} WildGuardian. Helping Australians identify wildlife safely.</p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Limit Reached</h3>
              <p className="text-gray-600">
                You've used all {MAX_FREE_ANALYSES} free identifications for this session. Paid plans are coming
                soon — leave your email below and we'll let you know.
              </p>
            </div>

            {betaStatus === 'success' ? (
              <p className="text-green-700 font-semibold text-center mb-4">You're on the list!</p>
            ) : (
              <form onSubmit={submitBetaSignup} className="space-y-3 mb-4">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={betaEmail}
                  onChange={(e) => setBetaEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
                >
                  Notify Me
                </button>
              </form>
            )}

            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

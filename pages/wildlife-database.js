import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Shield, AlertTriangle, Info, ChevronRight, Filter } from 'lucide-react';
import { species } from '../data/species';
import { firstAid, EMERGENCY_NOTE, LAST_REVIEWED, SOURCES } from '../data/firstAid';

export default function WildlifeDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const wildlifeData = species;


  const getRiskStyles = (risk) => {
    switch(risk) {
      case 'CRITICAL': 
        return { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-900', badge: 'bg-red-500' };
      case 'HIGH': 
        return { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-900', badge: 'bg-orange-500' };
      case 'MEDIUM': 
        return { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-900', badge: 'bg-yellow-500' };
      case 'LOW': 
        return { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-900', badge: 'bg-green-500' };
      default: 
        return { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-900', badge: 'bg-gray-500' };
    }
  };

  const filteredWildlife = wildlifeData.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === 'all' || animal.risk === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Head>
        <title>Australian Wildlife Database | WildGuardian</title>
        <meta
          name="description"
          content="Browse 60+ Australian wildlife species with identification guides, risk ratings, habitat info and first-aid steps for bites and stings."
        />
        <link rel="canonical" href="https://www.wildguardian.com.au/wildlife-database" />
        <meta property="og:title" content="Australian Wildlife Database | WildGuardian" />
        <meta
          property="og:description"
          content="Browse 60+ Australian wildlife species with identification guides, risk ratings, habitat info and first-aid steps for bites and stings."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.wildguardian.com.au/wildlife-database" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-400/30">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Australian Wildlife Database</h1>
              <p className="text-blue-300">Complete guide to 50+ native species</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
            />
          </div>

          <div className="flex gap-3">
            <Filter className="w-5 h-5 text-white self-center" />
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
            >
              <option value="all">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-blue-300">
            Showing <span className="font-bold text-white">{filteredWildlife.length}</span> of {wildlifeData.length} species
          </p>
        </div>

        {/* Wildlife Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredWildlife.map((animal) => {
            const styles = getRiskStyles(animal.risk);
            return (
              <div key={animal.id} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:scale-[1.02] transition-transform duration-300">
                {/* Header */}
                <div className={`${styles.bg} border-b-4 ${styles.border} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-6xl drop-shadow-lg">{animal.icon}</span>
                      <div>
                        <h3 className={`text-2xl font-bold ${styles.text}`}>{animal.name}</h3>
                        <p className="text-sm italic text-gray-600 mt-1">{animal.scientificName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`${styles.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {animal.risk} RISK
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 leading-relaxed">{animal.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-semibold uppercase">Location</p>
                      <p className="text-gray-900 font-medium mt-1">{animal.location}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 font-semibold uppercase">Size</p>
                      <p className="text-gray-900 font-medium mt-1">{animal.size}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Identification</p>
                        <p className="text-sm text-gray-700">{animal.identification}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.bg} rounded-lg p-4 border-l-4 ${styles.border}`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`w-5 h-5 ${styles.text} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className={`text-xs font-semibold ${styles.text} uppercase mb-1`}>Safety Advice</p>
                        <p className="text-sm text-gray-700">{animal.encounterAdvice}</p>
                      </div>
                    </div>
                  </div>

                  {firstAid[animal.firstAidId] && (
                    <div className="bg-slate-900 text-white rounded-lg p-4">
                      <p className="text-xs font-semibold text-slate-300 uppercase mb-2">
                        If a bite or sting happens: {firstAid[animal.firstAidId].title}
                      </p>
                      <ul className="text-sm text-slate-100 space-y-1 list-disc list-inside">
                        {firstAid[animal.firstAidId].steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 text-xs text-gray-600">
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <p className="font-semibold">Active:</p>
                      <p>{animal.active}</p>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <p className="font-semibold">Habitat:</p>
                      <p>{animal.habitat}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredWildlife.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No species found</h3>
            <p className="text-blue-300">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Home
          </a>
        </div>

        {/* Sourcing footer */}
        <div className="mt-8 text-center text-blue-300/60 text-sm">
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
        </div>
      </div>
    </div>
  );
}

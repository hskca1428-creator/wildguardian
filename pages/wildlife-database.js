import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, Info, ChevronRight, Filter } from 'lucide-react';

export default function WildlifeDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const wildlifeData = [
    {
      id: 1,
      name: 'Eastern Brown Snake',
      scientificName: 'Pseudonaja textilis',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Eastern & Central Australia',
      size: '1.1m - 2.4m',
      description: 'Second most venomous land snake in the world. Responsible for most snake-bite deaths in Australia.',
      identification: 'Variable brown color, slender body, round head barely distinct from neck',
      safety: 'Do NOT approach. Back away slowly. Call 000 and professional snake catcher immediately.',
      active: 'Spring to Autumn, diurnal (day active)',
      habitat: 'Grasslands, woodlands, farms, suburban areas'
    },
    {
      id: 2,
      name: 'Funnel-Web Spider',
      scientificName: 'Atrax robustus',
      risk: 'CRITICAL',
      icon: '🕷️',
      location: 'Sydney region, NSW',
      size: '1-5cm body length',
      description: 'Highly aggressive and dangerously venomous. Males are more dangerous than females.',
      identification: 'Large, glossy black/dark brown, thick legs, aggressive behavior when threatened',
      safety: 'Keep clear. Call pest control immediately. Keep pets and children inside. Seek medical attention if bitten.',
      active: 'Summer, more active after rain',
      habitat: 'Moist, sheltered areas, under rocks, in burrows, gardens'
    },
    {
      id: 3,
      name: 'Redback Spider',
      scientificName: 'Latrodectus hasselti',
      risk: 'HIGH',
      icon: '🕷️',
      location: 'All of Australia',
      size: '3-10mm body length',
      description: 'Common venomous spider found in urban areas. Females have distinctive red stripe.',
      identification: 'Black body with red/orange stripe on abdomen, females larger and more venomous',
      safety: 'Avoid contact. Safe to observe from distance. Consider professional pest control. Antivenom available.',
      active: 'Year-round, nocturnal',
      habitat: 'Dark, dry sheltered spots - sheds, mailboxes, garden furniture, toilets'
    },
    {
      id: 4,
      name: 'Tiger Snake',
      scientificName: 'Notechis scutatus',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Southern Australia, Tasmania',
      size: '1m - 2.1m',
      description: 'Highly venomous snake with potent neurotoxic venom. Can be aggressive when threatened.',
      identification: 'Banded pattern (not always present), robust build, broad head',
      safety: 'Do not approach or corner. Back away calmly. Call snake catcher. Seek immediate medical help if bitten.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Wetlands, coastal areas, grasslands, suburban gardens near water'
    },
    {
      id: 5,
      name: 'Carpet Python',
      scientificName: 'Morelia spilota',
      risk: 'LOW',
      icon: '🐍',
      location: 'Northern & Eastern Australia',
      size: '2m - 4m',
      description: 'Non-venomous constrictor. Generally docile but can bite if threatened. Protected species.',
      identification: 'Distinctive carpet-like pattern, thick body, can be various colors',
      safety: 'Keep pets and children away but not dangerous to humans. Usually moves on naturally. Do not relocate without permit.',
      active: 'Year-round, nocturnal',
      habitat: 'Trees, roofs, woodpiles, suburban areas'
    },
    {
      id: 6,
      name: 'Blue-Tongue Lizard',
      scientificName: 'Tiliqua scincoides',
      risk: 'LOW',
      icon: '🦎',
      location: 'Eastern Australia',
      size: '30-60cm',
      description: 'Harmless and beneficial reptile. Eats garden pests like snails and slugs. Protected species.',
      identification: 'Distinctive blue tongue, silvery-grey body with dark bands, stumpy tail',
      safety: 'Completely harmless to humans. Beneficial for gardens. Let it pass through naturally. Protected - do not harm.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Gardens, bushland, suburban areas'
    },
    {
      id: 7,
      name: 'Common Brushtail Possum',
      scientificName: 'Trichosurus vulpecula',
      risk: 'LOW',
      icon: '🦡',
      location: 'All of Australia',
      size: '32-58cm + tail',
      description: 'Protected nocturnal marsupial. Common in urban areas. Can be noisy in roofs.',
      identification: 'Grey/brown fur, bushy tail, pink nose, large round ears',
      safety: 'Harmless and beneficial. Do not feed or relocate without permit. Protected species. Can scratch/bite if cornered.',
      active: 'Year-round, nocturnal',
      habitat: 'Tree hollows, roofs, gardens, urban areas'
    },
    {
      id: 8,
      name: 'Australian Magpie',
      scientificName: 'Gymnorhina tibicen',
      risk: 'MEDIUM',
      icon: '🐦',
      location: 'All of Australia',
      size: '37-43cm',
      description: 'Territorial bird, especially during breeding season. Can swoop to protect nests.',
      identification: 'Black and white plumage, melodious call, red eyes in adults',
      safety: 'Avoid nesting areas during breeding season (Aug-Oct). Wear hat/helmet. Make eye contact. Protected species.',
      active: 'Year-round, diurnal (aggressive Aug-Oct)',
      habitat: 'Parks, gardens, sports fields, urban areas'
    },
    {
      id: 9,
      name: 'Eastern Grey Kangaroo',
      scientificName: 'Macropus giganteus',
      risk: 'MEDIUM',
      icon: '🦘',
      location: 'Eastern Australia',
      size: '1-2.3m tall',
      description: 'Large marsupial, usually shy but can be aggressive if cornered or with young.',
      identification: 'Grey-brown fur, powerful hind legs, long tail, large ears',
      safety: 'Keep distance (10m+). Do not feed or approach. Can be dangerous if cornered. Contact wildlife rescue if injured.',
      active: 'Dawn/dusk, crepuscular',
      habitat: 'Grasslands, open forests, golf courses, suburban edges'
    },
    {
      id: 10,
      name: 'Huntsman Spider',
      scientificName: 'Sparassidae family',
      risk: 'LOW',
      icon: '🕷️',
      location: 'All of Australia',
      size: '2-3cm body, 15cm leg span',
      description: 'Large, fast-moving spider. Looks scary but relatively harmless. Eats household pests.',
      identification: 'Large, flat body, long legs spread sideways, brown/grey color',
      safety: 'Generally harmless. May bite if handled roughly (painful but not dangerous). Beneficial - eats cockroaches and flies.',
      active: 'Year-round, nocturnal',
      habitat: 'Houses, sheds, tree bark, under rocks'
    },
    {
      id: 11,
      name: 'White-Tailed Spider',
      scientificName: 'Lampona species',
      risk: 'MEDIUM',
      icon: '🕷️',
      location: 'Southern & Eastern Australia',
      size: '12-18mm body length',
      description: 'Wandering spider, does not build webs. Bite can cause local pain and swelling.',
      identification: 'Dark reddish to grey body, distinctive white tip on abdomen, cigar-shaped',
      safety: 'Avoid handling. Bite causes localized pain/swelling. Clean wound, apply ice, seek medical advice if symptoms worsen.',
      active: 'Year-round, nocturnal',
      habitat: 'Inside homes, gardens, under bark, in leaf litter'
    },
    {
      id: 12,
      name: 'Lace Monitor',
      scientificName: 'Varanus varius',
      risk: 'MEDIUM',
      icon: '🦎',
      location: 'Eastern Australia',
      size: '1.5-2m',
      description: 'Large goanna, can climb trees. Usually shy but may defend itself if cornered.',
      identification: 'Dark with cream/yellow bands, long neck, forked tongue, powerful claws',
      safety: 'Keep distance. Can bite and scratch if threatened. Usually flees. Protected species. Contact wildlife rescue if needed.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Forests, woodlands, coastal areas, campgrounds'
    }
  ];

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
                        <p className="text-sm text-gray-700">{animal.safety}</p>
                      </div>
                    </div>
                  </div>

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
      </div>
    </div>
  );
}

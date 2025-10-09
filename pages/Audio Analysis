import React, { useState } from 'react';
import { Upload, Volume2, AlertTriangle, CheckCircle, Info, Waves, Moon, BellRing, Shield, Play, Pause } from 'lucide-react';

export default function AudioAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const species = [
    {
      name: "Common Brushtail Possum",
      sound: "Scratching, hissing, chattering",
      active: "Dusk to dawn, peak 8pm-2am",
      risk: "low",
      description: "Loud scratching on roofs, distinctive hissing when threatened. Often heard in suburban areas.",
      tips: "Generally harmless. Secure garbage bins. Don't approach if cornered."
    },
    {
      name: "Sugar Glider",
      sound: "High-pitched chattering, barking yaps",
      active: "Night, especially 9pm-3am",
      risk: "low",
      description: "Rapid, bird-like chattering. Sounds like rapid 'yip-yip-yip' calls echoing through trees.",
      tips: "Harmless and protected. Enjoy observing from distance."
    },
    {
      name: "Tawny Frogmouth Owl",
      sound: "Deep 'oom-oom-oom' calls",
      active: "Sunset onwards, vocal during breeding",
      risk: "low",
      description: "Low, resonant hooting. Sounds like slow, mournful drumming. Often mistaken for owls.",
      tips: "Beneficial predator. Eats insects and pests."
    },
    {
      name: "Flying Fox (Fruit Bat)",
      sound: "Screeching, squeaking, flapping",
      active: "All night, noisy at roost sites",
      risk: "medium",
      description: "Loud screeching, constant squabbling at roosting sites. Heavy flapping wing sounds.",
      tips: "Never handle. Can carry diseases. Contact wildlife rescue if found."
    },
    {
      name: "Australian Frogs",
      sound: "Various croaks, peeps, trills",
      active: "After rain, during breeding season",
      risk: "low",
      description: "Species-specific calls from deep croaks to high-pitched peeps. Chorus intensifies after rain.",
      tips: "Excellent ecosystem indicator. Variety of species shows healthy environment."
    },
    {
      name: "Koala",
      sound: "Deep grunting, bellowing roars",
      active: "Breeding season (Sept-March), nighttime",
      risk: "low",
      description: "Surprisingly loud, deep grunting bellows. Males sound aggressive during breeding season.",
      tips: "Protected species. Keep dogs away. Report injuries to wildlife rescue."
    },
    {
      name: "Feral Cat",
      sound: "Yowling, fighting screeches",
      active: "Dawn and dusk, night hunting",
      risk: "high",
      description: "Aggressive yowling, fighting sounds. Major threat to native wildlife.",
      tips: "Report sightings to local council. Major threat to native species. Never feed."
    },
    {
      name: "Red Fox",
      sound: "Sharp barks, eerie screaming",
      active: "Night, especially mating season",
      risk: "high",
      description: "High-pitched screaming (like human scream), sharp triple bark. Unsettling at night.",
      tips: "Invasive pest. Threatens native wildlife. Report to authorities."
    }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.includes('audio')) {
      setSelectedFile(file);
      analyzeAudio(file);
    } else {
      alert('Please upload an audio file (MP3, WAV, M4A, etc.)');
    }
  };

  const analyzeAudio = (file) => {
    setAnalyzing(true);
    setResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      // Random result for demo
      const detectedSpecies = species[Math.floor(Math.random() * 6)]; // Exclude dangerous ones for demo
      setResult({
        species: detectedSpecies,
        confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
        detectedAt: "0:23, 1:14, 2:45",
        audioLength: "3:12"
      });
      setAnalyzing(false);
    }, 3000);
  };

  const handleBetaSignup = (e) => {
    e.preventDefault();
    alert(`Thanks for your interest! We'll contact ${email} when audio analysis launches.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-blue-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">WildGuardian Audio</h1>
                <p className="text-sm text-blue-300">Nocturnal Species Detection</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30">
              <BellRing className="w-4 h-4" />
              <span className="text-sm font-semibold">BETA</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Identify Wildlife by Sound
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Upload audio recordings from your backyard and let AI identify nocturnal Australian species. 
            Perfect for nighttime wildlife monitoring when cameras can't see clearly.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-blue-400" />
            Upload Audio Recording
          </h3>

          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-blue-400 bg-blue-500/10' 
                : 'border-blue-500/30 bg-slate-900/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Volume2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-xl text-white mb-2">Drop your audio file here</p>
            <p className="text-blue-300 mb-6">or</p>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg cursor-pointer inline-block transition-colors">
              Choose Audio File
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-sm text-blue-300 mt-4">Supports MP3, WAV, M4A, OGG</p>
          </div>

          {/* Analysis Progress */}
          {selectedFile && (
            <div className="mt-8 bg-slate-900/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">{selectedFile.name}</span>
                <span className="text-blue-300 text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              {analyzing && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-300">
                    <Waves className="w-5 h-5 animate-pulse" />
                    <span>Analyzing audio patterns...</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                </div>
              )}

              {/* Results */}
              {result && !analyzing && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-green-400 mb-4">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Analysis Complete</span>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-xl p-6 border border-green-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {result.species.name}
                        </h4>
                        <p className="text-blue-200 mb-4">{result.species.description}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        result.species.risk === 'low' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : result.species.risk === 'medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {result.species.risk.toUpperCase()} RISK
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="text-blue-300 text-sm mb-1">Confidence</p>
                        <p className="text-white text-2xl font-bold">{result.confidence}%</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="text-blue-300 text-sm mb-1">Detected At</p>
                        <p className="text-white text-lg font-semibold">{result.detectedAt}</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <p className="text-blue-300 text-sm mb-2">Sound Characteristics</p>
                      <p className="text-white">{result.species.sound}</p>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <p className="text-blue-300 text-sm mb-2">Active Hours</p>
                      <p className="text-white">{result.species.active}</p>
                    </div>

                    <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-300 font-semibold mb-1">Recommended Action</p>
                          <p className="text-amber-200 text-sm">{result.species.tips}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Species Database */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-400" />
            Nocturnal Species Database
          </h3>
          <p className="text-blue-200 mb-8">
            Learn about the sounds you might hear in the Australian night. Our AI can identify these species from audio recordings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((animal, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">{animal.name}</h4>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    animal.risk === 'low' 
                      ? 'bg-green-500/20 text-green-300'
                      : animal.risk === 'medium'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {animal.risk === 'high' ? <AlertTriangle className="w-3 h-3 inline mr-1" /> : null}
                    {animal.risk.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-blue-300 font-semibold mb-1">Sound Profile:</p>
                    <p className="text-white">{animal.sound}</p>
                  </div>
                  <div>
                    <p className="text-blue-300 font-semibold mb-1">Active Hours:</p>
                    <p className="text-white">{animal.active}</p>
                  </div>
                  <div>
                    <p className="text-blue-300 font-semibold mb-1">Key Info:</p>
                    <p className="text-white">{animal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beta Waitlist */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-500/30 p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Join the Beta Program</h3>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Be among the first to access full audio analysis capabilities. We're training our AI on thousands of Australian wildlife sounds to bring you the most accurate detection system.
          </p>

          <form onSubmit={handleBetaSignup} className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-slate-900/50 border border-blue-500/30 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Join Beta
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Early Access</p>
              <p className="text-blue-300 text-sm">First to try new features</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Free Credits</p>
              <p className="text-blue-300 text-sm">500 free analyses</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <BellRing className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Exclusive Updates</p>
              <p className="text-blue-300 text-sm">Beta features first</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-blue-500/30 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-300">
            WildGuardian Audio Analysis • Protecting Australian Wildlife Through Sound
          </p>
        </div>
      </footer>
    </div>
  );
}

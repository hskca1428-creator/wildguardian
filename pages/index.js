import React, { useState } from 'react';
import { Camera, AlertTriangle, Shield, Upload, Zap, CheckCircle, XCircle, Info, ChevronRight } from 'lucide-react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const wildlifeDatabase = {
    'eastern brown snake': {
      risk: 'CRITICAL',
      color: 'red',
      advice: 'Do NOT approach. Second most venomous land snake. Call 000 and a professional snake catcher immediately.',
      icon: '🐍'
    },
    'carpet python': {
      risk: 'LOW',
      color: 'green',
      advice: 'Non-venomous. Keep pets and children away but not dangerous to humans. Will likely move on naturally.',
      icon: '🐍'
    },
    'redback spider': {
      risk: 'HIGH',
      color: 'orange',
      advice: 'Venomous. Avoid contact. Safe to observe from distance. Consider professional pest control.',
      icon: '🕷️'
    },
    'funnel web spider': {
      risk: 'CRITICAL',
      color: 'red',
      advice: 'Highly venomous. Keep clear. Call pest control immediately. Keep pets and children inside.',
      icon: '🕷️'
    },
    'possum': {
      risk: 'LOW',
      color: 'green',
      advice: 'Protected species. Harmless and beneficial. Do not feed or relocate without permit.',
      icon: '🦡'
    },
    'blue tongue lizard': {
      risk: 'LOW',
      color: 'green',
      advice: 'Harmless and beneficial (eats snails/slugs). Protected species. Let it pass through naturally.',
      icon: '🦎'
    },
    'magpie': {
      risk: 'MEDIUM',
      color: 'yellow',
      advice: 'May be territorial during breeding season (Aug-Oct). Avoid nesting areas. Protected species.',
      icon: '🐦'
    },
    'kangaroo': {
      risk: 'MEDIUM',
      color: 'yellow',
      advice: 'Can be aggressive if cornered. Keep distance. Do not feed. Contact wildlife rescue if injured.',
      icon: '🦘'
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image too large. Please upload an image under 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      
      const detectedLower = data.detected.toLowerCase();
      const dbInfo = wildlifeDatabase[detectedLower] || {
        risk: data.risk || 'UNKNOWN',
        advice: data.advice || 'Unknown species detected. Exercise caution.',
        icon: '❓'
      };

      setResult({
        detected: data.detected,
        confidence: data.confidence,
        timestamp: new Date().toLocaleString('en-AU'),
        location: 'Uploaded Image',
        ...dbInfo
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskStyles = (risk) => {
    switch(risk) {
      case 'CRITICAL': 
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          border: 'border-red-400',
          text: 'text-red-900',
          badge: 'bg-red-500',
          glow: 'shadow-red-200'
        };
      case 'HIGH': 
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
          border: 'border-orange-400',
          text: 'text-orange-900',
          badge: 'bg-orange-500',
          glow: 'shadow-orange-200'
        };
      case 'MEDIUM': 
        return {
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
          border: 'border-yellow-400',
          text: 'text-yellow-900',
          badge: 'bg-yellow-500',
          glow: 'shadow-yellow-200'
        };
      case 'LOW': 
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-400',
          text: 'text-green-900',
          badge: 'bg-green-500',
          glow: 'shadow-green-200'
        };
      default: 
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-900',
          badge: 'bg-gray-500',
          glow: 'shadow-gray-200'
        };
    }
  };

  const styles = result ? getRiskStyles(result.risk) : null;
return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        {/*  <div className="mb-8">
          <a 
            href="/eufy-demo"
            className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-2xl border-2 border-white/20"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white font-black text-2xl">NEW: Eufy Camera Integration Live!</span>
            </div>
            <p className="text-blue-100 text-lg">
              Try our interactive demo - See AI wildlife detection in action with your Eufy cameras
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold">
              Click to Try Demo
              <ChevronRight className="w-5 h-5" />
            </div>
          </a>
        </div> */}
       
        {/* END OF EUFY BANNER */}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 pt-6">
          <div className="inline-flex items-center justify-center gap-4 mb-6 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
            <Shield className="w-14 h-14 text-blue-400 drop-shadow-lg" />
            <div className="text-left">
              <h1 className="text-5xl font-black text-white tracking-tight">WildGuardian</h1>
              <p className="text-blue-300 text-sm font-medium">AI-Powered Wildlife Detection</p>
            </div>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Australian Wildlife-Aware Home Security System
          </p>
          <p className="text-blue-300/80 mt-2">
            Protecting your property from intruders <span className="text-blue-400 font-semibold">AND</span> native wildlife
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Upload Security Image</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative border-4 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300">
                {!image ? (
                  <label className="cursor-pointer block">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <Upload className="w-12 h-12 text-blue-600" />
                    </div>
                    <p className="text-gray-700 mb-2 font-semibold text-lg">Click to upload security camera image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div>
                    <div className="relative group">
                      <img 
                        src={image} 
                        alt="Uploaded" 
                        className="max-w-full h-72 object-contain mx-auto rounded-lg shadow-xl"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg"></div>
                    </div>
                    <button
                      onClick={() => {
                        setImage(null);
                        setResult(null);
                        setError(null);
                      }}
                      className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium underline"
                    >
                      Remove image
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {image && !result && (
                <button
                  onClick={analyzeImage}
                  disabled={analyzing}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {analyzing ? (
                    <>
                      <Zap className="w-6 h-6 animate-pulse" />
                      <span className="text-lg">Analyzing Wildlife...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      <span className="text-lg">Analyze Image with AI</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Detection Results</h2>
              </div>
            </div>

            <div className="p-6">
              {!result ? (
                <div className="text-center py-20">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    <Shield className="w-16 h-16 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-lg">Upload an image to begin wildlife detection</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Risk Alert Card */}
                  <div className={`${styles.bg} border-4 ${styles.border} rounded-xl p-6 shadow-lg ${styles.glow}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl drop-shadow-lg">{result.icon}</span>
                        <div>
                          <h3 className={`text-2xl font-bold capitalize ${styles.text}`}>{result.detected}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="bg-white/80 rounded-full px-3 py-1">
                              <p className="text-sm font-semibold text-gray-700">Confidence: {result.confidence}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`${styles.badge} text-white text-xl font-black px-4 py-2 rounded-lg shadow-lg`}>
                          {result.risk}
                        </div>
                        <div className="text-xs opacity-75 mt-1 font-semibold">RISK LEVEL</div>
                      </div>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 rounded-lg p-2">
                          <Info className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Detection Time</p>
                          <p className="font-semibold text-gray-900 text-sm">{result.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 rounded-lg p-2">
                          <Camera className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Source</p>
                          <p className="font-semibold text-gray-900 text-sm">{result.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Safety Advice */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 p-5 rounded-lg shadow-md">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-2 text-lg">Safety Recommendations:</h4>
                        <p className="text-blue-800 leading-relaxed">{result.advice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="tel:000"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
                    >
                      🚨 Emergency: 000
                    </a>
                    <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                      🔍 Find Expert
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setResult(null);
                      setImage(null);
                    }}
                    className="w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    🔄 Analyze Another Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <a href="/wildlife-database" className="block bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              Australian Wildlife Database
              <ChevronRight className="w-5 h-5" />
            </h3>
            <p className="text-blue-200">Click to explore 50+ native species with identification guides</p>
          </a>

          <a href="/ai-analysis" className="block bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              Real-Time AI Analysis
              <ChevronRight className="w-5 h-5" />
            </h3>
            <p className="text-blue-200">Learn how our AI achieves 94.7% accuracy in under 3 seconds</p>
          </a>

          <a href="/camera-integration" className="block bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              Camera Integration
              <ChevronRight className="w-5 h-5" />
            </h3>
            <p className="text-blue-200">Connect Eufy, Ring, Arlo cameras - Eufy beta available now!</p>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-300/60 text-sm">
          <p>© 2024 WildGuardian. Protecting Australian homes with AI-powered wildlife detection.</p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Camera, AlertTriangle, Shield, Upload, Zap } from 'lucide-react';

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
      // Check file size (max 5MB)
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
      
      // Enrich with our database info
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
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'CRITICAL': return 'bg-red-100 border-red-500 text-red-900';
      case 'HIGH': return 'bg-orange-100 border-orange-500 text-orange-900';
      case 'MEDIUM': return 'bg-yellow-100 border-yellow-500 text-yellow-900';
      case 'LOW': return 'bg-green-100 border-green-500 text-green-900';
      default: return 'bg-gray-100 border-gray-500 text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold text-white">WildGuardian</h1>
          </div>
          <p className="text-blue-200 text-lg">Australian Wildlife-Aware Home Security</p>
          <p className="text-blue-300 text-sm mt-2">Protecting your home from intruders AND native wildlife</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Upload Security Image</h2>
            </div>
            
            <div className="border-4 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              {!image ? (
                <label className="cursor-pointer block">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload security camera image</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div>
                  <img 
                    src={image} 
                    alt="Uploaded" 
                    className="max-w-full h-64 object-contain mx-auto rounded-lg mb-4"
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setResult(null);
                      setError(null);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            {image && !result && (
              <button
                onClick={analyzeImage}
                disabled={analyzing}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-gray-400"
              >
                {analyzing ? (
                  <>
                    <Zap className="w-5 h-5 animate-pulse" />
                    Analyzing Wildlife...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze Image
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">Detection Results</h2>
            </div>

            {!result ? (
              <div className="text-center py-16 text-gray-400">
                <Shield className="w-24 h-24 mx-auto mb-4 opacity-20" />
                <p>Upload an image to begin wildlife detection</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Risk Alert */}
                <div className={`border-4 rounded-lg p-4 ${getRiskColor(result.risk)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl">{result.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold capitalize">{result.detected}</h3>
                        <p className="text-sm opacity-75">Confidence: {result.confidence}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{result.risk}</div>
                      <div className="text-xs opacity-75">RISK LEVEL</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Detection Time:</span>
                    <span className="font-semibold">{result.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{result.location}</span>
                  </div>
                </div>

                {/* Safety Advice */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <h4 className="font-bold text-blue-900 mb-2">Safety Recommendations:</h4>
                  <p className="text-blue-800 text-sm">{result.advice}</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="tel:000"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-center"
                  >
                    Emergency: 000
                  </a>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                    Find Expert
                  </button>
                </div>

                <button
                  onClick={() => {
                    setResult(null);
                    setImage(null);
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  Analyze Another Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-8 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
            <Shield className="w-8 h-8 mb-2 text-blue-400" />
            <h3 className="font-bold mb-1">Australian Wildlife Database</h3>
            <p className="text-sm text-blue-200">Trained on 50+ native species</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
            <Zap className="w-8 h-8 mb-2 text-yellow-400" />
            <h3 className="font-bold mb-1">Real-Time Analysis</h3>
            <p className="text-sm text-blue-200">Instant threat assessment</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
            <Camera className="w-8 h-8 mb-2 text-green-400" />
            <h3 className="font-bold mb-1">Camera Integration</h3>
            <p className="text-sm text-blue-200">Works with Ring, Arlo, Eufy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

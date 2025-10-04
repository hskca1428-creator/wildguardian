import React, { useState } from 'react';
import { Camera, Video, Zap, Bell, CheckCircle, Play, AlertTriangle, Wifi, Shield, ArrowRight } from 'lucide-react';

export default function EufyIntegrationDemo() {
  const [demoActive, setDemoActive] = useState(false);
  const [currentFeed, setCurrentFeed] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [email, setEmail] = useState('');
  const [signupStatus, setSignupStatus] = useState('idle');

  const cameraFeeds = [
    {
      id: 1,
      name: 'Front Yard Camera',
      location: 'Front Door',
      scenario: 'Eastern Brown Snake detected near doorstep',
      detection: {
        species: 'Eastern Brown Snake',
        risk: 'CRITICAL',
        confidence: 96,
        icon: '🐍',
        advice: 'Do NOT approach. Keep pets and children inside. Snake catcher has been notified automatically.'
      },
      thumbnail: '🏡'
    },
    {
      id: 2,
      name: 'Backyard Camera',
      location: 'Garden Area',
      scenario: 'Possum visiting garden - harmless',
      detection: {
        species: 'Common Brushtail Possum',
        risk: 'LOW',
        confidence: 94,
        icon: '🦡',
        advice: 'Harmless visitor. Protected species. No action needed.'
      },
      thumbnail: '🌳'
    }
  ];

  const startDemo = (feed) => {
    setCurrentFeed(feed);
    setDemoActive(true);
    setDetectionResult(null);
    setTimeout(() => {
      setDetectionResult(feed.detection);
    }, 2000);
  };

  const stopDemo = () => {
    setDemoActive(false);
    setCurrentFeed(null);
    setDetectionResult(null);
  };

  const handleBetaSignup = async () => {
    if (!email || !email.includes('@')) {
      setSignupStatus('error');
      setTimeout(() => setSignupStatus('idle'), 3000);
      return;
    }
    setSignupStatus('loading');
    setTimeout(() => {
      setSignupStatus('success');
      setEmail('');
      setTimeout(() => setSignupStatus('idle'), 5000);
    }, 1500);
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'CRITICAL': return 'from-red-500 to-red-600';
      case 'HIGH': return 'from-orange-500 to-orange-600';
      case 'LOW': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-semibold">Eufy Integration - Beta Available</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Your Eufy Cameras, Now Wildlife-Aware
          </h1>
          
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Automatically detect Australian wildlife on your existing Eufy security cameras. 
            Get instant alerts when dangerous species are spotted.
          </p>

          <button 
            onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Try Live Demo
          </button>
        </div>

        <div id="demo-section" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">See It In Action</h2>
            <p className="text-blue-200 text-lg">Click any camera feed to see wildlife detection</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-blue-400" />
                Your Eufy Cameras
              </h3>
              
              {cameraFeeds.map((feed) => (
                <button
                  key={feed.id}
                  onClick={() => startDemo(feed)}
                  className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{feed.thumbnail}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{feed.name}</h4>
                      <p className="text-sm text-blue-200">{feed.location}</p>
                    </div>
                    <Play className="w-5 h-5 text-blue-400" />
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Detection Results</h3>

              {!detectionResult && !demoActive && (
                <div className="text-center py-16">
                  <Camera className="w-24 h-24 text-blue-400/30 mx-auto mb-4" />
                  <p className="text-blue-300">Select a camera feed to start demo</p>
                </div>
              )}

              {demoActive && !detectionResult && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 border-8 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-white font-semibold text-lg">Analyzing...</p>
                </div>
              )}

              {detectionResult && (
                <div className="space-y-6">
                  <div className={`bg-gradient-to-r ${getRiskColor(detectionResult.risk)} rounded-xl p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl">{detectionResult.icon}</span>
                        <div>
                          <h4 className="text-2xl font-bold">{detectionResult.species}</h4>
                          <p className="text-sm">Confidence: {detectionResult.confidence}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black">{detectionResult.risk}</div>
                        <div className="text-xs">RISK</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
                    <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Alert Sent
                    </h5>
                    <p className="text-blue-200 text-sm">{detectionResult.advice}</p>
                  </div>

                  <button
                    onClick={stopDemo}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all"
                  >
                    Stop Demo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Join the Beta Program</h2>
          <p className="text-blue-100 text-lg mb-8">Free for early adopters</p>

          <div className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleBetaSignup()}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/90 text-gray-900"
              />
              <button
                onClick={handleBetaSignup}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all"
              >
                {signupStatus === 'loading' ? 'Joining...' : 'Join Beta'}
              </button>
            </div>

            {signupStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                <p className="text-green-100">Success! Check your email.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

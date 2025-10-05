import React, { useState, useEffect } from 'react';
import { Camera, Video, Zap, Bell, CheckCircle, Play, Pause, AlertTriangle, Wifi, Shield, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export default function EufyIntegrationDemo() {
  const [demoActive, setDemoActive] = useState(false);
  const [currentFeed, setCurrentFeed] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [email, setEmail] = useState('');
  const [signupStatus, setSignupStatus] = useState('idle');

  // Simulated camera feeds with different scenarios
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
    },
    {
      id: 3,
      name: 'Pool Area Camera',
      location: 'Swimming Pool',
      scenario: 'Blue-tongue lizard near pool',
      detection: {
        species: 'Blue-Tongue Lizard',
        risk: 'LOW',
        confidence: 98,
        icon: '🦎',
        advice: 'Beneficial garden visitor. Eats snails and pests. Let it pass naturally.'
      },
      thumbnail: '🏊'
    },
    {
      id: 4,
      name: 'Side Gate Camera',
      location: 'Side Access',
      scenario: 'Redback spider in corner',
      detection: {
        species: 'Redback Spider',
        risk: 'HIGH',
        confidence: 92,
        icon: '🕷️',
        advice: 'Venomous spider detected. Keep distance. Pest control recommendation sent.'
      },
      thumbnail: '🚪'
    }
  ];

  const startDemo = (feed) => {
    setCurrentFeed(feed);
    setDemoActive(true);
    setDetectionResult(null);
    
    // Simulate detection after 2 seconds
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

    // Simulate API call
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
      case 'MEDIUM': return 'from-yellow-500 to-yellow-600';
      case 'LOW': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-semibold">Eufy Integration Now Live - Beta Available</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Your Eufy Cameras, Now <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Wildlife-Aware</span>
          </h1>
          
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Automatically detect Australian wildlife on your existing Eufy security cameras. 
            Get instant alerts when dangerous species are spotted - 24/7 protection.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Try Live Demo
            </button>
            <button 
              onClick={() => document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              Join Beta Program
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Detection Speed', value: '<3 sec', icon: Zap },
            { label: 'Accuracy', value: '94.7%', icon: CheckCircle },
            { label: 'Species Coverage', value: '56+', icon: Shield },
            { label: 'Beta Testers', value: '500+', icon: Camera }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Live Demo Section */}
        <div id="demo-section" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">See It In Action</h2>
            <p className="text-blue-200 text-lg">Click any camera feed to see wildlife detection in real-time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Camera Feeds */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-blue-400" />
                Your Eufy Cameras
              </h3>
              
              {cameraFeeds.map((feed) => (
                <button
                  key={feed.id}
                  onClick={() => startDemo(feed)}
                  className={`w-full bg-white/10 backdrop-blur-xl border-2 ${
                    currentFeed?.id === feed.id ? 'border-blue-500' : 'border-white/20'
                  } rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-left`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{feed.thumbnail}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white">{feed.name}</h4>
                        {currentFeed?.id === feed.id && demoActive && (
                          <div className="flex items-center gap-2 text-green-400 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Analyzing...
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-blue-200">{feed.location}</p>
                      <p className="text-xs text-gray-400 mt-1">{feed.scenario}</p>
                    </div>
                    <Play className="w-5 h-5 text-blue-400" />
                  </div>
                </button>
              ))}
            </div>

            {/* Detection Results */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                Live Detection Results
              </h3>

              {!currentFeed && !detectionResult && (
                <div className="text-center py-16">
                  <Camera className="w-24 h-24 text-blue-400/30 mx-auto mb-4" />
                  <p className="text-blue-300">Select a camera feed to start demo</p>
                </div>
              )}

              {demoActive && !detectionResult && (
                <div className="text-center py-16">
                  <div className="relative">
                    <div className="w-24 h-24 border-8 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-6"></div>
                    <Zap className="w-12 h-12 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-3" />
                  </div>
                  <p className="text-white font-semibold text-lg">Analyzing camera feed...</p>
                  <p className="text-blue-300 text-sm mt-2">AI detection in progress</p>
                </div>
              )}

              {detectionResult && (
                <div className="space-y-6 animate-fadeIn">
                  <div className={`bg-gradient-to-r ${getRiskColor(detectionResult.risk)} rounded-xl p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl">{detectionResult.icon}</span>
                        <div>
                          <h4 className="text-2xl font-bold">{detectionResult.species}</h4>
                          <p className="text-sm opacity-90">Confidence: {detectionResult.confidence}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black">{detectionResult.risk}</div>
                        <div className="text-xs opacity-90">RISK LEVEL</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
                    <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Instant Alert Sent
                    </h5>
                    <p className="text-blue-200 text-sm">{detectionResult.advice}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Email Sent</p>
                      <p className="text-xs text-gray-400">you@email.com</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <Bell className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Push Alert</p>
                      <p className="text-xs text-gray-400">Mobile app</p>
                    </div>
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

        {/* How It Works */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">How Eufy Integration Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Connect Cameras</h3>
              <p className="text-blue-200">Link your Eufy cameras with one click. No technical setup required.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. AI Monitors 24/7</h3>
              <p className="text-blue-200">Advanced AI analyzes motion-triggered events for wildlife instantly.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. Get Instant Alerts</h3>
              <p className="text-blue-200">Receive notifications when dangerous species are detected.</p>
            </div>
          </div>
        </div>

        {/* Beta Signup */}
        <div id="signup-section" className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Join the Beta Program</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be among the first to protect your home with AI-powered wildlife detection. 
            Limited beta spots available - free for early adopters!
          </p>

          <div className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleBetaSignup()}
                placeholder="Enter your email"
                disabled={signupStatus === 'loading'}
                className="flex-1 px-6 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
              <button
                onClick={handleBetaSignup}
                disabled={signupStatus === 'loading'}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-xl whitespace-nowrap"
              >
                {signupStatus === 'loading' ? 'Joining...' : 'Join Beta (Free)'}
              </button>
            </div>

            {signupStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <p className="text-green-100 text-sm">🎉 Success! Check your email for next steps.</p>
              </div>
            )}

            {signupStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0" />
                <p className="text-red-100 text-sm">Please enter a valid email address</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-8 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Free forever for beta users
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* Compatible Models */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Compatible Eufy Models</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Eufy Cam 2', 'Eufy Cam 2C', 'Eufy Cam 2 Pro', 'Eufy Indoor Cam', 'Eufy Video Doorbell', 'Eufy Cam 3'].map((model) => (
              <div key={model} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold">{model}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

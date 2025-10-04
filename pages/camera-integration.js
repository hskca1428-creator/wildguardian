import React, { useState } from 'react';
import { Camera, CheckCircle, ChevronRight, Video, Wifi, Shield, Zap, AlertCircle, ExternalLink, Download, Settings, Bell, Lock } from 'lucide-react';

export default function CameraIntegration() {
  const [selectedCamera, setSelectedCamera] = useState('eufy');
  const [showSetup, setShowSetup] = useState(false);

  const supportedCameras = [
    {
      id: 'eufy',
      name: 'Eufy Security',
      logo: '🔒',
      status: 'Beta Available',
      statusColor: 'bg-blue-500',
      compatibility: '100%',
      models: ['Eufy Cam 2', 'Eufy Cam 2C', 'Eufy Cam 2 Pro', 'Eufy Indoor Cam', 'Eufy Video Doorbell'],
      features: ['Local storage integration', 'Real-time alerts', 'AI wildlife detection', 'No cloud required'],
      setupTime: '5 minutes',
      difficulty: 'Easy'
      <a 
  href="/eufy-demo"
  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
>
  <Play className="w-6 h-6" />
  Try Live Eufy Demo
  <ArrowRight className="w-5 h-5" />
</a>
    },
    {
      id: 'ring',
      name: 'Ring Security',
      logo: '🔔',
      status: 'Coming Soon',
      statusColor: 'bg-orange-500',
      compatibility: '95%',
      models: ['Ring Video Doorbell', 'Ring Stick Up Cam', 'Ring Floodlight Cam', 'Ring Spotlight Cam'],
      features: ['Cloud integration', 'Motion zones', 'Wildlife notifications', 'Ring app compatible'],
      setupTime: '10 minutes',
      difficulty: 'Medium'
    },
    {
      id: 'arlo',
      name: 'Arlo',
      logo: '📹',
      status: 'Coming Soon',
      statusColor: 'bg-purple-500',
      compatibility: '90%',
      models: ['Arlo Pro 3', 'Arlo Pro 4', 'Arlo Ultra', 'Arlo Essential'],
      features: ['Smart notifications', 'Activity zones', 'Color night vision', 'Wildlife filter'],
      setupTime: '15 minutes',
      difficulty: 'Medium'
    },
    {
      id: 'generic',
      name: 'Generic IP Camera',
      logo: '📷',
      status: 'Available',
      statusColor: 'bg-green-500',
      compatibility: '80%',
      models: ['Any RTSP/HTTP camera', 'ONVIF compatible', 'FTP upload capable'],
      features: ['RTSP stream support', 'FTP image capture', 'Webhook integration', 'API access'],
      setupTime: '20 minutes',
      difficulty: 'Advanced'
    }
  ];

  const eufySetupSteps = [
    {
      step: 1,
      title: 'Download Eufy Security App',
      description: 'Install the official Eufy Security app on your smartphone',
      icon: Download,
      details: [
        'Available on iOS App Store and Google Play',
        'Create an account if you don\'t have one',
        'Ensure your cameras are set up and working'
      ],
      image: '📱'
    },
    {
      step: 2,
      title: 'Enable API Access',
      description: 'Allow WildGuardian to access your Eufy camera feeds',
      icon: Settings,
      details: [
        'Open Eufy app → Settings → Advanced Settings',
        'Enable "Third-party Integration"',
        'Generate API token and copy it'
      ],
      image: '⚙️'
    },
    {
      step: 3,
      title: 'Configure WildGuardian',
      description: 'Connect your Eufy cameras to our AI detection system',
      icon: Wifi,
      details: [
        'Go to WildGuardian Settings → Camera Integration',
        'Select "Eufy Security" as camera type',
        'Paste your API token',
        'Select cameras to monitor'
      ],
      image: '🔗'
    },
    {
      step: 4,
      title: 'Set Up Alerts',
      description: 'Customize how you receive wildlife detection notifications',
      icon: Bell,
      details: [
        'Choose notification method (Email, SMS, Push)',
        'Set detection sensitivity (High/Medium/Low)',
        'Define active monitoring hours',
        'Select species to monitor'
      ],
      image: '🔔'
    }
  ];

  const benefits = [
    {
      title: 'Automatic Wildlife Detection',
      description: 'AI analyzes camera feeds 24/7 for Australian wildlife',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Smart Notifications',
      description: 'Get instant alerts when dangerous species are detected',
      icon: Bell,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Local Processing',
      description: 'Works with Eufy\'s local storage - no cloud required',
      icon: Lock,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Energy Efficient',
      description: 'Only processes motion-triggered events to save bandwidth',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const selectedCameraData = supportedCameras.find(cam => cam.id === selectedCamera);

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
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-2xl">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white">Camera Integration</h1>
              <p className="text-blue-300 text-lg mt-2">Connect your security cameras for 24/7 wildlife monitoring</p>
            </div>
          </div>
        </div>

        {/* Supported Cameras Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-6">Supported Security Cameras</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {supportedCameras.map((camera) => (
              <div
                key={camera.id}
                onClick={() => setSelectedCamera(camera.id)}
                className={`bg-white/95 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedCamera === camera.id 
                    ? 'ring-4 ring-blue-500 scale-105 shadow-2xl' 
                    : 'shadow-xl hover:scale-105 border border-white/20'
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{camera.logo}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{camera.name}</h3>
                  <div className={`${camera.statusColor} text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3`}>
                    {camera.status}
                  </div>
                  <div className="text-sm text-gray-600">
                    {camera.compatibility} Compatible
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Camera Details */}
        {selectedCameraData && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{selectedCameraData.logo}</div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{selectedCameraData.name}</h2>
                  <div className={`${selectedCameraData.statusColor} text-white text-sm font-bold px-4 py-1 rounded-full inline-block mt-2`}>
                    {selectedCameraData.status}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Setup Time</div>
                <div className="text-2xl font-bold text-gray-900">{selectedCameraData.setupTime}</div>
                <div className="text-sm text-gray-600 mt-1">Difficulty: {selectedCameraData.difficulty}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  Compatible Models
                </h3>
                <ul className="space-y-2">
                  {selectedCameraData.models.map((model, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {model}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Features
                </h3>
                <ul className="space-y-2">
                  {selectedCameraData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedCamera === 'eufy' && (
              <button
                onClick={() => setShowSetup(!showSetup)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
              >
                <Settings className="w-6 h-6" />
                {showSetup ? 'Hide Setup Guide' : 'Show Setup Guide'}
                <ChevronRight className={`w-5 h-5 transition-transform ${showSetup ? 'rotate-90' : ''}`} />
              </button>
            )}

            {selectedCamera !== 'eufy' && (
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Coming Soon!</strong> We're working hard to bring {selectedCameraData.name} integration. 
                      Join our waitlist to be notified when it's available.
                    </p>
                    <button className="mt-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Eufy Setup Guide */}
        {showSetup && selectedCamera === 'eufy' && (
          <div className="mb-12 animate-fadeIn">
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Settings className="w-8 h-8 text-green-400" />
              Eufy Camera Setup Guide
            </h2>

            <div className="space-y-6">
              {eufySetupSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                          <span className="text-white font-black text-2xl">{step.step}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-6 h-6 text-blue-600" />
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          <span className="text-4xl ml-auto">{step.image}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        <div className="bg-blue-50 rounded-xl p-4">
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 shadow-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-3">Ready to Connect Your Eufy Camera?</h3>
              <p className="text-green-100 mb-6">Join our beta program and get early access to wildlife detection</p>
              <button className="bg-white hover:bg-gray-100 text-green-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Join Beta Program (Free)
              </button>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-8">Why Integrate Your Cameras?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div className={`bg-gradient-to-br ${benefit.color} rounded-xl w-14 h-14 flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Requirements */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-600" />
            Technical Requirements
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Network</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  WiFi or Ethernet connection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Minimum 5 Mbps upload speed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Open port 443 (HTTPS)
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Camera</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  1080p or higher resolution
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Motion detection enabled
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  API/Integration support
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Account</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  WildGuardian account
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Camera manufacturer app
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Email for notifications
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 mb-12">
          <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
            <ExternalLink className="w-8 h-8 text-blue-400" />
            Developer API Documentation
          </h2>
          <p className="text-gray-300 mb-6">
            Building your own integration? Access our comprehensive API documentation for developers.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              View API Docs
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download SDK
            </a>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
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

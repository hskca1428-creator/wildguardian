import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Welcome to Pro!</h1>
        <p className="text-gray-600 mb-8">Your subscription is now active!</p>
        <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all">
          Start Analyzing <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

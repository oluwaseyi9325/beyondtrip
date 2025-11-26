import React, { useState } from 'react';

// Role Selection Overlay Component
export const RoleSelectionOverlay = ({ onSelectRole, onClose }: any) => {
  const [selectedRole, setSelectedRole] = useState('driver');

  const handleContinue = () => {
    onSelectRole(selectedRole);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 max-w-4xl w-full mx-4 shadow-2xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-normal text-gray-800 mb-2">
            Welcome to Beyond Trips!
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Let's get you started
          </h1>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Driver Card */}
          <button
            onClick={() => setSelectedRole('driver')}
            className={`relative group rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 ${
              selectedRole === 'driver'
                ? 'bg-gradient-to-br from-blue-700 to-blue-900 shadow-2xl'
                : 'bg-white hover:shadow-xl'
            }`}
          >
            {/* Checkmark Badge */}
            {selectedRole === 'driver' && (
              <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <svg
                className={`w-32 h-32 ${selectedRole === 'driver' ? 'text-white' : 'text-blue-700'}`}
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {/* Person */}
                <circle cx="100" cy="50" r="25" />
                {/* Body */}
                <path d="M100 75 L85 100 L70 120 L70 130 L80 130 L90 110 L90 150 L110 150 L110 110 L120 130 L130 130 L130 120 L115 100 Z" />
                {/* Steering Wheel */}
                <circle cx="100" cy="115" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="100" cy="115" r="8" />
              </svg>
            </div>

            {/* Text */}
            <h3
              className={`text-2xl font-semibold text-center ${
                selectedRole === 'driver' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Sign up as a Driver
            </h3>
          </button>

          {/* Partner Card */}
          <button
            onClick={() => setSelectedRole('partner')}
            className={`relative group rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 ${
              selectedRole === 'partner'
                ? 'bg-gradient-to-br from-blue-700 to-blue-900 shadow-2xl'
                : 'bg-white hover:shadow-xl'
            }`}
          >
            {/* Checkmark Badge */}
            {selectedRole === 'partner' && (
              <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <svg
                className={`w-32 h-32 ${selectedRole === 'partner' ? 'text-white' : 'text-gray-700'}`}
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {/* Person 1 */}
                <circle cx="70" cy="45" r="20" />
                <path d="M70 65 L60 85 L50 100 L50 108 L58 108 L65 92 L65 125 L75 125 L75 92 L82 108 L90 108 L90 100 L80 85 Z" />
                {/* Briefcase 1 */}
                <rect x="52" y="110" width="12" height="15" rx="2" />
                
                {/* Person 2 */}
                <circle cx="130" cy="45" r="20" />
                <path d="M130 65 L120 85 L110 100 L110 108 L118 108 L125 92 L125 125 L135 125 L135 92 L142 108 L150 108 L150 100 L140 85 Z" />
                {/* Briefcase 2 */}
                <rect x="138" y="110" width="12" height="15" rx="2" />
              </svg>
            </div>

            {/* Text */}
            <h3
              className={`text-2xl font-semibold text-center ${
                selectedRole === 'partner' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Become a Partner
            </h3>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl font-semibold py-5 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] mb-6"
        >
          Continue
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-700 text-lg">
          Already have an account?{' '}
          <button
            onClick={onClose}
            className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
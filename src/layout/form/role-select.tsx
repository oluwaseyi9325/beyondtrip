// RoleSelectionOverlay.tsx
import React, { useState } from 'react';

export const RoleSelectionOverlay = ({ onSelectRole, onClose }: any) => {
  const [selectedRole, setSelectedRole] = useState('driver');

  const handleContinue = () => {
    onSelectRole(selectedRole);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl relative">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xl md:text-2xl text-gray-700 mb-2">
            Welcome to Beyond Trips!
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Let's get you started
          </h1>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* Driver Card */}
          <button
            onClick={() => setSelectedRole('driver')}
            className={`relative group rounded-3xl p-8 transition-all duration-300 ${
              selectedRole === 'driver'
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl scale-105'
                : 'bg-white hover:shadow-lg border-2 border-gray-200'
            }`}
          >
            {/* Checkmark Badge */}
            {selectedRole === 'driver' && (
              <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1.5 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <svg
                className={`w-28 h-28 ${selectedRole === 'driver' ? 'text-white' : 'text-gray-700'}`}
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {/* Person head */}
                <circle cx="100" cy="50" r="22" />
                {/* Person body */}
                <ellipse cx="100" cy="90" rx="18" ry="12" />
                {/* Arms on steering wheel */}
                <path d="M82 85 Q75 95, 75 105 M118 85 Q125 95, 125 105" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
                {/* Steering Wheel */}
                <circle cx="100" cy="110" r="22" fill="none" stroke="currentColor" strokeWidth="5" />
                {/* Steering wheel center */}
                <circle cx="100" cy="110" r="8" />
                {/* Body lower part */}
                <path d="M82 100 L75 135 L85 135 L90 115 L90 150 L110 150 L110 115 L115 135 L125 135 L118 100" />
              </svg>
            </div>

            {/* Text */}
            <h3
              className={`text-xl md:text-2xl font-semibold text-center ${
                selectedRole === 'driver' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Sign up as a Driver
            </h3>
          </button>

          {/* Partner Card */}
          <button
            onClick={() => setSelectedRole('partner')}
            className={`relative group rounded-3xl p-8 transition-all duration-300 ${
              selectedRole === 'partner'
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl scale-105'
                : 'bg-white hover:shadow-lg border-2 border-gray-200'
            }`}
          >
            {/* Checkmark Badge */}
            {selectedRole === 'partner' && (
              <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1.5 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <svg
                className={`w-28 h-28 ${selectedRole === 'partner' ? 'text-white' : 'text-gray-700'}`}
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {/* Person 1 head */}
                <circle cx="65" cy="45" r="18" />
                {/* Person 1 body */}
                <path d="M65 63 L55 85 L48 105 L48 112 L55 112 L60 95 L60 135 L70 135 L70 95 L75 112 L82 112 L82 105 L75 85 Z" />
                {/* Briefcase 1 */}
                <rect x="50" y="115" width="10" height="12" rx="1.5" />
                
                {/* Person 2 head */}
                <circle cx="135" cy="45" r="18" />
                {/* Person 2 body */}
                <path d="M135 63 L125 85 L118 105 L118 112 L125 112 L130 95 L130 135 L140 135 L140 95 L145 112 L152 112 L152 105 L145 85 Z" />
                {/* Briefcase 2 */}
                <rect x="140" y="115" width="10" height="12" rx="1.5" />
              </svg>
            </div>

            {/* Text */}
            <h3
              className={`text-xl md:text-2xl font-semibold text-center ${
                selectedRole === 'partner' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Become a Partner
            </h3>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg md:text-xl font-semibold py-4 md:py-5 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] mb-6"
        >
          Continue
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-700 text-base md:text-lg">
          Already have an account?{' '}
          <button
            onClick={onClose}
            className="text-blue-600 font-bold hover:text-blue-700 transition-colors underline-offset-2 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
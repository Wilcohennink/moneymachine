'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TopBannerProps {
  remainingShares: number;
  onShareClick: () => void;
}

export default function TopBanner({ remainingShares, onShareClick }: TopBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem('topBannerDismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('topBannerDismissed', 'true');
  };

  if (!isVisible || remainingShares <= 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] text-white py-3 px-4 shadow-lg relative animate-slide-down">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Message */}
        <div className="flex items-center gap-3 flex-1">
          <span className="text-2xl">⚡</span>
          <p className="font-semibold text-sm sm:text-base">
            Nog <span className="font-bold text-[#FFD700]">{remainingShares}</span> {remainingShares === 1 ? 'share' : 'shares'} voor premium templates!
          </p>
        </div>

        {/* CTA button */}
        <button
          onClick={onShareClick}
          className="bg-white text-[#00D4FF] hover:bg-gray-100 font-bold py-2 px-4 sm:px-6 rounded-lg transition-all hover:scale-105 text-sm sm:text-base whitespace-nowrap"
        >
          Deel nu →
        </button>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="text-white/80 hover:text-white transition p-1"
          aria-label="Dismiss banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

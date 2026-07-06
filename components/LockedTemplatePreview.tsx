'use client';

import { Lock } from 'lucide-react';

interface LockedTemplatePreviewProps {
  templateName: string;
  templatePreviewImage?: string;
  remainingShares: number;
  onUnlockClick: () => void;
}

export default function LockedTemplatePreview({
  templateName,
  templatePreviewImage,
  remainingShares,
  onUnlockClick,
}: LockedTemplatePreviewProps) {
  return (
    <div className="relative group cursor-pointer" onClick={onUnlockClick}>
      {/* Template preview (blurred) */}
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-100 aspect-[3/4]">
        {templatePreviewImage ? (
          <img
            src={templatePreviewImage}
            alt={templateName}
            className="w-full h-full object-cover blur-sm group-hover:blur-md transition-all"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 blur-sm group-hover:blur-md transition-all" />
        )}

        {/* Lock overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center">
          {/* Lock icon */}
          <div className="bg-white/90 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
            <Lock size={32} className="text-gray-700" />
          </div>

          {/* Unlock message */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4 text-center max-w-xs mx-4 shadow-xl group-hover:scale-105 transition-transform">
            <h3 className="font-bold text-gray-900 mb-2">{templateName}</h3>
            <p className="text-sm text-gray-600 mb-3">
              Unlock met <span className="font-bold text-[#00D4FF]">{remainingShares}</span> {remainingShares === 1 ? 'share' : 'shares'}
            </p>

            <button className="bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] hover:from-[#00A8CC] hover:to-[#008099] text-white font-bold py-2 px-6 rounded-lg transition-all w-full">
              Deel nu
            </button>
          </div>
        </div>

        {/* Premium badge */}
        <div className="absolute top-3 right-3 bg-[#FFD700] text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          PREMIUM
        </div>
      </div>

      {/* Template name below */}
      <div className="mt-2 text-center">
        <p className="text-sm font-semibold text-gray-700">{templateName}</p>
        <p className="text-xs text-gray-500">🔒 Locked</p>
      </div>
    </div>
  );
}

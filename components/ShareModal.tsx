'use client';

import { useState, useEffect } from 'react';
import { X, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentShares: number;
  requiredShares: number;
  userRefCode: string;
  onShare: (platform: 'whatsapp' | 'linkedin' | 'email') => void;
}

export default function ShareModal({
  isOpen,
  onClose,
  currentShares,
  requiredShares,
  userRefCode,
  onShare,
}: ShareModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [canClose, setCanClose] = useState(false);

  const shareUrl = `https://zzpfactuur.nl?ref=${userRefCode}`;

  const whatsappMessage = encodeURIComponent(
    `Hey! Ik gebruik deze gratis factuur generator voor ZZP'ers 🚀\n\nSuper handig voor BTW-berekening en professionele facturen maken zonder gedoe.\n\nProbeer hem hier: ${shareUrl}\n\nPS: Als je 'm gebruikt help je mij premium templates te unlocken 😄`
  );

  const linkedInMessage = encodeURIComponent(
    `Voor alle ZZP'ers: ik kwam deze handige factuur generator tegen 📊\n\n✅ Gratis BTW-berekening\n✅ Professionele templates\n✅ Direct PDF export\n\nScheelt me 30 min per factuur. Check it out: ${shareUrl}\n\n#ZZP #Freelance #Nederland`
  );

  const emailSubject = encodeURIComponent('Probeer deze gratis ZZP factuur tool');
  const emailBody = encodeURIComponent(
    `Hoi,\n\nIk gebruik sinds kort deze gratis factuur generator voor ZZP'ers en dacht: dit kan jou ook helpen!\n\nWat het doet:\n- BTW automatisch berekenen\n- Professionele facturen maken\n- Direct downloaden als PDF\n\nLink: ${shareUrl}\n\nGroet`
  );

  useEffect(() => {
    if (isOpen) {
      // Prevent closing for first 3 seconds (anti-dismiss)
      setCanClose(false);
      const timer = setTimeout(() => setCanClose(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleShare = (platform: 'whatsapp' | 'linkedin' | 'email') => {
    let shareLink = '';

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${whatsappMessage}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        break;
    }

    window.open(shareLink, '_blank');
    onShare(platform);
    setShowSuccess(true);

    // Reset success state after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const progress = Math.min((currentShares / requiredShares) * 100, 100);
  const remaining = Math.max(requiredShares - currentShares, 0);
  const isUnlocked = currentShares >= requiredShares;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-scale-in">
        {/* Close button (only after 3 seconds) */}
        {canClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        )}

        {!showSuccess && !isUnlocked ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Je eerste factuur is klaar!
              </h2>
              <p className="text-gray-600">
                Unlock <span className="font-semibold text-[#00D4FF]">5 premium templates</span>:
                <br />
                Deel dit met {requiredShares} ZZP'ers
              </p>
            </div>

            {/* Share buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span className="text-xl">💬</span>
                Deel via WhatsApp
              </button>

              <button
                onClick={() => handleShare('linkedin')}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span className="text-xl">💼</span>
                Deel op LinkedIn
              </button>

              <button
                onClick={() => handleShare('email')}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span className="text-xl">✉️</span>
                Deel via Email
              </button>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-semibold text-gray-900">
                  {currentShares}/{requiredShares}
                </span>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: requiredShares }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      i < currentShares ? 'bg-[#00D4FF]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={canClose ? onClose : undefined}
                disabled={!canClose}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
                  canClose
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                Later
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex-1 bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] hover:from-[#00A8CC] hover:to-[#008099] text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                Deel nu
                <Share2 size={18} />
              </button>
            </div>
          </>
        ) : showSuccess ? (
          <>
            {/* Success state */}
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Gedeeld!
              </h2>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex gap-1 justify-center mb-4">
                  {Array.from({ length: requiredShares }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${
                        i < currentShares ? 'bg-[#00D4FF] scale-110' : 'bg-gray-200'
                      }`}
                    >
                      {i < currentShares ? '🟢' : '⚪'}
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 font-medium">
                  Nog <span className="text-[#00D4FF] font-bold">{remaining}</span> {remaining === 1 ? 'share' : 'shares'} voor premium templates
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    // Don't close modal, let user share again
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition"
                >
                  Deel opnieuw
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Dashboard →
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Unlocked state */}
            <div className="text-center py-8">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Premium Unlocked!
              </h2>
              <p className="text-gray-600 mb-6">
                Je hebt toegang tot <span className="font-semibold text-[#FFD700]">5 premium templates</span>
              </p>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 font-bold py-4 px-6 rounded-lg transition hover:scale-105"
              >
                Bekijk Premium Templates →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import ShareModal from '@/components/ShareModal';
import DashboardUnlockWidget from '@/components/DashboardUnlockWidget';
import TopBanner from '@/components/TopBanner';
import LockedTemplatePreview from '@/components/LockedTemplatePreview';

export default function ViralDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShares, setCurrentShares] = useState(1);
  const requiredShares = 3;

  const handleShare = (platform: 'whatsapp' | 'linkedin' | 'email') => {
    console.log(`Shared via ${platform}`);
    // In production, this would track the share event
    setCurrentShares((prev) => Math.min(prev + 1, requiredShares));
  };

  const remainingShares = Math.max(requiredShares - currentShares, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <TopBanner
        remainingShares={remainingShares}
        onShareClick={() => setIsModalOpen(true)}
      />

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Viral Loop Components Demo
          </h1>
          <p className="text-gray-600">
            Preview van alle share-to-unlock UI componenten voor ZZP Invoice Generator
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Demo controls */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Demo Controls</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Shares: {currentShares} / {requiredShares}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={requiredShares}
                    value={currentShares}
                    onChange={(e) => setCurrentShares(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#00D4FF] hover:bg-[#00A8CC] text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Open Share Modal
                </button>

                <button
                  onClick={() => setCurrentShares(0)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                >
                  Reset Shares
                </button>
              </div>
            </div>

            {/* Locked Templates Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Locked Templates</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <LockedTemplatePreview
                  templateName="Modern Minimal"
                  remainingShares={remainingShares}
                  onUnlockClick={() => setIsModalOpen(true)}
                />
                <LockedTemplatePreview
                  templateName="Professional Blue"
                  remainingShares={remainingShares}
                  onUnlockClick={() => setIsModalOpen(true)}
                />
                <LockedTemplatePreview
                  templateName="Creative Dark"
                  remainingShares={remainingShares}
                  onUnlockClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>

            {/* Component specs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Component Specifications</h2>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. ShareModal</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Triggered after first invoice generation</li>
                    <li>3-second anti-dismiss delay</li>
                    <li>WhatsApp, LinkedIn, Email share options</li>
                    <li>Real-time progress tracking</li>
                    <li>Success and unlocked states</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. DashboardUnlockWidget</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Persistent sidebar widget</li>
                    <li>Visual progress indicators</li>
                    <li>Next unlock preview</li>
                    <li>Dark theme for contrast</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. TopBanner</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Persistent until Tier 1 unlocked</li>
                    <li>Session-based dismissal</li>
                    <li>Responsive mobile/desktop</li>
                    <li>High-contrast CTA</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">4. LockedTemplatePreview</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Blurred template preview</li>
                    <li>Lock icon overlay</li>
                    <li>Hover scale effect</li>
                    <li>Premium badge indicator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <DashboardUnlockWidget
                currentShares={currentShares}
                requiredShares={requiredShares}
                nextUnlock="Premium Templates"
                onShareClick={() => setIsModalOpen(true)}
              />

              {/* Design notes */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h3 className="font-bold text-yellow-900 mb-2">Design Notes</h3>
                <ul className="text-xs text-yellow-800 space-y-1">
                  <li>✅ Brand colors: #00D4FF (blue), #FFD700 (gold)</li>
                  <li>✅ Mobile-first responsive design</li>
                  <li>✅ Dutch tone of voice</li>
                  <li>✅ Micro-interactions on hover/click</li>
                  <li>✅ Celebration animations on unlock</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentShares={currentShares}
        requiredShares={requiredShares}
        userRefCode="DEMO_ABC123"
        onShare={handleShare}
      />

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

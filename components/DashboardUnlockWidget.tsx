'use client';

interface DashboardUnlockWidgetProps {
  currentShares: number;
  requiredShares: number;
  nextUnlock: string;
  onShareClick: () => void;
}

export default function DashboardUnlockWidget({
  currentShares,
  requiredShares,
  nextUnlock,
  onShareClick,
}: DashboardUnlockWidgetProps) {
  const progress = Math.min((currentShares / requiredShares) * 100, 100);
  const remaining = Math.max(requiredShares - currentShares, 0);
  const isUnlocked = currentShares >= requiredShares;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🚀</span>
        <h3 className="text-white font-bold text-lg">UNLOCK PROGRESS</h3>
      </div>

      {/* Progress circles */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: requiredShares }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-500 ${
              i < currentShares
                ? 'bg-[#00D4FF] scale-110 shadow-lg shadow-[#00D4FF]/50'
                : 'bg-gray-700'
            }`}
          >
            {i < currentShares ? '🟢' : '⚪'}
          </div>
        ))}
      </div>

      {/* Share count */}
      <div className="text-[#00D4FF] font-bold text-xl mb-4">
        {currentShares}/{requiredShares} shares
      </div>

      {!isUnlocked ? (
        <>
          {/* Next unlock info */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">Next unlock:</p>
            <p className="text-white font-semibold">{nextUnlock}</p>
          </div>

          {/* CTA button */}
          <button
            onClick={onShareClick}
            className="w-full bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] hover:from-[#00A8CC] hover:to-[#008099] text-white font-bold py-3 px-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Deel nu
            <span>→</span>
          </button>

          {/* Remaining shares info */}
          <p className="text-gray-400 text-xs text-center mt-3">
            Nog {remaining} {remaining === 1 ? 'share' : 'shares'} nodig
          </p>
        </>
      ) : (
        <>
          {/* Unlocked state */}
          <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700] rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">✅</span>
              <span className="text-white font-bold">Unlocked!</span>
            </div>
            <p className="text-gray-300 text-sm">{nextUnlock}</p>
          </div>

          {/* Next tier teaser */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Next tier:</p>
            <p className="text-white font-semibold text-sm mb-3">BTW Toolkit</p>
            <button
              onClick={onShareClick}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
            >
              Unlock volgende tier →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

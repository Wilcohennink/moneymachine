"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welkom bij ZZP Admin Suite!</h1>
          <p className="text-xl text-gray-700">
            Je gratis proefperiode van 14 dagen is gestart. Tijd om je administratie op autopilot te zetten.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-4">Wat gebeurt er nu?</h2>
          <ol className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                1
              </span>
              <div>
                <strong>Je ontvangt een welkomstmail</strong>
                <p className="text-gray-600">
                  Check je inbox binnen 5 minuten voor je login-gegevens en onboarding guide.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                2
              </span>
              <div>
                <strong>Voeg je bedrijfsgegevens toe</strong>
                <p className="text-gray-600">KvK-nummer, BTW-nummer en je factuurgegevens. Duurt 2 minuten.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                3
              </span>
              <div>
                <strong>Verstuur je eerste factuur</strong>
                <p className="text-gray-600">
                  Gebruik onze templates en genereer je eerste KvK-compliant factuur in 30 seconden.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                4
              </span>
              <div>
                <strong>Test alle features</strong>
                <p className="text-gray-600">
                  BTW-tracking, uitgaven, contracten, uurtarief calculator — probeer alles 14 dagen gratis.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-2">💡 Pro-tip</h3>
          <p className="text-gray-800">
            Begin met het versturen van je eerste factuur. 92% van onze gebruikers doet dit binnen de eerste 10
            minuten — en dat is het moment waarop ze verliefd worden op ZZP Admin Suite.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="https://app.zzpadminsuite.nl"
            className="block bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition"
          >
            Ga naar je dashboard →
          </a>
          <a
            href="/saas"
            className="block text-gray-600 hover:text-gray-900 transition"
          >
            ← Terug naar homepage
          </a>
        </div>

        {sessionId && (
          <p className="text-sm text-gray-500 mt-8">
            Transactie ID: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Hulp nodig?</h3>
          <p className="text-gray-700 mb-4">
            Ons support team staat klaar om je te helpen. Stuur een mail naar{" "}
            <a href="mailto:support@zzpadminsuite.nl" className="text-green-600 hover:underline">
              support@zzpadminsuite.nl
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Je wordt pas gefactureerd na 14 dagen. Opzeggen kan altijd via je dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SaaSSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-xl text-gray-600">Laden...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

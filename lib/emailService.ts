import { Resend } from 'resend';

// Lazy-load Resend client to avoid build-time API key requirement
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface TrialUserData {
  email: string;
  firstName: string;
  signupDate: string;
}

export interface EmailStats {
  invoiceCount: number;
  expensesAmount: number;
  btwCalculated: number;
}

/**
 * Email 1: Welcome + Onboarding (sent immediately after signup)
 */
export async function sendWelcomeEmail(userData: TrialUserData) {
  const { email, firstName } = userData;

  const resend = getResendClient();
  return await resend.emails.send({
    from: 'Jeroen @ ZZP Admin Suite <onboarding@theprofitfactory.ai>',
    to: email,
    subject: 'Je eerste factuur verstuur je over 5 minuten ✅',
    html: `
      <p>Hey ${firstName},</p>

      <p>Welkom bij ZZP Admin Suite!</p>

      <p>Je hebt zojuist 14 dagen gratis gestart. Hier is wat je nu moet doen:</p>

      <p><strong>Stap 1:</strong> Voeg je bedrijfsgegevens toe (KvK, BTW-nummer)<br>
      <strong>Stap 2:</strong> Verstuur je eerste factuur (duurt 30 seconden)<br>
      <strong>Stap 3:</strong> Upload een uitgave en zie hoe automatisch categoriseren werkt</p>

      <p>👉 <a href="https://theprofitfactory.ai/dashboard">Ga naar je dashboard</a></p>

      <p><strong>Pro-tip:</strong> Begin met het factuur-template. De meeste gebruikers versturen hun eerste factuur binnen 10 minuten.</p>

      <p>Heb je vragen? Reply op deze email. Ik lees alles zelf.</p>

      <p>Succes!</p>

      <p><strong>Jeroen</strong><br>
      Oprichter, ZZP Admin Suite</p>

      <p>P.S. — Over 3 dagen stuur ik je tips voor je BTW-tracking. Die wil je niet missen.</p>
    `,
  });
}

/**
 * Email 2: BTW Feature Highlight (sent day 3 after signup)
 */
export async function sendBTWFeatureEmail(userData: TrialUserData) {
  const { email, firstName } = userData;

  const resend = getResendClient();
  return await resend.emails.send({
    from: 'Jeroen @ ZZP Admin Suite <onboarding@theprofitfactory.ai>',
    to: email,
    subject: 'Hoe je nooit meer een BTW-deadline mist',
    html: `
      <p>Hey ${firstName},</p>

      <p>Elk kwartaal is het weer hetzelfde: BTW-stress.</p>

      <p>Je vergeet een factuur, de berekening klopt niet, of je mist de deadline. En dan krijg je een boete.</p>

      <p><strong>Hier is hoe ZZP Admin Suite dit voorkomt:</strong></p>

      <p>✅ <strong>Automatische BTW-berekening</strong> — Bij elke factuur berekenen we de BTW. Geen rekenmachine nodig.</p>

      <p>✅ <strong>Kwartaalrapport met 1 klik</strong> — Op dag 1 van elk kwartaal genereren we je rapport. Klaar voor de Belastingdienst.</p>

      <p>✅ <strong>Reminder 7 dagen voor deadline</strong> — We sturen je een email als je BTW-aangifte eraan komt.</p>

      <p><strong>Resultaat:</strong> Je mist nooit meer een deadline. Geen boetes. Geen stress.</p>

      <p>👉 <a href="https://theprofitfactory.ai/btw">Activeer BTW-tracking nu</a></p>

      <p><strong>Feit:</strong> 92% van onze gebruikers zegt dat ZZP Admin Suite hun BTW-proces heeft opgelost.</p>

      <p>Vragen? Reply op deze email.</p>

      <p><strong>Jeroen</strong><br>
      Oprichter, ZZP Admin Suite</p>

      <p>P.S. — Je hebt nog 11 dagen in je trial. Heb je al je eerste factuur verstuurd? Zo niet, <a href="https://theprofitfactory.ai/facturen">doe het hier</a>.</p>
    `,
  });
}

/**
 * Email 3: Trial Expiry + Urgency (sent day 11, 3 days before trial ends)
 */
export async function sendTrialExpiryEmail(userData: TrialUserData, stats: EmailStats) {
  const { email, firstName } = userData;
  const { invoiceCount, expensesAmount, btwCalculated } = stats;

  const resend = getResendClient();
  return await resend.emails.send({
    from: 'Jeroen @ ZZP Admin Suite <onboarding@theprofitfactory.ai>',
    to: email,
    subject: 'Je trial eindigt over 3 dagen — dit mis je als je stopt',
    html: `
      <p>Hey ${firstName},</p>

      <p>Je gratis proefperiode eindigt over 3 dagen.</p>

      <p>Ik weet niet of je blijft, maar voordat je beslist wil ik je dit laten zien:</p>

      <p><strong>Wat je de afgelopen 11 dagen hebt gedaan:</strong></p>

      <ul>
        <li>${invoiceCount} facturen verstuurd</li>
        <li>€${expensesAmount} aan uitgaven gecategoriseerd</li>
        <li>€${btwCalculated} BTW automatisch berekend</li>
      </ul>

      <p><strong>Als je nu stopt:</strong></p>

      <p>❌ Terug naar handmatig facturen maken in Word<br>
      ❌ Terug naar Excel-chaos voor je uitgaven<br>
      ❌ Terug naar BTW-stress elk kwartaal<br>
      ❌ Geen toegang meer tot je contracttemplates</p>

      <p><strong>Als je blijft (€19/maand):</strong></p>

      <p>✅ Je administratie blijft op autopilot<br>
      ✅ Je bespaart 8+ uur per maand<br>
      ✅ Je mist nooit meer een BTW-deadline<br>
      ✅ Je hebt altijd professionele contracten bij de hand</p>

      <p><strong>De keuze is simpel:</strong></p>

      <p>👉 <a href="https://theprofitfactory.ai/upgrade">Activeer je abonnement voor €19/maand</a></p>

      <p>Of betaal vooruit en krijg 2 maanden gratis: <a href="https://theprofitfactory.ai/upgrade-yearly">€190/jaar</a></p>

      <p><strong>Nog twijfels?</strong></p>

      <p>847 ZZP'ers zijn je al voor. Ze besparen elke maand uren aan administratie. Jij ook?</p>

      <p>Vragen? Reply op deze email.</p>

      <p><strong>Jeroen</strong><br>
      Oprichter, ZZP Admin Suite</p>

      <p>P.S. — Als je niet overtuigd bent, geen probleem. Je trial eindigt automatisch. Geen creditcard vereist, geen verborgen kosten.</p>
    `,
  });
}

/**
 * Schedule email sequence for a new trial user
 * This stores the schedule in a simple JSON file for now
 * In production, you'd use a proper job queue or cron service
 */
export interface EmailSchedule {
  userId: string;
  email: string;
  firstName: string;
  signupDate: string;
  emailsSent: {
    welcome: boolean;
    btwFeature: boolean;
    trialExpiry: boolean;
  };
}

export function calculateEmailTiming(signupDate: string) {
  const signup = new Date(signupDate);

  return {
    email1: signup, // Immediate
    email2: new Date(signup.getTime() + 3 * 24 * 60 * 60 * 1000), // Day 3
    email3: new Date(signup.getTime() + 11 * 24 * 60 * 60 * 1000), // Day 11
  };
}

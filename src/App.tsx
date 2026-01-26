import { useEffect } from 'react';
import QuizView from './components/QuizView';
import LandingPage from './components/LandingPage';
import DevShortcuts from './components/DevShortcuts';
import { useQuizStore } from './store/useQuizStore';

function App() {
  const { showQuiz, startQuiz, utmParams, setUtmParams } = useQuizStore();

  // Capture UTM params and click IDs on initial load (before they're lost)
  useEffect(() => {
    // Only capture if we haven't already (empty utmParams)
    if (Object.keys(utmParams).length === 0) {
      const params = new URLSearchParams(window.location.search);
      const captured: Record<string, string> = {};

      // Standard UTM parameters
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
        const val = params.get(key);
        if (val) captured[key] = val;
      });

      // Platform-specific click IDs
      const ttclid = params.get('ttclid'); // TikTok
      const fbclid = params.get('fbclid'); // Facebook
      const gclid = params.get('gclid');   // Google

      if (ttclid) captured.ttclid = ttclid;
      if (fbclid) captured.fbclid = fbclid;
      if (gclid) captured.gclid = gclid;

      // Store if we found any params
      if (Object.keys(captured).length > 0) {
        console.log('[UTM] Captured traffic params:', captured);
        setUtmParams(captured);
      }
    }
  }, []); // Only run once on mount

  return (
    <main>
      {showQuiz ? (
        <QuizView />
      ) : (
        <LandingPage onStartQuiz={startQuiz} />
      )}
      <DevShortcuts />
    </main>
  );
}

export default App;


import QuizView from './components/QuizView';
import LandingPage from './components/LandingPage';
import DevShortcuts from './components/DevShortcuts';
import { useQuizStore } from './store/useQuizStore';

function App() {
  const { showQuiz, startQuiz } = useQuizStore();

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

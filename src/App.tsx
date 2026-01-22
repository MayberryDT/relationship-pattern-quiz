import { useState } from 'react';
import QuizView from './components/QuizView';
import LandingPage from './components/LandingPage';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <main>
      {showQuiz ? (
        <QuizView />
      ) : (
        <LandingPage onStartQuiz={() => setShowQuiz(true)} />
      )}
    </main>
  );
}

export default App;

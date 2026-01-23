import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useQuizStore } from '../store/useQuizStore';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultsTeaser from './ResultsTeaser';
import PaidReport from './PaidReport';
import type { Question, Answer, Phase } from '../types';
import { PHASE_NAMES } from '../types';
import { trackEvent } from '../lib/analytics';


const QuizView: React.FC = () => {
    const { currentQuestionIndex, addAnswer, addReflection, nextQuestion, answers, isUnlocked, setUnlock, scores, flags, quizSessionId } = useQuizStore();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [lastPhase, setLastPhase] = useState<string | null>(null);

    const shouldShowQuestion = (question: Question) => {
        const logic = question.gating_logic;
        if (!logic || Object.keys(logic).length === 0) return true;

        if (logic.required_flags) {
            const req = Array.isArray(logic.required_flags) ? logic.required_flags : [logic.required_flags];
            if (!req.some(f => flags.includes(f))) return false;
        }

        if (logic.prohibit_flags) {
            const pro = Array.isArray(logic.prohibit_flags) ? logic.prohibit_flags : [logic.prohibit_flags];
            if (pro.some(f => flags.includes(f))) return false;
        }

        if (logic.min_scores) {
            for (const [axis, min] of Object.entries(logic.min_scores)) {
                if ((scores[axis as keyof typeof scores] || 0) < (min as number)) return false;
            }
        }

        return true;
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            setUnlock(true);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [setUnlock]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) {
                console.error('Error fetching questions:', error);
            } else {
                setQuestions(data || []);
            }
            setLoading(false);
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        const fetchAnswers = async () => {
            if (questions.length > 0 && currentQuestionIndex < questions.length) {
                const currentQuestion = questions[currentQuestionIndex];

                // Track phase entry
                if (currentQuestion.phase !== lastPhase) {
                    trackEvent(quizSessionId, 'phase_enter', { phase: currentQuestion.phase });
                    setLastPhase(currentQuestion.phase);
                }

                // If this question should be skipped, move to next
                if (!shouldShowQuestion(currentQuestion)) {
                    nextQuestion();
                    return;
                }

                const { data, error } = await supabase
                    .from('answers')
                    .select('*')
                    .eq('question_id', currentQuestion.id);

                if (error) {
                    console.error('Error fetching answers:', error);
                } else {
                    setCurrentAnswers(data || []);
                }
            }
        };

        fetchAnswers();
        setSelectedAnswer(null);
    }, [questions, currentQuestionIndex, flags, scores, lastPhase, quizSessionId]);

    const handleSelect = (answer: Answer) => {
        setSelectedAnswer(answer);
    };

    const handleContinue = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer && currentQuestion) {
            trackEvent(quizSessionId, 'question_answered', {
                question_id: currentQuestion.id,
                answer_id: selectedAnswer.id
            });
            if (currentQuestion.type === 'text') {
                addReflection(currentQuestion.id, selectedAnswer.text);
            } else {
                addAnswer(currentQuestion.id, selectedAnswer);
            }
            nextQuestion();
        }
    };

    if (loading) {
        return <div className="container serif">Loading diagnostic...</div>;
    }

    if (currentQuestionIndex >= questions.length && questions.length > 0) {
        if (!isUnlocked) {
            return <ResultsTeaser />;
        }
        return <PaidReport />;
    }


    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container">
            {currentQuestion && (
                <>
                    <ProgressBar
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                        phase={PHASE_NAMES[currentQuestion.phase as Phase]}
                    />
                    <QuestionCard
                        question={currentQuestion}
                        answers={currentAnswers}
                        selectedAnswerId={selectedAnswer?.id || answers[currentQuestion.id]}
                        onSelect={handleSelect}
                        onContinue={handleContinue}
                        canContinue={!!selectedAnswer}
                    />
                </>
            )}
        </div>
    );
};

export default QuizView;

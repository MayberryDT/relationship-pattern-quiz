import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useQuizStore } from '../store/useQuizStore';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultsTeaser from './ResultsTeaser';
import type { Question, Answer } from '../types';

const QuizView: React.FC = () => {
    const { currentQuestionIndex, addAnswer, addReflection, nextQuestion, answers, isUnlocked } = useQuizStore();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

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
                const questionId = questions[currentQuestionIndex].id;
                const { data, error } = await supabase
                    .from('answers')
                    .select('*')
                    .eq('question_id', questionId);

                if (error) {
                    console.error('Error fetching answers:', error);
                } else {
                    setCurrentAnswers(data || []);
                }
            }
        };

        fetchAnswers();
        // Reset selected answer when question changes
        setSelectedAnswer(null);
    }, [questions, currentQuestionIndex]);

    const handleSelect = (answer: Answer) => {
        setSelectedAnswer(answer);
    };

    const handleContinue = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer && currentQuestion) {
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
        return (
            <div className="container text-center">
                <h1 className="serif question-text">Diagnostic Unlocked</h1>
                <p className="question-subtext text-secondary">Loading your full report...</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container">
            {currentQuestion && (
                <>
                    <ProgressBar
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                        phase={currentQuestion.phase.toUpperCase()}
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

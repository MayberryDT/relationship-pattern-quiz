import React from 'react';
import type { Question, Answer } from '../types';

interface QuestionCardProps {
    question: Question;
    answers: Answer[];
    selectedAnswerId?: string;
    onSelect: (answer: Answer) => void;
    onContinue: () => void;
    canContinue: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    answers,
    selectedAnswerId,
    onSelect,
    onContinue,
    canContinue,
}) => {
    return (
        <div className="question-card">
            <h1 className="serif question-text" dangerouslySetInnerHTML={{ __html: question.text.replace(/<em>(.*?)<\/em>/g, '<em>$1</em>') }} />

            <p className="question-subtext text-secondary">
                Select the one that feels most familiar, even if illogical.
            </p>

            <div className="options-grid">
                {question.type === 'mc' ? (
                    answers.map((answer) => (
                        <label
                            key={answer.id}
                            className={`option-item ${selectedAnswerId === answer.id ? 'selected' : ''}`}
                            onClick={() => onSelect(answer)}
                        >
                            <div className="option-radio" />
                            <span className="option-text">{answer.text}</span>
                            <input
                                type="radio"
                                name={`q-${question.id}`}
                                checked={selectedAnswerId === answer.id}
                                onChange={() => { }} // Controlled by label click
                                style={{ display: 'none' }}
                            />
                        </label>
                    ))
                ) : (
                    <textarea
                        className="reflection-input"
                        placeholder="Type your reflection here..."
                        onChange={(e) => onSelect({ id: 'text', text: e.target.value } as any)}
                    />
                )}
            </div>

            <div className="nav-actions">
                <button
                    className="btn-next"
                    onClick={onContinue}
                    disabled={!canContinue}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default QuestionCard;

import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    phase: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, phase }) => {
    const percentage = Math.min(100, Math.round((current / total) * 100));

    return (
        <div className="progress-header">
            <div className="mono text-secondary">
                Diagnostic Phase {phase}
            </div>
            <div className="mono text-secondary">
                {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
            <div
                className="progress-line"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;

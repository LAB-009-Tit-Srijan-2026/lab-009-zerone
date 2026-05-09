import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import type { QuizQuestion } from '../data/courses';

interface LessonQuizProps {
  questions: QuizQuestion[];
  lessonTitle: string;
}

export function LessonQuiz({ questions, lessonTitle }: LessonQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--color-text-muted)]">
        <p>No quiz available for this lesson yet.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === currentQuestion.correctAnswer;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleSelectAnswer = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion.id]: optionIndex,
      });
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const correctCount = Object.entries(selectedAnswers).filter(
    ([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && answer === question.correctAnswer;
    }
  ).length;

  if (quizCompleted) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] mb-6">
            <span className="text-4xl font-bold text-white">{percentage}%</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            You got <span className="font-semibold text-[var(--color-primary)]">{correctCount} out of {questions.length}</span> questions correct.
          </p>

          {percentage === 100 && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <p className="text-green-400 font-semibold">Perfect score! 🎉 Great job mastering this lesson!</p>
            </div>
          )}
          {percentage >= 80 && percentage < 100 && (
            <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-400 font-semibold">Excellent work! You have a solid understanding of the material.</p>
            </div>
          )}
          {percentage < 80 && (
            <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-yellow-400 font-semibold">Good attempt! Review the explanations and try again to improve.</p>
            </div>
          )}

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:shadow-lg hover:shadow-[var(--color-primary)]/50 transition-all duration-200"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            {answeredCount}/{questions.length} answered
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--color-bg-surface)] overflow-hidden border border-[var(--color-border)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-cyan)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = userAnswer === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const showResult = isAnswered && (isSelected || isCorrectOption);

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl text-left font-semibold transition-all duration-200 border-2 flex items-start gap-3 ${
                  isAnswered
                    ? showResult
                      ? isCorrectOption
                        ? 'bg-green-500/10 border-green-500/50 text-green-400'
                        : isSelected && !isCorrect
                        ? 'bg-red-500/10 border-red-500/50 text-red-400'
                        : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] opacity-50'
                      : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)]'
                    : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-bg-surface)]/80'
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">
                  {isAnswered && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  {!isAnswered && (
                    <div className="w-5 h-5 rounded-full border-2 border-[var(--color-text-secondary)]" />
                  )}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-xl border-l-4 ${
            isCorrect
              ? 'bg-green-500/10 border-l-green-500 text-green-100'
              : 'bg-blue-500/10 border-l-blue-500 text-blue-100'
          }`}>
            <div className="flex gap-2 items-start">
              <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">
                  {isCorrect ? '✓ Correct!' : 'Explanation'}
                </p>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text)] font-semibold border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <div className="flex-1" />
        <button
          onClick={handleNextQuestion}
          disabled={!isAnswered}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            isAnswered
              ? 'bg-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/50'
              : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] opacity-50 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

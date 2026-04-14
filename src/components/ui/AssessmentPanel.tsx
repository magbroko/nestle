import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion } from '../../types'
import { Button } from './Button'
import { CheckCircle2, XCircle } from 'lucide-react'

type Props = {
  questions: QuizQuestion[]
}

export function AssessmentPanel({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    let correct = 0
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) correct += 1
    }
    return { correct, total: questions.length }
  }, [answers, questions])

  const allAnswered =
    questions.length > 0 &&
    questions.every((q) => typeof answers[q.id] === 'number')

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-2 border-b border-slate-200/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-nestle-600">
            Assessment
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
            Knowledge check
          </h3>
        </div>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-900"
            role="status"
            aria-live="polite"
          >
            Score: {score.correct}/{score.total}
          </motion.div>
        )}
      </div>

      <div className="mt-5 space-y-6">
        {questions.map((q, qi) => {
          const selected = answers[q.id]
          const isCorrect = submitted && selected === q.correctIndex

          return (
            <fieldset
              key={q.id}
              className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4"
            >
              <legend className="sr-only">
                Question {qi + 1}: {q.question}
              </legend>
              <p className="text-sm font-medium text-slate-900">
                <span className="text-slate-400">{qi + 1}. </span>
                {q.question}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, idx) => {
                  const picked = selected === idx
                  const showCorrect = submitted && idx === q.correctIndex
                  const showWrong = submitted && picked && idx !== q.correctIndex
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={submitted}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: idx }))
                      }
                      className={`flex min-h-[44px] touch-manipulation items-start gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                        showCorrect
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                          : showWrong
                            ? 'border-rose-300 bg-rose-50 text-rose-950'
                            : picked && !submitted
                              ? 'border-nestle-300 bg-nestle-50 text-nestle-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-bold text-slate-600">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
              <AnimatePresence>
                {submitted && typeof selected === 'number' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div
                      className={`flex gap-2 rounded-lg p-3 text-sm ${
                        isCorrect
                          ? 'border border-emerald-200 bg-emerald-50 text-emerald-950'
                          : 'border border-rose-200 bg-rose-50 text-rose-950'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                          aria-hidden
                        />
                      ) : (
                        <XCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                          aria-hidden
                        />
                      )}
                      <span>
                        {isCorrect
                          ? 'Correct — validated understanding.'
                          : q.feedbackWrong}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </fieldset>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {!submitted ? (
          <Button
            disabled={!allAnswered}
            onClick={() => setSubmitted(true)}
            className="min-h-11"
          >
            Submit answers
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              setSubmitted(false)
              setAnswers({})
            }}
            className="min-h-11"
          >
            Retry quiz
          </Button>
        )}
        {!allAnswered && !submitted && (
          <p className="self-center text-xs text-slate-500">
            Answer every question to submit.
          </p>
        )}
      </div>
    </div>
  )
}

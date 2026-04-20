import { useEffect, useMemo, useState } from 'react'
import styles from './Hangman.module.css'

const WORDS = [
  'LOGISTICS', 'CLIMB', 'DOCKER', 'JAVASCRIPT',
  'TAILWIND', 'BULMA', 'CLIMBER', 'ATLAS',
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function chooseWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default function Hangman() {
  const [target, setTarget] = useState('')
  const [hits, setHits] = useState<Set<string>>(new Set())
  const [misses, setMisses] = useState<Set<string>>(new Set())

  useEffect(() => {
    setTarget(chooseWord())
  }, [])

  const isWin = useMemo(() => {
    if (!target) return false
    return [...target].every((ch) => hits.has(ch))
  }, [target, hits])

  const isLose = misses.size >= 6
  const isOver = isWin || isLose

  const revealed = target
    ? [...target].map((ch) => (hits.has(ch) ? ch : '_')).join(' ')
    : ''

  const handleGuess = (ch: string) => {
    if (isOver || hits.has(ch) || misses.has(ch)) return
    if (target.includes(ch)) {
      setHits((prev) => new Set(prev).add(ch))
    } else {
      setMisses((prev) => new Set(prev).add(ch))
    }
  }

  const reset = () => {
    setTarget(chooseWord())
    setHits(new Set())
    setMisses(new Set())
  }

  return (
    <section id="hangman" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Prototype</p>
          <h2 className={styles.heading}>Hangman Mini-Game</h2>
          <p className={styles.subtext}>
            A browser-based mini-game I built as a focused UI experiment. Standalone link soon.
          </p>
          <div className={styles.notes}>
            <span>UI: React</span>
            <span>Logic: TypeScript</span>
            <span>Status: Link soon</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.word}>{revealed}</div>

          <div className={styles.statusRow}>
            <span className={styles.status}>
              {isWin
                ? 'You win!'
                : isLose
                  ? 'You lose.'
                  : `Misses: ${misses.size}/6`}
            </span>
            <button className={styles.reset} onClick={reset} type="button">
              New Word
            </button>
          </div>

          {isLose && (
            <p className={styles.answer}>Answer: {target}</p>
          )}

          <div className={styles.letters}>
            {ALPHABET.map((ch) => (
              <button
                key={ch}
                className={styles.letter}
                onClick={() => handleGuess(ch)}
                disabled={isOver || hits.has(ch) || misses.has(ch)}
                type="button"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styles from './HeroText.module.css'

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -45 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

export function HeroText() {
  return (
    <div className={styles.text}>
      <div className={styles.eyebrow}>AVERAYNE</div>
      <motion.h1 className={styles.heading} variants={containerVariants} initial="hidden" animate="show">
        {'FULL-STACK'.split(' ').map((w) => (
          <motion.span key={w} className={styles.word} variants={wordVariants}>
            {w}
          </motion.span>
        ))}
        <br />
        {'ENGINEER'.split(' ').map((w) => (
          <motion.span key={w} className={`${styles.word} ${styles.wordAccent}`} variants={wordVariants}>
            {w}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className={styles.sub}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
      >
        I design and build product-grade web experiences with a focus on
        clarity, performance, and reliable delivery.
      </motion.p>
      <motion.div
        className={styles.ctaRow}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1.3 }}
      >
        <button className={`${styles.cta} ${styles.ctaPrimary}`} onClick={() => window.location.hash = '#projects'}>
          Explore Work
        </button>
        <button className={`${styles.cta} ${styles.ctaGhost}`} onClick={() => window.location.hash = '#hangman'}>
          Hangman Demo
        </button>
      </motion.div>
    </div>
  )
}

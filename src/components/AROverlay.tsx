import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import styles from './AROverlay.module.css'

function ScanLine() {
  return <div className={styles.scanLine} />
}

function CornerBracket({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const classes = {
    tl: styles.cornerTl,
    tr: styles.cornerTr,
    bl: styles.cornerBl,
    br: styles.cornerBr,
  }
  return <div className={`${styles.corner} ${classes[position]}`} />
}

function PulsingDot({ style }: { style: CSSProperties }) {
  return <div className={styles.pulseDot} style={style} />
}

export function AROverlay() {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
    >
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      <ScanLine />

      <div className={styles.crosshair}>
        <div className={styles.crosshairInner} />
        <div className={styles.crosshairRing} />
      </div>

      <PulsingDot style={{ top: '30%', left: '22%' }} />
      <PulsingDot style={{ top: '65%', right: '25%' }} />
      <PulsingDot style={{ top: '20%', right: '30%' }} />
    </motion.div>
  )
}

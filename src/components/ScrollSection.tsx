import { motion } from 'framer-motion'
import styles from './ScrollSection.module.css'

const features = [
  {
    title: 'Product Systems',
    description: 'Building systems that simplify workflows and make complex tools feel effortless.',
    accent: '#e11d48',
  },
  {
    title: 'Logistics Mapping',
    description: 'Clarity in movement, routing, and decision-making where efficiency matters.',
    accent: '#fb7185',
  },
  {
    title: 'Creative Engineering',
    description: 'Interactive builds that keep UX polished without losing practicality.',
    accent: '#f43f5e',
  },
  {
    title: 'Operational Clarity',
    description: 'Applying code to real problems with measurable, human-friendly outcomes.',
    accent: '#f5f2ea',
  },
]

function FeatureCard({ title, description, accent, index }: { title: string; description: string; accent: string; index: number }) {
  return (
    <motion.div
      className={styles.card}
      style={{ ['--accent' as string]: accent }}
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.cardAccent} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
    </motion.div>
  )
}

export function ScrollSection() {
  return (
    <section className={styles.section} id="interests">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>FOCUS</div>
          <h2 className={styles.title}>What I build toward</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

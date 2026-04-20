import styles from './ProjectsSection.module.css'

const projects = [
  {
    title: 'Hangman Mini-Game',
    description: 'A browser-based mini-game I built as a fast, focused UI experiment. Standalone link soon.',
    tags: ['React', 'TypeScript', 'Prototype'],
    href: '#hangman',
  },
  {
    title: 'Logistics Mapping',
    description: 'Route-focused systems for clarity in operations and delivery flow. Case study in progress.',
    tags: ['Mapping', 'Systems', 'UX'],
    href: '#',
  },
  {
    title: 'Creative Engineering',
    description: 'Interactive builds that balance visual polish with clear utility. More soon.',
    tags: ['Frontend', 'Motion', 'Design'],
    href: '#',
  },
]

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Projects</div>
          <h2 className={styles.title}>Selected work</h2>
          <p className={styles.subtext}>
            A focused mix of product builds and experiments.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <a key={project.title} className={styles.card} href={project.href}>
              <div className={styles.cardAccent} />
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

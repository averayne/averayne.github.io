import styles from './XRNav.module.css'

export function XRNav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Ave<span>rayne</span></div>
      <div className={styles.links}>
        <a className={styles.link} href="#scene">Index</a>
        <a className={styles.link} href="#projects">Work</a>
        <a className={styles.link} href="#interests">Focus</a>
        <a className={styles.link} href="#hangman">Hangman</a>
        <a className={styles.link} href="#model">Lab</a>
      </div>
      <div className={styles.socials}>
        <a
          className={styles.iconLink}
          href="https://github.com/averayne"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.48-1.11-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.58 2.34 1.12 2.91.85.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.2 9.2 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.33.68.98.68 1.97 0 1.42-.01 2.56-.01 2.9 0 .27.18.6.69.49 3.97-1.36 6.84-5.2 6.84-9.74C22 6.58 17.52 2 12 2Z"
            />
          </svg>
        </a>
        <a
          className={styles.iconLink}
          href="https://www.linkedin.com/in/avery-stafford-2a7bab384"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3ZM8.2 19H5.6V9.2h2.6V19ZM6.9 8.1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM19 19h-2.6v-4.7c0-1.1 0-2.5-1.5-2.5-1.5 0-1.8 1.2-1.8 2.4V19H10.5V9.2h2.5v1.3h.1c.3-.6 1.1-1.4 2.3-1.4 2.5 0 3 1.7 3 3.9V19Z"
            />
          </svg>
        </a>
      </div>
    </nav>
  )
}

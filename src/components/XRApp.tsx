import { useEffect, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { AROverlay } from './AROverlay'
import { HeroText } from './HeroText'
import { Scene3D } from './Scene3D'
import { ScrollSection } from './ScrollSection'
import { XRNav } from './XRNav'
import ProjectsSection from './ProjectsSection'
import Hangman from './Hangman'
import styles from './XRApp.module.css'

export default function XRApp() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)
  const [lowPower, setLowPower] = useState(false)
  const scenePalette = {
    primary: '#e11d48',
    secondary: '#fb7185',
    accent: '#f5c2c7',
    highlight: '#f5f2ea',
    glow: '#f43f5e',
  }
  const sceneLayout = {
    orbs: [
      {
        position: [-1.9, 0.8, 0.4] as [number, number, number],
        scale: 0.95,
        speed: 0.8,
        distort: 0.42,
        color: '#e11d48',
      },
      {
        position: [1.8, -0.4, 0.6] as [number, number, number],
        scale: 0.82,
        speed: 0.7,
        distort: 0.4,
        color: '#fb7185',
      },
      {
        position: [0.2, 1.9, 0.2] as [number, number, number],
        scale: 0.7,
        speed: 0.85,
        distort: 0.46,
        color: '#f5f2ea',
      },
    ],
    particles: {
      count: 140,
      spread: 14,
    },
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 768px)')
    const update = () => setLowPower(media.matches)
    update()

    const legacyMedia = media as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void
    }

    if ('addEventListener' in media) {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }

    if (legacyMedia.addListener) {
      legacyMedia.addListener(update)
      return () => legacyMedia.removeListener?.(update)
    }
  }, [])

  const activeLayout = lowPower
    ? {
        ...sceneLayout,
        orbs: sceneLayout.orbs.slice(0, 2),
        particles: { count: 60, spread: 12 },
      }
    : sceneLayout

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest)
  })

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <XRNav />

        <section className={styles.heroSection} id="scene">
          <div className={styles.heroCanvasWrap}>
            <Scene3D
              scrollProgress={progress}
              palette={scenePalette}
              layout={activeLayout}
              lowPower={lowPower}
            />
          </div>
          <AROverlay />
          <HeroText />
          <div className={styles.scrollHint}>
            <span>SCROLL</span>
            <div className={styles.scrollLine} />
          </div>
        </section>

        <div className={styles.transitionBand}>
          <div className={styles.transitionBandInner}>
            {'BUILD · SHIP · LEARN · ITERATE · DESIGN · DELIVER · '.repeat(4)}
          </div>
        </div>

        <ProjectsSection />

        <ScrollSection />

        <Hangman />

        <section className={styles.modelSection} id="model">
          <div className={styles.modelSectionCanvas}>
            <Scene3D
              scrollProgress={progress}
              interactive={false}
              palette={scenePalette}
              layout={activeLayout}
              lowPower={lowPower}
            />
          </div>
          <div className={styles.modelSectionContent}>
            <div className={styles.modelSectionEyebrow}>SHOWCASE</div>
            <h2 className={styles.modelSectionTitle}>3D Study</h2>
            <p className={styles.modelSectionBody}>
              A lightweight 3D study to highlight depth and motion without overwhelming
              the interface.
            </p>
            <div className={styles.modelTags}>
              <span className={styles.modelTag}>Three.js</span>
              <span className={styles.modelTag}>React Three Fiber</span>
              <span className={styles.modelTag}>Lighting</span>
              <span className={styles.modelTag}>Motion</span>
            </div>
          </div>
        </section>

        <footer className={styles.siteFooter}>
          <div className={styles.siteFooterInner}>
            <span className={styles.footerLogo}>Ave<span>rayne</span></span>
            <span className={styles.footerCopy}>Avery Stafford · Full Stack Developer</span>
            <div className={styles.footerLinks}>
              <a className={styles.footerLink} href="https://github.com/averayne" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className={styles.footerLink} href="https://www.linkedin.com/in/avery-stafford-2a7bab384" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

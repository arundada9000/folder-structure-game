import Link from 'next/link';
import {
  Terminal,
  FolderTree,
  Zap,
  Target,
  ArrowRight,
  Gamepad2,
  Upload,
  Layers,
  ChevronRight,
} from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className="bg-grid-wrapper" />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Terminal size={14} />
            <span>Interactive File System Game</span>
          </div>

          <h1 className={styles.heroTitle}>
            Master File Paths
            <br />
            <span className={styles.heroAccent}>Through Play</span>
          </h1>

          <p className={styles.heroDesc}>
            Navigate visual folder trees using path commands. Learn absolute and
            relative paths in a fun, interactive puzzle game.
          </p>

          <div className={styles.heroCta}>
            <Link href="/play" className={styles.btnPrimary} id="cta-play">
              <Gamepad2 size={18} />
              Play Now
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Animated terminal preview */}
          <div className={styles.terminalPreview}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot} data-color="red" />
              <span className={styles.terminalDot} data-color="yellow" />
              <span className={styles.terminalDot} data-color="green" />
              <span className={styles.terminalTitle}>pathpilot</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLine}>
                <span className={styles.terminalPrompt}>~/documents $</span>
                <span className={styles.terminalCmd}> cd ../src/components</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.terminalSuccess}>Navigated to /root/src/components</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.terminalPrompt}>~/src/components $</span>
                <span className={styles.terminalCursor}>|</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className={styles.features} id="features">
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionDesc}>
          A visual approach to learning one of the most essential developer skills
        </p>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ color: 'var(--color-primary)' }}>
              <FolderTree size={28} />
            </div>
            <h3>Visual Tree</h3>
            <p>See the file system as an interactive tree. Each folder is a node you can navigate to.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ color: 'var(--color-secondary)' }}>
              <Terminal size={28} />
            </div>
            <h3>Path Commands</h3>
            <p>Type real path commands like <code>../folder</code> or <code>/root/src</code> to move your character.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ color: 'var(--color-accent)' }}>
              <Target size={28} />
            </div>
            <h3>Reach the Target</h3>
            <p>Each level has a target folder. Find the right path to navigate there and win.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ color: 'var(--color-success)' }}>
              <Zap size={28} />
            </div>
            <h3>Instant Feedback</h3>
            <p>See your character move in real-time. Invalid paths trigger clear error messages.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ color: 'var(--color-warning)' }}>
              <Layers size={28} />
            </div>
            <h3>Progressive Levels</h3>
            <p>Five handcrafted levels from basics to complex trees with constraints and hidden structures.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ color: 'var(--color-info)' }}>
              <Upload size={28} />
            </div>
            <h3>Custom Trees</h3>
            <p>Upload your own folder structure as JSON or generate random trees for endless challenges.</p>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Navigate?</h2>
        <p className={styles.ctaDesc}>
          Start with the basics and work your way to complex file trees.
        </p>
        <Link href="/play" className={styles.btnPrimary} id="cta-play-bottom">
          <Gamepad2 size={18} />
          Start Playing
          <ChevronRight size={16} />
        </Link>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className={styles.footer}>
        <p>
          PathPilot - Built for learning file system navigation
        </p>
      </footer>
    </main>
  );
}

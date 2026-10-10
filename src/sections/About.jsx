import styles from '../components/about.module.css';

export default function About() {
  const quickFacts = [
    { key: "Education", value: "Informatics Student/ STITEK Bontang" },
    { key: "Primary Tech", value: "React, Node.js, JS/TS" },
    { key: "Interests", value: "Web Dev, IoT, Data" },
    { key: "Status", value: "Open for Collaborations" },
  ];

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> About Me
        </h2>

        <div className={styles.grid}>
          {/* Deskripsi Narasi */}
          <div className={styles.textContent}>
            <p>
              Hello! I'm <span className={styles.highlight}>Taro</span>, a Computer Science student with a deep interest in software development and modern web architecture.
            </p>
            <p>
              My journey in programming is driven by curiosity to understand how systems work behind the scenes. I enjoy solving complex problems, building responsive applications, and exploring new technologies such as IoT and data processing.</p>
              <p>
                My learning philosophy is <span className={styles.highlight}>learning by doing</span>—building real-world projects, experimenting, debugging, and consistently improving code quality.
                </p>
          </div>

          {/* Kartu Ringkasan Informasi */}
          <div className={styles.factsCard}>
            <h3 className={styles.factsTitle}>// Quick_Facts</h3>
            <ul className={styles.factList}>
              {quickFacts.map((fact, index) => (
                <li key={index} className={styles.factItem}>
                  <span className={styles.factKey}>{fact.key}:</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
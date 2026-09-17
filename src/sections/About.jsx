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
              Halo! Saya <span className={styles.highlight}>Taro</span>, seorang mahasiswa Informatika yang memiliki ketertarikan mendalam pada pengembangan perangkat lunak dan arsitektur web modern.
            </p>
            <p>
              Perjalanan saya di dunia pemrograman didorong oleh rasa ingin tahu untuk memahami bagaimana sistem bekerja di balik layar. Saya menikmati proses memecahkan masalah kompleks, membangun aplikasi yang responsif, serta mengeksplorasi teknologi baru seperti IoT dan pengolahan data.
            </p>
            <p>
              Prinsip belajar saya adalah <span className={styles.highlight}>learning by doing</span>—membangun proyek nyata, melakukan eksperimen, memperbaiki kendala (debugging), dan terus meningkatkan kualitas kode secara konsisten.
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
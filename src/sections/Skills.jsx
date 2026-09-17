import { 
  FaHtml5, FaCss3Alt, FaSquareJs, FaPython, 
  FaGithub, FaFigma, FaNodeJs, FaDatabase, FaCode, FaChartLine, FaMicrochip 
} from 'react-icons/fa6';
import { SiFirebase, SiFlutter } from 'react-icons/si';
import { IoLogoVercel } from 'react-icons/io5'; // Menggunakan IoLogoVercel dari io5
import { skillsData } from '../data/skillsData';
import styles from '../components/skills.module.css';

// Helper fungsi untuk merender ikon berdasarkan nama
const getIcon = (type) => {
  switch (type) {
    case 'html': return <FaHtml5 className={styles.badgeIcon} />;
    case 'css': return <FaCss3Alt className={styles.badgeIcon} />;
    case 'js': return <FaSquareJs className={styles.badgeIcon} />;
    case 'python': return <FaPython className={styles.badgeIcon} />;
    case 'github': return <FaGithub className={styles.badgeIcon} />;
    case 'figma': return <FaFigma className={styles.badgeIcon} />;
    case 'vercel': return <IoLogoVercel className={styles.badgeIcon} />; // Pastikan di sini memanggil IoLogoVercel, BUKAN FaVercel
    case 'firebase': return <SiFirebase className={styles.badgeIcon} />;
    case 'iot': return <FaMicrochip className={styles.badgeIcon} />;
    case 'data': return <FaChartLine className={styles.badgeIcon} />;
    case 'node': return <FaNodeJs className={styles.badgeIcon} />;
    case 'flutter': return <SiFlutter className={styles.badgeIcon} />;
    case 'db': return <FaDatabase className={styles.badgeIcon} />;
    default: return <FaCode className={styles.badgeIcon} />;
  }
};

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <p className={styles.categorySub}>SKILLS</p>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleHash}>#</span> What I actually use
        </h2>
        <p className={styles.subtitle}>
          Split by how far along each one is — technologies I ship projects with, tools I use to build and deploy, and areas I'm still learning.
        </p>

        <div className={styles.skillsGrid}>
          {/* Core Technologies */}
          <div>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Core Technologies</h3>
              <p className={styles.columnSub}>Used in shipped projects</p>
            </div>
            <div className={styles.badgeContainer}>
              {skillsData.core.map((item, index) => (
                <div key={index} className={styles.skillBadge}>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Development Tools */}
          <div>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Development Tools</h3>
              <p className={styles.columnSub}>Actively used to build &amp; ship</p>
            </div>
            <div className={styles.badgeContainer}>
              {skillsData.tools.map((item, index) => (
                <div key={index} className={styles.skillBadge}>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Exploring */}
          <div>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Currently Exploring</h3>
              <p className={styles.columnSub}>Learning, not yet shipped</p>
            </div>
            <div className={styles.badgeContainer}>
              {skillsData.exploring.map((item, index) => (
                <div key={index} className={styles.skillBadge}>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
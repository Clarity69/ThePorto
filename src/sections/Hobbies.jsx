import {
    FaLinux, FaServer, FaGamepad, FaMusic, FaCamera,
    FaBookOpen, FaPersonRunning, FaMugHot, FaHeart, FaFish, FaUtensils,
} from 'react-icons/fa6';
import { hobbiesData } from '../data/hobbiesData';
import styles from '../components/hobbies.module.css';

// Pemetaan nama ikon di data → komponen ikon
const getIcon = (type) => {
    switch (type) {
        case 'linux': return <FaLinux />;
        case 'server': return <FaServer />;
        case 'game': return <FaGamepad />;
        case 'music': return <FaMusic />;
        case 'camera': return <FaCamera />;
        case 'book': return <FaBookOpen />;
        case 'sport': return <FaPersonRunning />;
        case 'coffee': return <FaMugHot />;
        case 'fishing': return <FaFish />;
        case 'cooking': return <FaUtensils />;
        default: return <FaHeart />;
    }
};

export default function Hobbies() {
    return (
        <section className={styles.hobbies} id="hobbies">
            <div className={styles.container}>
                <p className={styles.categorySub}>HOBBIES</p>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleHash}>#</span> Outside the code
                </h2>
                <p className={styles.subtitle}>
                    What I do when I&apos;m not working on assignments — most of it still ends up teaching me something.
                </p>

                <ul className={styles.grid}>
                    {hobbiesData.map((hobby) => (
                        <li key={hobby.name} className={styles.card}>
                            <span className={styles.path}>{hobby.path}</span>

                            <div className={styles.head}>
                                <span className={styles.icon}>{getIcon(hobby.icon)}</span>
                                <h3 className={styles.name}>{hobby.name}</h3>
                            </div>

                            <p className={styles.description}>{hobby.description}</p>

                            {hobby.tags?.length > 0 && (
                                <ul className={styles.tags}>
                                    {hobby.tags.map((tag) => (
                                        <li key={tag} className={styles.tag}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
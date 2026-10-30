import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Connect from './sections/Connect';
import Footer from './sections/Footer';
// import Hobbies from './sections/Hobbies';
import Certifications from './sections/Certifications';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  // Animasi muncul saat scroll — Hero dikecualikan supaya langsung terlihat
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('main section:not(:first-of-type)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // cukup sekali per section
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Warna latar & teks diatur CSS variables di index.css (ikut tema)
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Hobbies /> */}
        <Certifications />
        <Connect />
        <Footer />
      </main>
      <Analytics />
    </div>
  );
}
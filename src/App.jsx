import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Connect from "./sections/Connect";

export default function App() {
  return (
    <div style={{ backgroundColor: '#0d0e12', minHeight: '100vh', color: '#ffffff' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Connect />
      </main>
    </div>
  );
}
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Marquee from './components/Marquee';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Marquee />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}

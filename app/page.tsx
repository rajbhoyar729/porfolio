import { Hero, DynamicBarbaWrapper, DynamicChatBot, DynamicClientWrapper } from './components/DynamicContent';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <DynamicBarbaWrapper>
        <Projects />
        <Contact />
        <DynamicClientWrapper>
          <DynamicChatBot />
        </DynamicClientWrapper>
      </DynamicBarbaWrapper>
    </main>
  );
}
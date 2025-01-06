'use client';

import dynamic from 'next/dynamic';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import BarbaWrapper from './components/BarbaWrapper';
import ClientWrapper from './components/ClientWrapper';

// Dynamically import Hero with SSR disabled
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <BarbaWrapper>
        <Projects />
      </BarbaWrapper>
      <Contact />
      {/* Wrap ChatBot with ClientWrapper */}
      <ClientWrapper>
        <ChatBot />
      </ClientWrapper>
    </main>
  );
}
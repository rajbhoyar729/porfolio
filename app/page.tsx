'use client';

import dynamic from 'next/dynamic';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import ClientWrapper from './components/ClientWrapper';

// Dynamically import components that use browser APIs
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
const DynamicBarbaWrapper = dynamic(() => import('./components/BarbaWrapper'), { ssr: false });

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
        <ClientWrapper>
          <ChatBot />
        </ClientWrapper>
      </DynamicBarbaWrapper>
    </main>
  );
}
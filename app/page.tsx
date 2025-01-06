import dynamic from 'next/dynamic';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

const LoadingFallback = () => <div className="animate-pulse">Loading...</div>;

const Hero = dynamic(() => import('./components/Hero'), { 
  ssr: false,
  loading: LoadingFallback
});

const DynamicBarbaWrapper = dynamic(() => import('./components/BarbaWrapper'), { 
  ssr: false,
  loading: LoadingFallback
});

const DynamicChatBot = dynamic(() => import('./components/ChatBot'), { 
  ssr: false,
  loading: LoadingFallback
});

const DynamicClientWrapper = dynamic(() => import('./components/ClientWrapper'), { 
  ssr: false,
  loading: LoadingFallback
});

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
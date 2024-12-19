import dynamic from 'next/dynamic'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

const Hero = dynamic(() => import('./components/Hero'), { ssr: false })

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}


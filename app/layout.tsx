import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Background3D from './components/Background3D'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Raj Bhoyar - Portfolio',
  description: 'B.Tech in Computer Science with a passion for building scalable software systems and applying advanced AI/ML technologies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} text-white relative`}>
        <Background3D />
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}


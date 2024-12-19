import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

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
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}


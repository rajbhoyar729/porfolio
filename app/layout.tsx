'use client'; // Required for GSAP and useEffect

import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Background3D from '../components/Background3D';
import BarbaWrapper from '../components/BarbaWrapper';
import ChatButton from '../components/ChatBot';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // GSAP smooth scrolling logic
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: target.hash,
          ease: 'power2.inOut',
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) =>
        handleAnchorClick(e as unknown as MouseEvent)
      );
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', (e) =>
          handleAnchorClick(e as unknown as MouseEvent)
        );
      });
    };
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} text-white relative`}>
        <Background3D />
        <div className="relative z-10">
          <Header />
          <BarbaWrapper>
            <main data-barba="container" data-barba-namespace="home">
              {children}
            </main>
          </BarbaWrapper>
          <Footer />
        </div>
        <ChatButton />
      </body>
    </html>
  );
}
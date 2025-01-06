'use client';

import { useState, useEffect } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [showChatBot, setShowChatBot] = useState(true);

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          const skillsSectionBottom = skillsSection.offsetTop + skillsSection.offsetHeight;
          setShowChatBot(window.scrollY < skillsSectionBottom);
        }
      };

      // Add the scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render children only if showChatBot is true
  return showChatBot ? <>{children}</> : null;
}
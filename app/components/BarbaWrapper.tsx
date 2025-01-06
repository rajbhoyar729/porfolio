'use client'

import { useEffect, useRef } from 'react'
import barba from '@barba/core'
import type { ITransitionData } from '@barba/core'
import { gsap } from 'gsap'

export default function BarbaWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    barba.init({
      root: wrapperRef.current,
      transitions: [{
        name: 'opacity-transition',
        leave(data: ITransitionData) {
          return new Promise((resolve) => {
            gsap.to(data.current.container, {
              opacity: 0,
              onComplete: resolve
            });
          });
        },
        enter(data: ITransitionData) {
          return new Promise((resolve) => {
            gsap.from(data.next.container, {
              opacity: 0,
              onComplete: resolve
            });
          });
        }
      }]
    });

    return () => {
      barba.destroy();
    }
  }, []);

  return (
    <div ref={wrapperRef} data-barba="wrapper">
      {children}
    </div>
  )
}


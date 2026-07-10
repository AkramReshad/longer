'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ReactNode } from 'react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type MotionOrchestratorProps = {
  readonly children: ReactNode;
};

export function MotionOrchestrator({ children }: MotionOrchestratorProps) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from('.reveal', {
        y: 46,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.page-root',
          start: 'top 70%'
        }
      });

      gsap.utils.toArray<HTMLElement>('.media-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { scale: 0.86, autoAlpha: 0.55 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              end: 'bottom 18%',
              scrub: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.stack-card').forEach((element, index) => {
        gsap.to(element, {
          y: index * -28,
          scale: 1 - index * 0.018,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 76%',
            end: 'bottom 22%',
            scrub: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.word-reveal span').forEach((word) => {
        gsap.fromTo(
          word,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: word,
              start: 'top 92%',
              end: 'top 42%',
              scrub: true
            }
          }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}

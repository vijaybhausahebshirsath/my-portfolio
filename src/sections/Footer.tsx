import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, ArrowUpRight, Heart } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Github,
};

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!footerConfig.copyright) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Marquee fade in
        tl.fromTo(
          marqueeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );

        // Links
        tl.fromTo(
          linksRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

        // Copyright
        tl.fromTo(
          copyrightRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const marqueeText = footerConfig.marqueeText;
  const highlightChars = footerConfig.marqueeHighlightChars;

  return (
    <footer
      ref={sectionRef}
      className="relative pt-16 sm:pt-20 pb-8 sm:pb-12 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden"
    >
      {/* Marquee section */}
      <div
        ref={marqueeRef}
        className="relative mb-12 sm:mb-16 overflow-hidden"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Marquee content */}
        <div className="marquee-container">
          <div className="marquee-content flex items-center gap-6 sm:gap-8 text-4xl sm:text-6xl lg:text-7xl font-semibold whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-6 sm:gap-8">
                {marqueeText.split('').map((char, j) => (
                  <span
                    key={j}
                    className={
                      highlightChars.includes(char)
                        ? 'text-highlight'
                        : 'text-white/80'
                    }
                  >
                    {char}
                  </span>
                ))}
                <span className="text-white/20 mx-2 sm:mx-4">&bull;</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top border */}
      <div className="h-px bg-white/10 mb-10 sm:mb-16" />

      {/* Footer content */}
      <div ref={linksRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Column 1 - Nav links */}
          <div className="space-y-3">
            <h4 className="text-sm text-white/30 mb-4">Navigation</h4>
            {footerConfig.navLinks1.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 2 - Social links */}
          <div className="space-y-3">
            <h4 className="text-sm text-white/30 mb-4">Connect</h4>
            {footerConfig.navLinks2.map((link) => {
              const IconComponent = link.icon ? iconMap[link.icon] : null;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Column 3-4 - CTA */}
          <div className="col-span-2 lg:text-right flex flex-col justify-start">
            <h4 className="text-sm text-white/30 mb-4 lg:hidden">Get in Touch</h4>
            <a
              href={footerConfig.ctaHref}
              className="inline-flex items-center gap-2 text-xl sm:text-2xl text-white font-medium group hover:text-highlight transition-colors duration-300"
            >
              {footerConfig.ctaText}
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-highlight group-hover:bg-highlight/10 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          ref={copyrightRef}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <p className="text-xs sm:text-sm text-white/40 text-center sm:text-left">
            {footerConfig.copyright}
          </p>
          <p className="text-xs sm:text-sm text-white/30 flex items-center gap-1">
            {footerConfig.tagline} <Heart className="w-3 h-3 text-highlight" />
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Linkedin, Github, Mail } from 'lucide-react';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [, setLoaded] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!heroConfig.title) return null;

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Title animation
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Summary
    tl.fromTo(
      summaryRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Buttons
    tl.fromTo(
      buttonsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    );

    // Socials
    tl.fromTo(
      socialsRef.current?.children || [],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    );

    setLoaded(true);

    // Scroll effects
    const trigger1 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '50% top',
      scrub: 1,
      onUpdate: (self) => {
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            y: `${self.progress * 30}%`,
            opacity: 1 - self.progress * 0.8,
          });
        }
      },
    });
    triggersRef.current.push(trigger1);

    return () => {
      tl.kill();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin': return <Linkedin className="w-5 h-5" />;
      case 'Github': return <Github className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(234, 0, 0, 0.15) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)',
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center"
      >
        {/* Name */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-4"
          style={{ willChange: 'transform, opacity' }}
        >
          {heroConfig.title}
        </h1>

        {/* Role */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-light tracking-wide mb-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* Divider line */}
        <div className="w-16 h-px bg-highlight mx-auto mb-6" />

        {/* Summary */}
        <p
          ref={summaryRef}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ willChange: 'transform, opacity' }}
        >
          {heroConfig.summary}
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-8 py-3 bg-highlight text-white font-medium rounded-full hover:bg-highlight/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </a>
          <a
            href={heroConfig.resumeUrl}
            download
            className="px-8 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['LangChain', 'React', 'Node.js', 'AWS', 'Python', 'GCP'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs sm:text-sm text-white/50 border border-white/10 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div
          ref={socialsRef}
          className="flex items-center justify-center gap-4"
        >
          {heroConfig.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              aria-label={link.name}
            >
              {getSocialIcon(link.icon)}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-xs text-white/30 tracking-widest hidden sm:block">
        {heroConfig.servicesLabel}
      </div>
      <div className="absolute bottom-8 right-8 text-xs text-white/30 hidden sm:block">
        {heroConfig.copyright}
      </div>
    </section>
  );
}

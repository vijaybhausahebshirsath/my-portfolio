import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const authorImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const authorTextRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.titleLine1) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animations
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Image 1 clip reveal
        tl.fromTo(
          image1Ref.current,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0 0 0)',
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
          }
        );

        // Image 2 clip reveal
        tl.fromTo(
          image2Ref.current,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.05 },
          {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            duration: 1.1,
            ease: 'expo.out',
          },
          '-=0.9'
        );

        // Title lines reveal
        if (titleRef.current) {
          const lines = titleRef.current.querySelectorAll('.title-line');
          tl.fromTo(
            lines,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'back.out(1.7)',
            },
            '-=0.8'
          );
        }

        // Text fade up
        tl.fromTo(
          textRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );

        // Red accent line
        tl.fromTo(
          lineRef.current,
          { width: 0 },
          { width: '100%', duration: 1, ease: 'expo.inOut' },
          '-=0.6'
        );

        // Author image
        tl.fromTo(
          authorImageRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.7'
        );

        // Author text
        if (authorTextRef.current) {
          tl.fromTo(
            authorTextRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.5'
          );
        }
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    // Parallax on scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (image1Ref.current) {
          gsap.set(image1Ref.current, {
            y: 30 - self.progress * 60,
          });
        }
        if (image2Ref.current) {
          gsap.set(image2Ref.current, {
            y: -20 + self.progress * 40,
          });
        }
      },
    });
    triggersRef.current.push(parallaxTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden bg-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column - Images */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Image 1 */}
              <div
                ref={image1Ref}
                className="relative w-full sm:w-4/5 aspect-[4/5] overflow-hidden rounded-xl"
                style={{ willChange: 'clip-path, transform' }}
              >
                <img
                  src={aboutConfig.image1}
                  alt={aboutConfig.image1Alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2 - overlapping */}
              <div
                ref={image2Ref}
                className="absolute w-2/3 sm:w-1/2 aspect-[3/4] -bottom-8 -right-4 sm:right-0 overflow-hidden rounded-xl shadow-2xl border-4 border-black"
                style={{ willChange: 'clip-path, transform' }}
              >
                <img
                  src={aboutConfig.image2}
                  alt={aboutConfig.image2Alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Section title */}
            <h2
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium leading-snug mb-6"
            >
              <span className="title-line block">
                {aboutConfig.titleLine1}
              </span>
              <span className="title-line block text-white/70">
                {aboutConfig.titleLine2}
              </span>
            </h2>

            {/* Red accent line */}
            <div
              ref={lineRef}
              className="h-0.5 bg-highlight mb-6 max-w-[200px]"
              style={{ willChange: 'width' }}
            />

            {/* About text */}
            <p
              ref={textRef}
              className="text-base sm:text-lg text-white/60 leading-relaxed mb-8"
            >
              {aboutConfig.description}
            </p>

            {/* Author section */}
            <div className="flex items-center gap-4">
              {/* Author image */}
              <div
                ref={authorImageRef}
                className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-highlight/30"
                style={{ willChange: 'transform, opacity' }}
              >
                <img
                  src={aboutConfig.authorImage}
                  alt={aboutConfig.authorName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author text */}
              <div ref={authorTextRef} className="text-sm text-white/50">
                {aboutConfig.authorBio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

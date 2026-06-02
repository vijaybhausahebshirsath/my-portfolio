import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { experienceConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!experienceConfig.title || experienceConfig.experiences.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title
        tl.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }
        );

        // Subtitle
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );

        // Timeline line
        const line = timelineRef.current?.querySelector('.timeline-line');
        if (line) {
          tl.fromTo(
            line,
            { scaleY: 0 },
            { scaleY: 1, duration: 1, ease: 'expo.out', transformOrigin: 'top' },
            '-=0.3'
          );
        }

        // Experience items
        itemsRef.current.forEach((item, i) => {
          if (item) {
            const isLeft = i % 2 === 0;
            tl.fromTo(
              item,
              { 
                x: isLeft ? -40 : 40, 
                opacity: 0 
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'expo.out',
              },
              `-=${0.5 - i * 0.1}`
            );

            // Dot
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
              tl.fromTo(
                dot,
                { scale: 0 },
                { scale: 1, duration: 0.4, ease: 'back.out(2)' },
                '-=0.5'
              );
            }
          }
        });
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16 text-center">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-4"
        >
          {experienceConfig.title}
        </h2>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto"
        >
          {experienceConfig.subtitle}
        </p>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="max-w-5xl mx-auto relative">
        {/* Center line - desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <div className="timeline-line absolute inset-0 bg-white/10" />
        </div>

        {/* Mobile line */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
          <div className="timeline-line absolute inset-0 bg-white/10" />
        </div>

        {/* Experience Items */}
        <div className="space-y-8 sm:space-y-12">
          {experienceConfig.experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`relative flex flex-col md:flex-row items-start ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="timeline-dot absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-highlight border-4 border-black -translate-x-1/2 z-10 mt-2" />

              {/* Content */}
              <div className={`pl-16 md:pl-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}>
                <div className="bg-dark-gray/50 border border-white/5 rounded-xl p-5 sm:p-6 hover:border-white/10 transition-all duration-300">
                  {/* Header */}
                  <div className={`mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {/* Role & Company */}
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <h3 className="text-xl sm:text-2xl text-white font-semibold">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="px-2 py-0.5 text-xs bg-highlight/20 text-highlight rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className={`flex flex-wrap items-center gap-3 text-sm text-white/50 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1 mt-2 text-sm text-white/40 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-white/60 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {exp.achievements.map((achievement, i) => (
                      <div 
                        key={i} 
                        className={`flex items-start gap-2 text-sm text-white/50 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-white/40 border border-white/10 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

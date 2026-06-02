import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Award, Trophy, Target } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const icons = [Award, Trophy, Target];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!testimonialsConfig.title || testimonialsConfig.testimonials.length === 0) return null;

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

        // Cards stagger
        cardsRef.current.forEach((card, i) => {
          if (card) {
            tl.fromTo(
              card,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'expo.out',
              },
              `-=${0.4 - i * 0.1}`
            );
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
      id="testimonials"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold text-center mb-12 sm:mb-16"
        >
          {testimonialsConfig.title}
        </h2>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsConfig.testimonials.map((testimonial, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={testimonial.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative bg-dark-gray/30 border border-white/5 rounded-xl p-6 sm:p-8 hover:border-white/10 hover:bg-dark-gray/50 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center mb-6 group-hover:bg-highlight/20 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-highlight" />
                </div>

                {/* Quote mark */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />

                {/* Title */}
                <h3 className="text-xl text-white font-medium mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-white/40 mb-4">
                  {testimonial.title}
                </p>

                {/* Quote */}
                <p className="text-white/60 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Image */}
                <div className="mt-6 aspect-video rounded-lg overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

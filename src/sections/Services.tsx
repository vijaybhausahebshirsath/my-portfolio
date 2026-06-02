import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [, setHoveredIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!servicesConfig.title || servicesConfig.services.length === 0)
    return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        const tl = gsap.timeline();

        // Title
        tl.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
        );

        // Subtitle
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4",
        );

        // Service items
        itemsRef.current.forEach((item, i) => {
          if (item) {
            tl.fromTo(
              item,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "expo.out",
              },
              `-=${0.4 - i * 0.08}`,
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
      id="skills"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-4"
        >
          {servicesConfig.title}
        </h2>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-white/50 max-w-2xl"
        >
          {servicesConfig.subtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {servicesConfig.services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full overflow-hidden rounded-xl bg-dark-gray/50 border border-white/5 hover:border-white/15 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Number */}
                  <div className="absolute top-4 left-4 text-5xl font-bold text-white/10 group-hover:text-highlight/20 transition-colors duration-300">
                    {service.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl text-white font-medium mb-3 group-hover:text-highlight transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

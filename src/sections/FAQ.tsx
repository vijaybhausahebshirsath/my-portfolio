import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { faqConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!faqConfig.title || faqConfig.faqs.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

        // FAQ items stagger
        itemsRef.current.forEach((item, i) => {
          if (item) {
            tl.fromTo(
              item,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              `-=${0.4 - i * 0.08}`
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold text-center mb-12 sm:mb-16"
        >
          {faqConfig.title}
        </h2>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqConfig.faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="bg-dark-gray/30 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors duration-300"
            >
              {/* Question */}
              <button
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-base sm:text-lg text-white pr-4 font-medium">
                  {faq.question}
                </h3>

                {/* Toggle icon */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-highlight border-highlight rotate-0'
                      : 'hover:border-white/40'
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  openIndex === index
                    ? 'max-h-[500px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

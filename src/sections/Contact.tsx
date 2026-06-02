import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin } from "lucide-react";
import { contactConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const inputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!contactConfig.title) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

        // Image
        tl.fromTo(
          imageRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.4",
        );

        // Input fields stagger
        inputsRef.current.forEach((input, i) => {
          if (input) {
            tl.fromTo(
              input,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
              `-=${0.4 - i * 0.08}`,
            );
          }
        });

        // Submit button
        tl.fromTo(
          buttonRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending message...");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/yatharth.mishra2002@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            projectType: formData.projectType,
            message: formData.message,
            _subject: `New contact request from ${formData.name}`,
            _template: "box",
          }),
        },
      );

      if (response.ok) {
        toast.success(
          "Message sent successfully! I will get back to you soon.",
          { id: toastId },
        );
        setFormData({ name: "", email: "", projectType: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again later.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again later.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form side */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative z-10 order-2 lg:order-1"
          >
            {/* Title */}
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-4"
            >
              {contactConfig.title}
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-white/50 mb-8 sm:mb-10"
            >
              {contactConfig.subtitle}
            </p>

            {/* Contact info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="mailto:yatharth.mishra2002@gmail.com"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-highlight transition-colors"
              >
                <Mail className="w-4 h-4" />
                yatharth.mishra2002@gmail.com
              </a>
              <span className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4" />
                India
              </span>
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              {/* Name */}
              <div
                ref={(el) => {
                  inputsRef.current[0] = el;
                }}
                className="relative"
              >
                <label className="block text-sm text-white/50 mb-2">
                  {contactConfig.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-dark-gray/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors duration-300"
                  required
                />
              </div>

              {/* Email */}
              <div
                ref={(el) => {
                  inputsRef.current[1] = el;
                }}
                className="relative"
              >
                <label className="block text-sm text-white/50 mb-2">
                  {contactConfig.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-dark-gray/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors duration-300"
                  required
                />
              </div>

              {/* Project Type */}
              <div
                ref={(el) => {
                  inputsRef.current[2] = el;
                }}
                className="relative"
              >
                <label className="block text-sm text-white/50 mb-2">
                  {contactConfig.projectTypeLabel}
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("projectType")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-dark-gray/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">
                    {contactConfig.projectTypePlaceholder}
                  </option>
                  {contactConfig.projectTypeOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-black"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div
                ref={(el) => {
                  inputsRef.current[3] = el;
                }}
                className="relative"
              >
                <label className="block text-sm text-white/50 mb-2">
                  {contactConfig.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-dark-gray/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-highlight transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className={`mt-8 w-full sm:w-auto px-8 py-3 bg-highlight text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-highlight/90"}`}
            >
              <span>
                {isSubmitting ? "Sending..." : contactConfig.submitButtonText}
              </span>
              <Send
                className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : ""}`}
              />
            </button>
          </form>

          {/* Image side */}
          <div
            ref={imageRef}
            className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] rounded-xl overflow-hidden order-1 lg:order-2"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={contactConfig.image}
              alt="Contact"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from "../components/ui/card";
import { Quote, TrendingUp, Mail, MapPin, Phone } from "lucide-react";
import React, { use, useEffect, useRef } from "react";
import "@fontsource/noto-sans/latin.css";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import RTechLogo from "../assets/R-Tech (10).png";
import { Link } from "react-router-dom"; // <-- Add this import

export default function TestimonialPage() {
  // Track if Testimonial section is in view for highlighting
  const [testimonialActive, setTestimonialActive] = React.useState(false);
  const testimonialRef = React.useRef(null);
  const [scrolling, setScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (testimonialRef.current) {
        const rect = testimonialRef.current.getBoundingClientRect();
        // Highlight if top of section is near top of viewport
        setTestimonialActive(rect.top <= 80 && rect.bottom > 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with animation when clicking "Testimonials"
  const handleTestimonialClick = (e) => {
    e.preventDefault();
    if (testimonialRef.current) {
      setScrolling(true);
      testimonialRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // setTimeout(() => setScrolling(false), 800); // duration matches scroll
    }
  };

  const testimonials = [
    {
      name: "Michael Chen",
      title: "CEO, Innovate Solutions",
      quote:
        "The team at Engaging transformed our digital presence completely. Our website traffic has increased by 200% and our conversion rates have never been higher.",
      project: "Corporate Website Redesign",
    },
    {
      name: "Sarah Johnson",
      title: "Marketing Director, TechVision",
      quote:
        "Working with Engaging was a game-changer. They created a comprehensive digital strategy that helped us scale rapidly. I can't recommend them enough.",
      project: "Digital Marketing Campaign",
    },
    {
      name: "Jessica Martinez",
      title: "Product Manager, EcoLife",
      quote:
        "The user experience design that Engaging created received countless compliments from our users. Their team truly understood our vision.",
      project: "Mobile App Redesign",
    },
  ];

  const logos = [
    "denso.png", "mikuni.png", "honda.png", "motherson.png", "shivam.png",
    "vibracoustic.png", "senior.png", "mircontech.png", "sparkminda.png",
    "jbj.png", "kongsberg.png", "neokraft.png"
  ];

  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "paused";
      setTimeout(() => {
        marqueeRef.current.style.animationPlayState = "running";
      }, 1000);
    }
  }, []);

  return (
    <div
      className="min-h-[100vh] bg-gray-50"
      style={{ fontFamily: "'Noto Sans', sans-serif" }} // Ensures Noto Sans for the whole page
    >
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 mt-1">
          <div className="flex items-center gap-2">
            <img
              src={RTechLogo}
              alt="R-Tech logo"
              className="h-16 w-auto"
            />
            <span className="text-xl font-bold text-blue-800">R-Tech Machine & Tools</span>
          </div>
          <nav className="space-x-6 hidden md:flex">
            <Link to="/" className="text-blue-800 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-blue-800 hover:text-blue-600">About Us</Link>
            <Link to="/services" className="text-blue-800 hover:text-blue-600">Services</Link>
            <a
              href="#testimonial-section"
              className={`font-bold transition-all duration-500 ${testimonialActive || scrolling ? 'text-blue-800 border-b-2 border-blue-600' : 'text-blue-800 hover:text-blue-600'}`}
              onClick={handleTestimonialClick}
            >
              Testimonials
            </a>
            <a href="/#portfolio" className="text-blue-800 hover:text-blue-600">Portfolio</a>
            <Link to="/contact" className="text-blue-800 hover:text-blue-600">Contact</Link>
          </nav>
          <div className="space-x-2">
            <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-1 rounded-full">
              Sign In
            </button>
            <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white transition">
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Worked with Clients Section - Start of Page */}
      <motion.section
        ref={testimonialRef}
        id="testimonial-section"
        className="py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-2">
          Worked with Clients
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Don't just take our word for it. Here's what our clients have to say about working with us.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 text-left cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="font-semibold text-blue-900">{item.name}</div>
              <div className="text-sm text-gray-600">{item.title}</div>
              <p className="text-sm text-gray-700 mt-2 mb-2">"{item.quote}"</p>
              <p className="text-xs text-gray-500">Project: {item.project}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Client Success Stories Section */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-2">
          Client Success Stories
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          See how our strategies have helped businesses achieve remarkable results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-6 cursor-pointer p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-start gap-5">
              <div className="bg-blue-50 rounded-full p-3 flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-blue-900" />
              </div>
              <div>
                <div className="font-bold text-blue-900 text-lg md:text-xl mb-1">
                  30% Increase in Production Efficiency
                </div>
                <div className="text-gray-800 text-base md:text-[1rem]">
                  For <b>Bright Precision Industries</b>, our customized tooling and automation solutions significantly improved machining speed and reduced downtime.
                </div>
              </div>
            </div>
            <hr className="my-2 border-gray-100" />
            <div className="text-gray-700 text-base md:text-[1rem] pl-2">
              The results we've achieved with R-Tech's engineering support have been outstanding. Their solutions completely transformed our production workflow and efficiency.
            </div>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-6 cursor-pointer p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start gap-5">
              <div className="bg-blue-50 rounded-full p-3 flex items-center justify-center">
                <Quote className="w-10 h-10 text-blue-900" />
              </div>
              <div>
                <div className="font-bold text-blue-900 text-lg md:text-xl mb-1">
                  45% Higher Conversion Rate
                </div>
                <div className="text-gray-800 text-base md:text-[1rem]">
                  Our automation system redesign for R-Tech Machine &amp; Tools led to a measurable boost in operational efficiency and client satisfaction
                </div>
              </div>
            </div>
            <hr className="my-2 border-gray-100" />
            <div className="text-gray-700 text-base md:text-[1rem] pl-2">
              Our clients appreciate the streamlined workflows and precision performance our new solutions deliver — and the productivity gains speak for themselves.
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* More Client Testimonials */}
      <section className="pb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-2 mt-10">
          More Client Testimonials
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Hear from our happy and successful clients as they share their experience
          working with R-Tech Machine &amp; Tools and the impact our engineering solutions
          have made on their operations.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center px-4 mb-16">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="bg-white rounded shadow-md hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center p-4 w-full h-32"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <img
                src={`/logos/${logo}`}
                alt={logo.replace(".png", "")}
                className="h-24 w-40 object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marquee Animation */}
      <div className="w-full overflow-hidden bg-gray-100">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-100 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-100 to-transparent z-10" />
          <div
            ref={marqueeRef}
            className="w-max animate-scroll whitespace-nowrap text-sm text-gray-700 font-semibold py-3 px-4"
            onMouseEnter={() => {
              if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "paused";
            }}
            onMouseLeave={() => {
              if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "running";
            }}
          >
            <span>
              Honda Cars India Ltd. - Minda Autoelektrik Ltd., Bawal - Denso India Pvt. Ltd , Greater Noida - Denso Haryana Pvt. Ltd. - Microntech Engineers Pvt. Ltd. - Vibracoustic - Senior Flexonics - Mikuni India Pvt. Ltd. - Motherson - JBJ Technologies - Shivam Autotech Ltd - Neokraft - Honda India Power Products — Honda Cars India Ltd. - Minda Autoelektrik Ltd., Bawal - Denso India Pvt. Ltd , Greater Noida - Denso Haryana Pvt. Ltd. - Microntech Engineers Pvt. Ltd. - Vibracoustic - Senior Flexonics - Mikuni India Pvt. Ltd. - Motherson - JBJ Technologies - Shivam Autotech Ltd - Neokraft - Honda India Power Products
            </span>
          </div>
        </div>
      </div>

      {/* CTA/Trust Section */}
      <motion.section
        className="bg-blue-50 rounded-xl p-6 space-y-4 text-center max-w-4xl mx-auto mb-20 mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-blue-900">
          We work on trust, trust builds business
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Let’s work together to create engaging experiences that drive results for your business. Schedule a consultation with our team today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            className="bg-black text-white rounded-full px-6 py-2"
            asChild
          >
            <Link to="/services">
              Explore Our Services
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6 py-2"
            asChild
          >
            <Link to="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </motion.section>

      {/* Footer (copied and unified) */}
      <footer className="bg-white py-16 px-4 border-t w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-0" style={{ maxWidth: '80vw' }}>
          {/* R-Tech Logo & Description */}
          <div className="flex flex-col items-center sm:items-start justify-center h-full">
            <img
              src={RTechLogo}
              alt="R-Tech logo"
              className="h-20 w-auto mb-3"
            />
            <p className="text-sm text-gray-600 max-w-[180px] text-center sm:text-left">
              R-tech Machine &amp; Tools delivers
              precision mechanical solutions and
              strategic tooling services to
              boost efficiency, cut downtime, and drive
              growth in today’s competitive market.
            </p>
            <div className="flex gap-4 mt-4 text-black">
              <span className="text-xl">𝕏</span>
              <span className="text-xl font-bold">in</span>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center sm:items-start justify-center h-full -mt-8">
            <h4 className="font-bold mb-3">Services</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <Link to="/services#tooling" className="hover:text-blue-600 transition-colors">Tooling</Link>
              </li>
              <li>
                <Link to="/services#automation" className="hover:text-blue-600 transition-colors">Automation</Link>
              </li>
              <li>
                <Link to="/services#designing" className="hover:text-blue-600 transition-colors">Designing</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-center sm:items-start justify-center h-full -mt-5">
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/about#leadership" className="hover:text-blue-600 transition-colors">Our Team</Link>
              </li>
              <li>
                <Link to="/testimonial" className="hover:text-blue-600 transition-colors">Testimonial</Link>
              </li>
              <li>
                <a href="#certification" className="hover:text-blue-600 transition-colors">Certification</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start justify-center h-full -mt-0">
            <h4 className="font-bold mb-3">Contact</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 mt-1" />
                <span>
                  PLOT NO. B-33, UDYOG KENDRA-I, ECHOTECH-III,<br />
                  GREATER NOIDA, GAUTAM BUDHANAGAR, UP, INDIA - 201308
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                +91 9910202531
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:dpdinkarrtmt@gmail.com" className="text-blue-600 underline">
                  dpdinkarrtmt@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-100 border-t mt-8 py-4 text-center max-w-full ">
          <span className="text-xs text-gray-500">
            © 2025 R-Tech Machine &amp; Tools. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Marquee animation style */}
      <style jsx>{String.raw`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          display: inline-block;
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

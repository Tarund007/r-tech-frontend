// src/pages/r-techmainpage.jsx

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Gauge, BarChart, Code2, LineChart, MapPin, Phone, Mail } from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import Firstpagetalk from '../assets/firstpagetalk.png';
import ThisIsEngineering from '../assets/thisisengineering.jpeg';
import RTechLogo from '../assets/R-Tech (10).png';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // <-- import useLocation

import SignPage from './Admin/SignIn';
import SignupPage from './Admin/SignUp';

const FooterColumn = ({ title, items }) => (
  <div>
    <h4 className="font-bold mb-2">{title}</h4>
    <ul className="text-gray-700 text-sm space-y-1">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  </div>
);

export default function RTechMainPage() {
  const location = useLocation(); // <-- get current route
  const navigate = useNavigate();
  const [homeActive, setHomeActive] = useState(true);

  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

  // Highlight "Home" in nav when home section is in view
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('home');
      if (section) {
        const rect = section.getBoundingClientRect();
        setHomeActive(rect.top <= 80 && rect.bottom > 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section with smooth animation

  return (
    <div className="min-h-screen bg-white font-['Noto Sans']" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 mt-1">
          <div className="flex items-center gap-2">
            <img
              src={RTechLogo}
              alt="R-Tech logo with green R-Tech text in bold italic font centered inside two blue oval outlines on a transparent background, conveying a modern and professional tone"
              className="h-16 w-auto"
            />
            <span className="text-xl font-bold text-blue-800">R-Tech Machine & Tools</span>
          </div>
          <nav className="space-x-6 hidden md:flex">
            <a
              href="#home"
              className={`font-bold ${homeActive && location.pathname === '/' ? 'text-blue-800 border-b-2 border-blue-600' : 'text-blue-800 hover:text-blue-600'}`}
              onClick={e => {
                e.preventDefault();
                if (homeRef.current) {
                  homeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Home
            </a>
            <Link
              to="/about" className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/About Us' ? 'font-bold border-b-2 border-blue-600' :''}`}>About Us</Link>
            <Link to="/services" className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/services' ? 'font-bold border-b-2 border-blue-600' : ''}`}>Services</Link>
            <Link to="/testimonial" className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/testimonial' ? 'font-bold border-b-2 border-blue-600' : ''}`}>Testimonials</Link>
            <a href="#portfolio" className="text-blue-800 hover:text-blue-600">Portfolio</a>
            <Link to="/contact" className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/contact' ? 'font-bold border-b-2 border-blue-600' : ''}`}>Contact</Link>
          </nav>
          <div className="space-x-2">
            <button
              className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-1 rounded-full"
              onClick={() => navigate('/admin/signup')}
            >
              Sign Up
            </button>
            <button
              className="bg-black text-white px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white transition"
              onClick={() => navigate('/admin/signin')}
            >
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Home) */}
      <motion.section
        ref={homeRef}
        className="bg-[#2f2f2f] text-white px-6 py-20 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Mechanical Performance with Precision Engineering
          </motion.h1>
          <motion.p
            className="text-md sm:text-lg text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We blend innovative design, advanced engineering, and strategic insight to create high-performance mechanical solutions. These solutions boost efficiency, drive growth, and give your business the competitive edge it needs.
          </motion.p>
          <div className="flex gap-4 flex-wrap">
            <motion.button
              className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Vision Section (About Us) */}
      <motion.section
        ref={aboutRef}
        className="bg-gray-100 text-center py-16 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-20 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg">
            Our team of experts combines technical/Mechanical expertise with creative vision to
            deliver solutions that not only meet your current needs but position your business for
            future growth and success.
          </p>
        </div>
      </motion.section>

      {/* Innovation Section */}
      <motion.section
        className="bg-purple-50 py-16 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h3 className="text-3xl font-bold mb-4 text-center">Innovative Solutions for Modern Challenges</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12 px-4 text-center">
            Our team of mechanical engineering experts fuses technical mastery with creative vision to
            deliver solutions that not only meet your current requirements but future-proof your
            operations for growth and success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
            {[{
              icon: <Lightbulb className="text-blue-600" size={32} />,
              title: 'Innovation',
              desc: 'Pushing boundaries with forward-thinking solutions'
            }, {
              icon: <ShieldCheck className="text-blue-600" size={32} />,
              title: 'Security',
              desc: 'Precision. Durability. Protection. Performance. Reliability.'
            }, {
              icon: <Gauge className="text-blue-600" size={32} />,
              title: 'Performance',
              desc: 'Lightning-fast experiences that users love'
            }, {
              icon: <BarChart className="text-blue-600" size={32} />,
              title: 'Scalability',
              desc: 'Solutions that grow with your business needs'
            }].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Approach Section */}
      <motion.section
        className="bg-white py-20 px-6 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src={Firstpagetalk}
            alt="Mechanical Engineering Team"
            className="rounded-xl shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4 text-left">Our Approach to Mechanical Engineering Excellence</h2>
            <p className="text-gray-700 mb-6 text-left">
              We believe that outstanding mechanical solutions begin with a deep understanding of your operational objectives, performance requirements, and industry landscape. Our collaborative engineering process ensures designs that not only meet your specifications but also deliver exceptional reliability and efficiency.
            </p>
            <ul className="text-left space-y-4 text-sm text-gray-800">
              <li>
                <strong>Operator-Centered Design</strong><br />
                Prioritizing ergonomic usability and intuitive interaction for safer, more productive workflows
              </li>
              <li>
                <strong>Performance-Optimized Fabrication</strong><br />
                Engineering components and assemblies for maximum speed, durability, and precision under real-world conditions
              </li>
              <li>
                <strong>Data-Driven Analysis</strong><br />
                Leveraging performance metrics and simulations to maximize uptime, minimize costs, and boost ROI
              </li>
              <li>
                <strong>Ongoing Maintenance & Optimization</strong><br />
                Providing continuous support, monitoring, and refinement to ensure sustained peak performance and long-term success
              </li>
            </ul>
            <button
              className="mt-6 px-6 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition"
              onClick={() => navigate('/services')}
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </motion.section>

      {/* Featured Work Section */}
      <motion.section
        className="bg-gray-50 py-20 px-6 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">Our Featured Work</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Take a look at some of our recent projects that showcase our expertise and creative approach.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Luxury Fashion E-Commerce',
                desc: 'A premium shopping experience that increased conversion rates by 45%',
                img: '/project-fashion.png'
              },
              {
                title: 'Financial Services Platform',
                desc: 'A secure, accessible platform that simplified complex financial processes',
                img: '/project-finance.png'
              },
              {
                title: 'Fitness Tracking App',
                desc: 'An intuitive mobile experience with over 500,000 active users',
                img: '/project-fitness.png'
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden text-left hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <img src={project.img} alt={project.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="bg-white py-20 px-6 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-center mb-2">What Our Clients Say</h2>
          <p className="text-center text-gray-600 mb-12">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Michael Chen',
                title: 'CEO, Innovate Solutions',
                quote: '"The team at Engaging transformed our digital presence completely. Our website traffic has increased by 200% and our conversion rates have never been higher. Their strategic approach and attention to detail made all the difference."'
              },
              {
                name: 'Sarah Johnson',
                title: 'Marketing Director, TechVision',
                quote: '"Working with Engaging was a game-changer for our business. They didn’t just deliver a beautiful website, they created a comprehensive digital strategy that has helped us scale rapidly. I can\'t recommend them enough."'
              },
              {
                name: 'Jessica Martinez',
                title: 'Product Manager, EcoLife',
                quote: '"The user experience design that Engaging created for our app has received countless compliments from our users. Their team truly understood our vision and brought it to life in ways we couldn\'t have imagined."'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 rounded-xl shadow-sm p-6 text-left hover:shadow-md hover:scale-[1.02] transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <h4 className="font-semibold text-base mb-1">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{item.title}</p>
                <p className="text-sm text-gray-700">{item.quote}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <motion.button
              className="px-6 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/Testimonial')}
            >
              Read More Testimonials
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="bg-white py-20 px-6 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 mb-8">
              We merge inventive design, cutting-edge technology, and strategic planning to deliver exceptional mechanical systems that empower your operations to excel in today’s competitive market.
            </p>
            <ul className="space-y-6">
              {[{
                icon: <Lightbulb className="text-blue-600" size={24} />,
                title: 'Innovative Mechanical Design',
                desc: 'Our award-winning engineering team crafts precision mechanical systems that embody your brand’s innovation and drive user engagement through superior performance'
              }, {
                icon: <Code2 className="text-blue-600" size={24} />,
                title: 'Advanced Manufacturing Technology',
                desc: 'We utilize state-of-the-art fabrication and additive manufacturing methods to develop durable, scalable components that perform reliably under all operating conditions.'
              }, {
                icon: <LineChart className="text-blue-600" size={24} />,
                title: 'Performance-Driven Strategy',
                desc: 'Our data-driven optimization ensures your mechanical assets deliver measurable efficiency gains, reduced downtime, and maximized ROI.'
              }].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src={ThisIsEngineering}
              alt="Engineering Team"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        style={{ backgroundColor: 'rgba(0,48,144,0.7)' }}
        className="py-20 px-6 text-white text-center w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          We work on Trust, Trust builds Business
        </h2>
        <p className="text-md sm:text-lg max-w-2xl mx-auto mb-8">
          Let's work together to create engaging experiences that drive results for your business.
          <br />Schedule a consultation with our team today.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <motion.button
            className="bg-white text-blue-700 font-medium px-6 py-2 rounded-full hover:bg-blue-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/Contact')}
          >
            Get in Touch
          </motion.button>
          <motion.button
            className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/services')}
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>

      {/* Footer Section */}
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
        {/* Copyright full-width background */}
        <div className="bg-gray-100 border-t mt-8 py-4 text-center w-full">
          <span className="text-xs text-gray-500">
            © 2025 R-Tech Machine &amp; Tools. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Lightbulb, LineChart, Users, Star, HeartHandshake, Mail, Phone, MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import "@fontsource/noto-sans/latin.css";
import aboutUsImg from '../assets/aboutus.png';
import Footer from '../components/ui/layout/footer';
import RTechLogo from '../assets/R-Tech (10).png';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // <-- Add useNavigate


function Counter({ from = 0, to, duration = 2 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        value: to,
        transition: { duration, ease: 'easeOut' },
      });
    }
  }, [controls, inView, to, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ value: from }}
      animate={controls}
    >
      {to.toLocaleString()}
    </motion.span>
  );
}

const valuesData = [
  {
    icon: <Star className="text-blue-600 w-5 h-5" />, title: 'Excellence',
    text: 'We strive for excellence in everything we do, from the smallest detail to the largest project. Our commitment to quality is unwavering.'
  },
  {
    icon: <HeartHandshake className="text-blue-600 w-5 h-5" />, title: 'Partnership',
    text: 'We view our clients as partners and believe in building long-term relationships based on trust, transparency, and mutual success.'
  },
  {
    icon: <Lightbulb className="text-blue-600 w-5 h-5" />, title: 'Innovation',
    text: 'We embrace innovation and continuously explore new engineering methods to solve complex mechanical challenges and deliver lasting value to our clients in an ever-evolving industrial landscape.'
  }
];

const testimonials = [
  {
    name: 'Mr Rajinder Singh',
    title: 'Shivam Autotech Ltd.',
    text: 'The team at R-Tech Machine & Tools is exceptional. They delivered a high-performance mechanical system that has greatly enhanced our manufacturing capabilities. Their expertise and professionalism made the entire process seamless. We are extremely satisfied with the results!'
  },
  {
    name: 'Mr Sudhir Upadhyay',
    title: 'Manager, Honda',
    text: 'The user experience design that R-Tech Machine & Tools created received countless compliments from our users. Their team truly understood our vision.'
  },
  {
    name: 'Mr Vijay Verma',
    title: 'Manager Director, Mircontech Engineers Pvt. Ltd.',
    text: 'R-Tech Machine & Tools provided us with an innovative mechanical design that has transformed our production line. Their attention to detail and commitment to quality is unmatched. We have seen a significant boost in efficiency since implementing their solution.'
  }
];

export default function Aboutspage() {
  const location = useLocation();
  const navigate = useNavigate(); // <-- Add this line
  // Track if About Us section is in view for highlighting
  const [aboutActive, setAboutActive] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('aboutus-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        // Highlight if top of section is near top of viewport
        setAboutActive(rect.top <= 80 && rect.bottom > 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to hash location on mount
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
            <Link to="/" className="text-blue-800 hover:text-blue-600">Home</Link>
            <a
              href="#aboutus"
              className={`font-bold ${aboutActive ? 'text-blue-800 border-b-2 border-blue-600' : 'text-blue-800 hover:text-blue-600'}`}
              onClick={e => {
                e.preventDefault();
                const section = document.getElementById('aboutus-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              About Us
            </a>
            <Link to="/services" className="text-blue-800 hover:text-blue-600">Services</Link>
            <Link to="/testimonial" className="text-blue-800 hover:text-blue-600">Testimonials</Link>
            <a href="#portfolio" className="text-blue-800 hover:text-blue-600">Portfolio</a>
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

      {/* Main content at 100% width, but inner content at 80% */}
      <div className="w-full flex flex-col items-center">
        {/* About Section */}
        <section
          id="aboutus-section"
          className="bg-blue-700 bg-opacity-70 text-white py-20 w-full"
        >
          <div className="mx-auto" style={{ maxWidth: '80vw' }}>
            <h2 className="text-4xl font-bold mb-6">About R-tech Machine & Tools</h2>
            <p className="text-lg leading-relaxed">
              We Engineer's provides high-performance mechanical systems that deliver measurable results and engage stakeholders through
              innovative design, precise analysis, and strategic excellence.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <motion.section
          className="bg-gray-50 py-16 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center" style={{ maxWidth: '80vw' }}>
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission & Vision</h2>
              <p className="text-gray-700 mb-4">
                To engineer and deliver state-of-the-art machine tools and mechanical solutions that empower manufacturers to meet the highest standards of performance and productivity. Through rigorous analysis, advanced CAD/CAM integration, and lean manufacturing principles, we ensure every product drives quantifiable improvements on the shop floor
              </p>
              <p className="text-gray-700 mb-6">
                R-Tech Machine & Tools (est. 2017) offers complete mechanical engineering services—from FEA/CAM-driven design and multi-axis CNC machining to rapid prototyping and IoT-based predictive maintenance. Our ISO 9001:2015 & AS9100-certified team makes equipment run smoothly, cuts downtime, and boosts production, using eco-friendly materials and the latest technology
              </p>
              <div className="flex gap-4">
                <Link
                  to="/services"
                  className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors"
                >
                  Explore Our Services
                </Link>
                <button className="border border-blue-500 text-blue-700 px-6 py-2 rounded-full hover:bg-blue-50" onClick={() => navigate('/contact')}>
                  Get in Touch
                </button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={aboutUsImg}
                alt="About Us"
                className="rounded-xl shadow-md"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Engineering Excellence Section */}
        <motion.section
          className="bg-blue-50 py-16 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-4 text-center" style={{ maxWidth: '80vw' }}>
            <h2 className="text-3xl font-bold text-blue-800 mb-12">Our Approach to Engineering Excellence</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{
                icon: <Lightbulb className="text-blue-600 w-6 h-6" />, title: 'Cutting-Edge Technology',
                text: 'We leverage the latest engineering technologies to design robust, scalable mechanical systems that deliver reliable, high-performance operation across various applications and environments—ensuring your machinery and processes stay at the forefront of industrial innovation.'
              }, {
                icon: <LineChart className="text-blue-600 w-6 h-6" />, title: 'Results-Driven Strategy',
                text: 'Our data-informed approach ensures your digital presence translates into measurable business growth and ROI. We focus on creating strategies that deliver tangible results for your business.'
              }, {
                icon: <Users className="text-blue-600 w-6 h-6" />, title: 'User-Centered Design',
                text: 'We believe in engineering mechanical solutions that prioritize ease of operation, efficiency, and user safety. Our designs are not only precise and reliable but also built for optimal performance, usability, and long-term value—ensuring a superior user experience across global industries.'
              }].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md text-left"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex items-center mb-3 gap-2">
                    {item.icon}
                    <h3 className="text-lg font-bold text-blue-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section
          className="bg-gray-50 py-16 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center" style={{ maxWidth: '80vw' }}>
            <h2 className="text-3xl font-bold text-blue-800 mb-12">Meet Our Leadership Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[{
                name: 'D.P Dinkar', role: 'CEO & Founder', bio: '25+ years of automation expertise, built on MNC experience at DENSO, delivering precision-driven solutions',
                // img: '/dp-dinkar.png'
              }, {
                name: 'Marcus Johnson', role: 'Chief Technology Officer', bio: 'Former tech lead at Google with expertise in AI and cloud solutions',
                // img: '/marcus-johnson.png'
              }, {
                name: 'Elena Rodriguez', role: 'Creative Director', bio: 'Award-winning designer with background in UX/UI and brand identity',
                // img: '/elena-rodriguez.png'
              }, {
                name: 'David Kim', role: 'Strategy Director', bio: 'Digital marketing strategist with proven success across multiple industries',
                // img: '/david-kim.png'
              }].map((leader, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <img src={leader.img} alt={leader.name} className="w-40 h-40 mx-auto rounded-full object-cover mb-4" />
                  <h3 className="font-bold text-blue-800 text-lg">{leader.name}</h3>
                  <p className="text-blue-500 text-sm font-semibold mb-2">{leader.role}</p>
                  <p className="text-gray-700 text-sm max-w-xs mx-auto">{leader.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          className="bg-[#465550] py-16 rounded-[40px] mx-4 w-11/12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-6xl mx-auto px-4 text-center text-white" style={{ maxWidth: '80vw' }}>
            <h2 className="text-3xl font-bold mb-12">Our Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[{
                value: 150, suffix: '+', label: 'Successful Projects'
              }, {
                value: 98, suffix: '%', label: 'Client Satisfaction'
              }, {
                value: 8, suffix: '+', label: 'Years of Excellence'
              }].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#566864] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    <Counter to={item.value} />{item.suffix}
                  </div>
                  <p className="text-white text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className="bg-gray-100 py-16 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-6xl mx-auto px-4 text-center" style={{ maxWidth: '80vw' }}>
            <h2 className="text-3xl font-bold text-blue-900 mb-12">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {valuesData.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {item.icon}
                    <h3 className="text-md font-bold text-blue-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="bg-[#f5f4ff] py-16 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center" style={{ maxWidth: '80vw' }}>
            <h2 className="text-3xl font-bold text-blue-900 mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white text-left p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <h3 className="font-bold text-blue-800 text-md mb-1">{t.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{t.title}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">"{t.text}"</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              className="mt-8 px-6 py-2 rounded-full border border-blue-400 text-blue-600 hover:bg-blue-50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/testimonial')}
            >
              Read More Testimonials
            </motion.button>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="bg-gray-100 py-20 px-4 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-5xl mx-auto bg-[#003399] text-white text-center p-10 rounded-2xl" style={{ maxWidth: '80vw' }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Elevate Your Mechanical Performance?
            </h2>
            <p className="text-base sm:text-lg mb-8">
              Let’s work together to engineer high-performance mechanical solutions that drive real results for your business. Schedule a consultation with our expert team today.
            </p>
            <motion.button
              className="px-6 py-2 rounded-full bg-white text-blue-900 font-medium hover:bg-blue-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
            >
              Get in Touch
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
          <div className="bg-gray-100 border-t mt-8 py-4 text-center max-w-full ">
            <span className="text-xs text-gray-500">
              © 2025 R-Tech Machine &amp; Tools. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

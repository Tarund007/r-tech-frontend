import React, { useRef, useEffect, useState } from 'react';
import { Wrench, Cog, Pencil, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import "@fontsource/noto-sans/latin.css";
import imageBanner from '../assets/image.png';
import RTechLogo from '../assets/R-Tech (10).png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import assetsCnc from '../assets/cnc.png';
import assetsPlc from '../assets/plc.png';
import assetsMeasuring from '../assets/measuring.png';
import assetsClamping from '../assets/clamping.png';

const ServiceCard = ({ icon, title, description, points, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-blue-100 p-3 rounded-full shadow-md">
        <div className="text-black">{icon}</div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <p className="mb-4 text-gray-700 leading-relaxed text-[15px]">{description}</p>
    <ul className="space-y-2 text-gray-700 text-[15px]">
      {points.map((point, index) =>
        typeof point === 'string' ? (
          <li key={index} className="flex gap-2 items-start">
            <span className="text-blue-600 text-lg">✔</span>
            <span className="leading-snug">{point}</span>
          </li>
        ) : (
          <li key={index} className="flex gap-2 items-start">
            <span className="text-blue-600 text-lg">✔</span>
            <span>
              <strong>{point.title}</strong>
              <br />
              {point.desc}
            </span>
          </li>
        )
      )}
    </ul>
    <button className="mt-6 bg-black text-white px-6 py-2 rounded-full shadow-md">Learn More</button>
  </motion.div>
);

const designingPoints = [
  {
    title: 'Requirement Analysis & Concept Design',
    desc: 'Understand client needs and translate them into a functional concept using CAD modeling.'
  },
  {
    title: 'Simulation & Validation',
    desc: 'Run FEA and motion simulations to ensure mechanical integrity and performance.'
  },
  {
    title: 'Prototyping & Manufacturing',
    desc: 'Fabricate precise prototypes and scale to full production with in-house CNC and assembly.'
  },
  {
    title: 'Integration, Testing & Delivery',
    desc: 'Integrate systems, perform rigorous testing, and deliver a ready-to-deploy solution.'
  }
];

const FacilityCard = ({ image, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
    className="bg-white p-6 rounded-xl text-center shadow-lg max-w-xs w-full mx-auto transition-transform duration-300"
  >
    <img
      src={image}
      alt={title}
      className="mx-auto mb-4 h-20 w-20 object-contain shadow-md rounded-full transition-transform duration-300"
    />
    <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const MechanicalPerformanceBanner = () => {
  const navigate = useNavigate(); // <-- Add this line

  return (
    <motion.section
      className="bg-[#003DA5] text-white py-12 px-6 rounded-xl max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 mt-16 mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Elevate Your Mechanical <br /> Performance?
        </h2>
        <p className="text-base md:text-lg mb-6">
          Let's work together to create engaging experiences that drive
          results for your business. Schedule a consultation with our team today.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="bg-white text-[#003DA5] px-6 py-2 rounded-full font-medium shadow-md transition
              hover:shadow-xl hover:scale-105 hover:bg-blue-50 hover:text-blue-900 hover:border hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => navigate('/contact')}
          >
            Get in Touch
          </button>
          <button className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-[#003DA5] transition">
            Explore Our Portfolio
          </button>
        </div>
      </div>
      <div className="flex-1 max-w-md">
        <img
          src={imageBanner}
          alt="Team working on mechanical performance improvement"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
    </motion.section>
  );
};

export default function ServicesPage() {
  const location = useLocation();
  const navigate = useNavigate(); // <-- Add this line
  const [servicesActive, setServicesActive] = useState(location.pathname === '/services');
  const servicesRef = useRef(null);

  // Highlight "Services" in nav when services section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        setServicesActive(location.pathname === '/services' || (rect.top <= 80 && rect.bottom > 80 && location.pathname === '/services'));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
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
            <Link
              to="/"
              className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/' ? 'font-bold border-b-2 border-blue-600' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/about' ? 'font-bold border-b-2 border-blue-600' : ''}`}
            >
              About Us
            </Link>
            <a
              href="#services"
              className={`font-bold ${servicesActive ? 'text-blue-800 border-b-2 border-blue-600' : 'text-blue-800 hover:text-blue-600'}`}
              onClick={e => {
                e.preventDefault();
                if (servicesRef.current) {
                  servicesRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Services
            </a>
            <Link
              to="/testimonial"
              className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/testimonial' ? 'font-bold border-b-2 border-blue-600' : ''}`}
            >
              Testimonials
            </Link>
            {/* <a href="#portfolio" className="text-blue-800 hover:text-blue-600">Portfolio</a> */}
            <Link
              to="/contact"
              className={`text-blue-800 hover:text-blue-600 ${location.pathname === '/contact' ? 'font-bold border-b-2 border-blue-600' : ''}`}
            >
              Contact
            </Link>
          </nav>
          <div className="space-x-2">
            <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-1 rounded-full text-base">
              Sign In
            </button>
            <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white transition text-base">
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Start page from Our Services section */}
      <motion.section
        ref={servicesRef}
        id="services"
        className="bg-blue-900 text-white py-20 px-8 text-center w-full flex flex-col justify-normal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="max-w-3xl mx-auto text-lg">
          We provide advanced mechanical engineering services that boost performance,
          reduce downtime, and increase efficiency. Explore our solutions designed to
          optimize your systems and drive real results.
        </p>
      </motion.section>

      {/* Services Cards Section with animation */}
      <motion.section
        ref={servicesRef}
        id="services"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50 w-full"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <ServiceCard
          icon={<Wrench className="text-blue-700" />}
          title="Tooling"
          description="We provide advanced tooling solutions—custom jigs, fixtures, and high-performance cutting tools—designed to improve machining accuracy, reduce cycle time, and extend tool life. Using data-driven analysis and simulation, we ensure maximum efficiency, precision, and ROI in every production run."
          points={[
            'Manufacturing of precision jigs, fixtures, gauges, and spare parts.',
            'Manufacturing of precision moulds & dies, including:',
            'Injection moulds (Two-plate & Three-plate)',
            'Hot runner systems',
            'Unscrew moulds, etc.',
            'Use of Mould Flow Analysis for optimized mould design and performance.',
            'More'
          ]}
          delay={0}
        />

        <ServiceCard
          icon={<Cog className="text-blue-700" />}
          title="Automation"
          description="We specialize in the design and development of Special Purpose Machines (SPMs) tailored for high-precision, high-volume automotive manufacturing. Our automation systems are engineered to enhance productivity, reduce human error, and ensure consistent output quality."
          points={[
            'We design and develop custom Special Purpose Machines (SPMs) for the automotive industry, integrating pneumatic, hydraulic, and electromechanical systems to deliver high-precision, efficient, and automated production solutions.',
            'PLC and HMI programming for real-time process control and diagnostics.',
            'Integration with robotic arms, conveyors, sensors, and vision systems for intelligent automation.',
            'More'
          ]}
          delay={0.2}
        />

        <ServiceCard
          icon={<Pencil className="text-blue-700" />}
          title="Designing"
          description="At R-Tech Machine & Tools, we specialize in mechanical design and development of Special Purpose Machines (SPMs) using advanced CAD/CAE tools. Our expertise enables us to deliver automation systems optimized for high-precision, high-volume manufacturing."
          points={designingPoints}
          delay={0.4}
        />
      </motion.section>

      {/* Facilities Section with animated cards */}
      <motion.section
        className="bg-blue-50 text-center py-16 px-4 sm:px-6 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Approach to Engineering Excellence</h2>
        <p className="max-w-5xl mx-auto text-gray-700 mb-12 leading-relaxed">
          At <strong>R-Tech Machine & Tools</strong>, our engineering excellence is driven by four core facilities. In our <strong>Machine Facility</strong>, we use advanced CNC and EDM machines to achieve high-precision, efficient manufacturing. Our <strong>Electrical power systems</strong> integrate servo motors, PLCs, and energy-efficient controls for reliable automation. Precision is ensured through our <strong>Measuring Instruments</strong>, including CMMs and micrometers, enabling strict quality control and dimensional accuracy. Additionally, our <strong>Clamping Instrument Facility</strong> provides custom fixtures and hydraulic systems that enhance stability, machining accuracy, and operational safety across all production stages.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FacilityCard
            image={assetsCnc}
            title="Machine Facilities"
            desc="Use advanced CNC and EDM machines to achieve high-precision, efficient manufacturing"
            delay={0}
          />
          <FacilityCard
            image={assetsPlc}
            title="Electrical Power System"
            desc="Integrate servo motors, PLCs, and energy-efficient controls for reliable automation"
            delay={0.15}
          />
          <FacilityCard
            image={assetsMeasuring}
            title="Measuring Instruments"
            desc="CMMs and micrometers, enabling strict quality control and dimensional accuracy."
            delay={0.3}
          />
          <FacilityCard
            image={assetsClamping}
            title="Clamping Instrument Facilities"
            desc="Custom fixtures and hydraulic systems that enhance stability, machining accuracy, and operational safety across all production stages."
            delay={0.45}
          />
        </div>
      </motion.section>

      {/* Machine Facilities Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Machine Facilities</h2>
            <p className="mb-6 text-gray-700 text-[15px]">
              <strong>Machine Facilities</strong> are equipped with CNC, milling, lathe, and EDM machines to precisely shape and finish components, enabling high-accuracy, efficient production and prototyping in mechanical engineering.
            </p>
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Precision milling machine</strong><br />Precut model 3ES, make Taiwan, with DRO</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Surface Grinder</strong><br />Make Guru Arjun 250X510 mm, Accuracy 0.005 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Lathe machine</strong><br />Make Rajkot, 6 foot</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Pedestal Grinder</strong><br />0.5 HP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Welding Set</strong><br />Make Electra (Portable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>VMC (S and T) CNC Machine</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Steel Pipe Cutter</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Aluminium Pipe Cutter</strong></span>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="/assets/R-Tech (9).png"
              alt="Machine Facilities"
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Measuring Instrument Facility Section */}
      <section className="py-16 px-6" style={{ background: "#F7F5FF" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/assets/R-Tech (10).png"
              alt="Measuring Instrument Facility"
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Measuring Instrument Facility</h2>
            <p className="mb-6 text-gray-700 text-[15px]">
              <strong>Measuring Instrument Facility</strong> is equipped with high-precision tools like surface plates, calipers, micrometers, and gauges to ensure dimensional accuracy and quality of machined components. It supports tight tolerance inspection and quality control in mechanical manufacturing.
            </p>
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Surface Plate</strong><br />Granite Grade 0 and Size 1000x630x150 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Height Gauge</strong><br />300 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Digital Vernier Caliper</strong><br />0–150 mm, LC = 0.001 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Manual Vernier Caliper</strong><br />0–300 mm, LC = 0.02 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Inside Micrometer</strong><br />0–25 mm, LC = 0.001 & 0.01 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Outside Micrometer</strong><br />25–50 mm, LC = 0.01 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Dial Indicator</strong><br />Plunger Type, LC = 0.01 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Bevel Protector</strong><br />Least Count 5’ & Angle Protector</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Inner & Outer Radius Gauge</strong><br />R1–7 mm and R7.5–15 mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Thread Gauge</strong><br />Range (0.4–7 mm)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Electrical Power Facility Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Electrical Power Facility</h2>
            <p className="mb-6 text-gray-700 text-[15px]">
              <strong>Electrical Power Facility</strong> in mechanical engineering refers to the infrastructure that supplies and manages electrical energy required to operate machines, tools, and automated systems. It ensures stable and sufficient power—such as a sanctioned load of <strong>20 kV</strong>—to run <strong>CNC machines, SPMs, welding equipment</strong>, and other electrically driven mechanical systems. This facility supports uninterrupted operations, enhances energy efficiency, and is essential for powering electromechanical setups in industrial environments.
            </p>
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Electrical Load Sanction</strong><br />20 kV</span>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="/assets/cnc.png"
              alt="Electrical Power Facility"
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Clamping Instrument Facility Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="/assets/R-Tech (12).png"
              alt="Clamping Instrument Facility"
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Clamping Instrument Facility</h2>
            <p className="mb-6 text-gray-700 text-[15px]">
              <strong>Clamping Instrument Facility</strong> in mechanical engineering refers to a set of tools and equipment used to securely hold workpieces during machining, grinding, inspection, or assembly processes. These instruments ensure <strong>rigidity, accuracy</strong>, and <strong>operator safety</strong> by minimizing movement, vibration, and misalignment.
            </p>
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>V-Block Magnetic</strong><br />holding cylindrical or round components during inspection or machining.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Apex Moving Vice</strong><br />adjustable clamping device for flexible positioning.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Precision Grinding Vice</strong><br />used in surface grinding for accurate and stable clamping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span><strong>Bench Vice</strong><br />general-purpose holding tool for manual operations.</span>
              </li>
            </ul>
            <div className="mt-10">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full"
                onClick={() => navigate('/testimonial')}
              >
                Read More Testimonials
              </button>
            </div>
          </div>
        </div>
      </section>

      <MechanicalPerformanceBanner />

      {/* Footer (copied from AboutUs.jsx) */}
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
  );
}

import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MapPin, Phone, Mail, Clock, Linkedin, X } from "lucide-react";
import { RocketIcon, HeartHandshakeIcon, HeadphonesIcon } from "lucide-react";
import "@fontsource/noto-sans/latin.css";
import RTechLogo from "../assets/R-Tech (10).png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Add this import at the top with other imports
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// formData.append("file", file); // single file
// for multiple: attachments.forEach(f => formData.append("files", f.file))

// await fetch(API_URL + "/api/documents/upload", {
//   method: "POST",
//   body: formData,
// });


const features = [
	{
		icon: <RocketIcon className="w-8 h-8 text-blue-500" />,
		title: "Fast Response",
		description:
			"We aim to respond to all inquiries within 24 hours during business days.",
	},
	{
		icon: <HeartHandshakeIcon className="w-8 h-8 text-blue-500" />,
		title: "Personalized Approach",
		description:
			"Every client receives a tailored solution designed for their specific needs.",
	},
	{
		icon: <HeadphonesIcon className="w-8 h-8 text-blue-500" />,
		title: "Ongoing Support",
		description:
			"Our relationship doesn't end at launch - we provide continuous support.",
	},
];
	
	
	const onSubmitForm = async (data) => {
		const formData = new FormData();
		formData.append("firstName", data.firstName);
		
		attachments.forEach(f => formData.append("files", f.file)); // ✅ Correct

 try {
      const res = await axios.post(API_URL + "/api/documents/upload", formData);
      if (res.status === 201) {
        alert("Message sent!");
        setAttachments([]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


const getFileIcon = (filename) => {
  const ext = filename?.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf': return '📄';
    case 'doc':
    case 'docx': return '📝';
    case 'xls':
    case 'xlsx': return '📊';
    case 'png':
    case 'jpg':
    case 'jpeg': return '🖼️';
    case 'zip':
    case 'rar': return '🗜️';
    default: return '📁';
  }
};

export default function ContactUsPage() {
  const contactRef = useRef(null);
  const [contactActive, setContactActive] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const handleScroll = () => {
      if (contactRef.current) {
        const rect = contactRef.current.getBoundingClientRect();
        setContactActive(rect.top <= 80 && rect.bottom > 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onSubmitForm = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("consent", data.consent ? "true" : "false");

    attachments.forEach((f) => formData.append("files", f.file));

    try {
      const res = await axios.post(API_URL + "/api/documents/upload", formData);
      if (res.status === 201) {
        alert("Message sent!");
        reset();
        setAttachments([]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

//   return (
//     <form onSubmit={handleSubmit(onSubmitForm)}>
//       {/* your form fields go here */}
//     </form>
//   );
// }

	return (
		<div
			className="min-h-screen bg-gray-50 text-gray-800"
			style={{
				fontFamily: "Noto Sans, sans-serif",
				minHeight: "1080px",
				maxWidth: "1920px",
				margin: "0 auto",
			}}
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
						<Link to="/testimonial" className="text-blue-800 hover:text-blue-600">Testimonials</Link>
						<a href="/#portfolio" className="text-blue-800 hover:text-blue-600">Portfolio</a>
						<a
							href="#contact-section"
							className={`font-bold ${contactActive ? 'text-blue-800 border-b-2 border-blue-600' : 'text-blue-800 hover:text-blue-600'}`}
							onClick={handleContactClick}
						>
							Contact
						</a>
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

			{/* Main Contact Section */}
			<section
				ref={contactRef}
				id="contact-section"
				className="flex-1 container mx-auto p-6 space-y-10"
				style={{
					maxWidth: "1720px",
					width: "100%",
					minHeight: "calc(1080px - 220px)",
				}}
			>
				<h1 className="text-4xl font-bold text-center text-blue-900">
					Contact Us
				</h1>
				<p className="text-center text-gray-600 max-w-2xl mx-auto">
					We'd love to hear from you. Contact our team for inquiries,
					consultations, or to discuss how we can help optimize your
					mechanical systems and enhance your operational performance.
				</p>

				<div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-12">
					<motion.div
						className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<CardContent className="space-y-4 p-6">
							<h2 className="text-xl font-bold text-blue-900">
								Get in Touch
							</h2>
							<form
								onSubmit={handleSubmit(onSubmitForm)}
								className="space-y-4"
							>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-semibold mb-1">
											First Name
										</label>
										<Input
											placeholder="First Name"
											{...register("firstName", {
												required: true,
											})}
										/>
										{errors.firstName && (
											<p className="text-red-600 text-sm">
												First name is required.
											</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-semibold mb-1">
											Last Name
										</label>
										<Input
											placeholder="Last Name"
											{...register("lastName", {
												required: true,
											})}
										/>
										{errors.lastName && (
											<p className="text-red-600 text-sm">
												Last name is required.
											</p>
										)}
									</div>
								</div>
								<div>
									<label className="block text-sm font-semibold mb-1">
										Email Address
									</label>
									<Input
										type="email"
										placeholder="email@example.com"
										{...register("email", {
											required: "Email is required.",
											pattern: {
												value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
												message: "Invalid email format.",
											},
										})}
									/>
									{errors.email && (
										<p className="text-red-600 text-sm">
											{errors.email.message}
										</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-semibold mb-1">
										Phone Number (Optional)
									</label>
									<Input
										placeholder="+91 9988776655"
										{...register("phone")}
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold mb-1">
										Subject
									</label>
									<select
										className="w-full px-3 py-2 border rounded-md text-sm"
										{...register("subject", { required: true })}
									>
										<option value="">Select a Subject</option>
										<option>Request a Consultation</option>
										<option>Request for Proposal</option>
										<option>General Inquiry</option>
										<option>Support</option>
										<option>Partnership Opportunity</option>
									</select>
									{errors.subject && (
										<p className="text-red-600 text-sm">
											Subject is required.
										</p>
									)}
								</div>
								<div>
									<Textarea
										placeholder="Tell us about your project or inquiry..."
										rows={4}
										{...register("message", { required: true })}
									/>
									{errors.message && (
										<p className="text-red-600 text-sm">
											Message is required.
										</p>
									)}
								</div>
								<label className="flex items-center space-x-2 text-sm">
									<input
										type="checkbox"
										className="form-checkbox"
										{...register("consent", { required: true })}
									/>
									<span>
										I consent to R-Tech Machine and Tools
										collecting and storing my data to respond to my
										inquiry.
									</span>
								</label>
								{errors.consent && (
									<p className="text-red-600 text-sm">
										Consent is required.
									</p>
								)}
								{attachments.length > 0 && (
  <div className="flex flex-col gap-2 mt-3">
    {attachments.map((att, idx) => (
      <div key={idx} className="flex items-center gap-2 text-sm text-blue-800">
        <span>{getFileIcon(att.name)}</span>
        <span className="text-gray-700">Attached:</span>
        <a
          href={att.previewURL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          {att.name}
        </a>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => {
            setAttachments(prev => prev.filter((_, i) => i !== idx));
          }}
        >
          ×
        </button>
      </div>
    ))}
  </div>
)}
								<div className="flex justify-start">
									<Button
										type="submit"
										className="bg-black text-white rounded-full text-sm px-5 py-1.5"
									>
										Submit Message
									</Button>
									<label className="cursor-pointer inline-flex items-center bg-gray-400 text-black font-semibold px-6 py-2 rounded-full ml-2 transition duration-200 hover:bg-gray-500 hover:text-white">
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
											<path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 5v12" />
										</svg>
										Upload
										<input
											type="file"
											className="hidden"
											multiple
											onChange={(e) => {
											const files = Array.from(e.target.files);
											const mapped = files.map(file => ({
												name: file.name,
												file,
												previewURL: URL.createObjectURL(file)
											}));
											setAttachments(prev => [...prev, ...mapped]);
											}}
										/>
										</label>
								</div>
							</form>
						</CardContent>
					</motion.div>

					<motion.div
						className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<CardContent className="space-y-6 p-6">
							<h2 className="text-xl font-bold text-blue-900">
								Contact Information
							</h2>
							<div className="flex items-start gap-3">
								<div className="bg-blue-50 rounded-full p-2">
									<MapPin className="text-blue-600" size={20} />
								</div>
								<div>
									<p className="font-semibold">Address</p>
									<p>
										PLOT NO. B-33, UDYOG KENDRA-I, ECOTECH-III,
										GREATER NOIDA, GAUTAM BUDHNAGAR, UP, INDIA -
										201308
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="bg-blue-50 rounded-full p-2">
									<Phone className="text-blue-600" size={20} />
								</div>
								<div>
									<p className="font-semibold">Phone</p>
									<p>+91 9910202531</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="bg-blue-50 rounded-full p-2">
									<Mail className="text-blue-600" size={20} />
								</div>
								<div>
									<p className="font-semibold">Email</p>
									<p>dpdinkarrmt@gmail.com</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="bg-blue-50 rounded-full p-2">
									<Clock className="text-blue-600" size={20} />
								</div>
								<div>
									<p className="font-semibold">Business Hours</p>
									<p>
										Monday - Friday: 9:00 AM - 6:00 PM
										<br />
										Saturday - Sunday: Closed
									</p>
								</div>
							</div>
							<div className="flex gap-4 pt-2">
								<X className="text-black" />
								<Linkedin className="text-black" />
							</div>
						</CardContent>
						<iframe
							className="w-full h-64 rounded-b-md"
							src="https://maps.google.com/maps?q=Engaging%20Digital%20Solutions&t=&z=15&ie=UTF8&iwloc=&output=embed"
							loading="lazy"
							allowFullScreen
						></iframe>
					</motion.div>
				</div>

				<motion.div
					className="bg-blue-50 rounded-xl p-6 space-y-4 text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
				>
					<h2 className="text-xl font-semibold text-blue-800">
						We work on Trusts, Trusts Build Business Start your Journey with Us
						Today!
					</h2>
					<p className="text-gray-600 max-w-xl mx-auto">
						Let’s work together to create engaging experiences that drive results
						for your business. Schedule a consultation with our team today.
					</p>
					<div className="flex justify-center space-x-4">
						<Link
							to="/services"
							className="bg-blue-700 text-white px-4 py-2 rounded-full inline-block text-center transition
    hover:bg-blue-800 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							Explore Our Services
						</Link>
						<Link
							to="/"
							className="border border-blue-700 text-blue-700 px-4 py-2 rounded-full inline-block text-center transition
    hover:bg-blue-700 hover:text-white hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							Back to Home
						</Link>
					</div>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-4 bg-gray-50">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="bg-white text-center py-6 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<div className="flex justify-center mb-4">
								<div className="rounded-full bg-blue-100 p-4 flex items-center justify-center">
									{feature.icon}
								</div>
							</div>
							<CardContent>
								<h3 className="text-lg font-bold text-blue-700 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									{feature.description}
								</p>
							</CardContent>
						</motion.div>
					))}
				</div>
			</section>

			{/* Footer */}
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
		</div>
	);
}

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ContactUsPage from './pages/ContactUsPage';
// import TestimonialPage from './pages/TestimonialPage';
// import ServicesPage from './pages/ServicePage';
// import Aboutspage from './pages/AboutUs';
// import RTechMainPage from './pages/R-techMainPage';
// import ScrollToTop from './components/ScrollToTop';

// import SignPage from './pages/Admin/SignIn';
// import SignupPage from './pages/Admin/SignUp';
// import Dashboard from './pages/Admin/Dashboard';
// import AuthCallback from './pages/Admin/AuthCallback';
// import PrivateRoute from './components/PrivateRoute'; // ✅ new import

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<RTechMainPage />} />
//         <Route path="/about" element={<Aboutspage />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/testimonial" element={<TestimonialPage />} />
//         <Route path="/contact" element={<ContactUsPage />} />
//         <Route path="/Admin/SignIn" element={<SignPage />} />
//         <Route path="/Admin/SignUp" element={<SignupPage />} />
        
//         {/* 🔐 Protected Dashboard Route */}
//         <Route 
//           path="/login/Admin/Dashboard" 
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           } 
//         />

//         <Route path="/auth/callback" element={<AuthCallback />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import ContactUsPage from './pages/ContactUsPage';
// import TestimonialPage from './pages/TestimonialPage';
// import ServicesPage from './pages/ServicePage';
// import Aboutspage from './pages/AboutUs';
// import RTechMainPage from './pages/R-techMainPage';
// import ScrollToTop from './components/ScrollToTop';

// import SignPage from './pages/Admin/SignIn';
// import SignupPage from './pages/Admin/SignUp';
// import Dashboard from './pages/Admin/Dashboard';
// import AuthCallback from './pages/Admin/AuthCallback';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<RTechMainPage />} />
//         <Route path="/about" element={<Aboutspage />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/testimonial" element={<TestimonialPage />} />
//         <Route path="/contact" element={<ContactUsPage />} />

//         {/* Admin/Auth Pages */}
//         <Route path="/Admin/SignIn" element={<SignPage />} />
//         <Route path="/Admin/SignUp" element={<SignupPage />} />
//         <Route path="/login/Admin/AuthCallback" element={<AuthCallback />} />
//         <Route path="/auth/callback" element={<AuthCallback />} />


//         {/* Optional: Redirect /login → /login/admin/signin */}
//         <Route path="/login" element={<Navigate to="/login/Admin/SignUp" replace />} />

//         {/* Protected Route */}
//         <Route
//           path="/login/Admin/Dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import ContactUsPage from './pages/ContactUsPage';
// import TestimonialPage from './pages/TestimonialPage';
// import ServicesPage from './pages/ServicePage';
// import Aboutspage from './pages/AboutUs';
// import RTechMainPage from './pages/R-techMainPage';
// import ScrollToTop from './components/ScrollToTop';

// import SignPage from './pages/Admin/SignIn';
// import SignupPage from './pages/Admin/SignUp';
// import Dashboard from './pages/Admin/Dashboard';
// import AuthCallback from './pages/Admin/AuthCallback';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<RTechMainPage />} />
//         <Route path="/about" element={<Aboutspage />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/testimonial" element={<TestimonialPage />} />
//         <Route path="/contact" element={<ContactUsPage />} />

//         {/* Admin Auth */}
//         <Route path="/admin/signin" element={<SignPage />} />
//         <Route path="/admin/signup" element={<SignupPage />} />
//         <Route path="/auth/callback" element={<AuthCallback />} />

//         {/* Protected Dashboard */}
//         <Route path="/admin/dashboard" element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         } />

//         {/* Optional Redirect */}
//         <Route path="/login" element={<Navigate to="/admin/signin" replace />} />
//         <Route path="/login" element={<Navigate to="/login/Admin/SignUp" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ContactUsPage from './pages/ContactUsPage';
import TestimonialPage from './pages/TestimonialPage';
import ServicesPage from './pages/ServicePage';
import Aboutspage from './pages/AboutUs';
import RTechMainPage from './pages/R-techMainPage';
import ScrollToTop from './components/ScrollToTop';

import SignPage from './pages/Admin/SignIn';
import SignupPage from './pages/Admin/SignUp';
import Dashboard from './pages/Admin/Dashboard';
import AuthCallback from './pages/Admin/AuthCallback';
import PrivateRoute from './components/PrivateRoute';

import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<RTechMainPage />} />
        <Route path="/about" element={<Aboutspage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* Admin Auth Pages */}
        <Route path="/admin/signin" element={<SignPage />} />
        <Route path="/admin/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/messages" element={<Messages />} />

        {/* Protected Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Optional Redirect */}
        <Route path="/login" element={<Navigate to="/admin/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

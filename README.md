# R-Tech Machine & Tools - Corporate Website

A modern, responsive corporate website for R-Tech Machine & Tools, a precision mechanical engineering company. Built with React, Node.js, and MongoDB, featuring admin authentication, real-time featu## 👨‍💻 Developer

**Tarun Dinkar**
- Full-stack development with React and Node.js
- MongoDB database design and implementation
- Google OAuth authentication integration
- Responsive UI/UX design with Tailwind CSS
- RESTful API development and testing

---

### 📞 Contact

For technical inquiries about this project:
- Email: dinkartarun00@gmial.com
- LinkedIn: [\[Your LinkedIn Profile\]](https://www.linkedin.com/in/tarun-dinkar-14a5ba252/)


**Technologies Demonstrated**: React, Node.js, MongoDB, Express.js, JWT, OAuth 2.0, Socket.io, Tailwind CSS, Framer Motion, Vite, RESTful APIs, Responsive Design, Authentication Systems, Database Design

---

## 📝 Copyright

© 2025 **Tarun Dinkar**. All rights reserved.

This project is developed by Tarun Dinkar as a demonstration of full-stack web development capabilities using modern technologies including React, Node.js, and MongoDB.ssional design.

## 🚀 Features

### Frontend
- **Modern React App** with Vite for fast development
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **Multi-page Navigation** with React Router
- **Admin Authentication** with Google OAuth integration
- **Contact Forms** with validation
- **Testimonials System** 
- **Services Showcase**
- **Mobile-First Design**

### Backend
- **Express.js REST API** with MongoDB integration
- **JWT Authentication** with secure token management
- **Google OAuth 2.0** integration
- **Real-time Communication** with Socket.io
- **CORS Configuration** for cross-origin requests
- **Environment Configuration** with dotenv
- **Data Validation** and error handling

### Database
- **MongoDB Atlas** cloud database
- **User Management** with encrypted passwords
- **Admin Dashboard** data storage
- **Contact Form** submissions handling

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Google OAuth 2.0
- Socket.io
- bcryptjs

**Tools & Services:**
- Firebase Authentication
- MongoDB Atlas
- Vercel/Netlify (deployment ready)
- ESLint for code quality

## 📁 Project Structure

```
R-tech website/
├── frontend/r-tech-app/          # React frontend
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/               # Page components
│   │   │   ├── Admin/           # Admin authentication pages
│   │   │   ├── R-techMainPage.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── ServicePage.jsx
│   │   │   └── TestimonialPage.jsx
│   │   ├── firebase/            # Firebase configuration
│   │   ├── assets/              # Static assets
│   │   └── App.jsx             # Main app component
│   ├── public/                  # Public assets
│   └── package.json
├── backend/                     # Node.js backend
│   ├── routes/                  # API routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── protected.js        # Protected routes
│   │   └── dashboard.js        # Dashboard routes
│   ├── models/                 # MongoDB models
│   ├── middleware/             # Custom middleware
│   ├── server.js              # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Google OAuth credentials
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/r-tech-website.git
   cd r-tech-website
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   echo "MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret" > .env
   
   # Start backend server
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend/r-tech-app
   npm install
   
   # Create .env file
   echo "VITE_API_BASE_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain" > .env
   
   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🔐 Authentication Flow

- **Public Access**: Company information, services, testimonials
- **Admin Authentication**: Google OAuth integration
- **Protected Routes**: Admin dashboard, user management
- **JWT Tokens**: Secure session management

## 📱 Key Pages

1. **Home Page**: Company overview with modern animations
2. **About Us**: Company history and team information
3. **Services**: Tooling, automation, and design services
4. **Testimonials**: Client feedback and reviews
5. **Contact**: Contact form with validation
6. **Admin Dashboard**: Protected admin panel
7. **Authentication**: Sign in/Sign up pages

## 🎨 Design Features

- **Professional Color Scheme**: Blue and white corporate theme
- **Responsive Layout**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Page transitions and hover effects
- **Modern Typography**: Clean, readable font choices
- **Interactive Elements**: Buttons, forms, and navigation

## 🔧 API Endpoints

```
Authentication:
POST /auth/register        # User registration
POST /auth/login          # User login
POST /auth/google         # Google OAuth login
GET  /auth/profile        # Get user profile
GET  /auth/logout         # User logout

Protected Routes:
GET  /api/dashboard       # Dashboard data
GET  /api/users          # User management
POST /api/contact        # Contact form submission

Health Check:
GET  /                   # Server status
GET  /healthz           # Database connectivity
```

## 📈 Performance Features

- **Code Splitting**: Lazy loading for optimal performance
- **Image Optimization**: Responsive images with proper sizing
- **Caching**: Browser caching for static assets
- **Minification**: Production build optimization
- **Bundle Analysis**: Webpack bundle optimization

## 🚀 Deployment

**Frontend (Vercel/Netlify):**
```bash
npm run build
# Deploy dist/ folder
```

**Backend (Heroku/Railway):**
```bash
# Set environment variables
# Deploy with git or container
```

## 🧪 Testing

```bash
# Frontend testing
cd frontend/r-tech-app
npm run test

# Backend testing
cd backend
npm run test
```

## 📊 Project Metrics

- **Component Count**: 15+ reusable components
- **Page Count**: 7 main pages
- **API Endpoints**: 10+ RESTful endpoints
- **Authentication**: Google OAuth + JWT
- **Database**: MongoDB with 5+ collections
- **Responsive Breakpoints**: 4 device sizes

## 🎯 Business Impact

- **Professional Web Presence**: Modern corporate website
- **Lead Generation**: Contact forms and service inquiries
- **Admin Management**: Secure content management system
- **Mobile Accessibility**: Cross-device compatibility
- **SEO Optimization**: Search engine friendly structure

## 🔮 Future Enhancements

- [ ] Payment integration for services
- [ ] Live chat functionality
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Email newsletter system
- [ ] Service booking system

## 👨‍💻 Developer

**[Your Name]**
- Full-stack development with React and Node.js
- MongoDB database design and implementation
- Google OAuth authentication integration
- Responsive UI/UX design with Tailwind CSS
- RESTful API development and testing

---

### 📞 Contact

For technical inquiries about this project:
- Email: dinkartarun00@gmial.com
- LinkedIn: [\[Your LinkedIn Profile\]](https://www.linkedin.com/in/tarun-dinkar-14a5ba252/)

**Technologies Demonstrated**: React, Node.js, MongoDB, Express.js, JWT, OAuth 2.0, Socket.io, Tailwind CSS, Framer Motion, Vite, RESTful APIs, Responsive Design, Authentication Systems, Database Design

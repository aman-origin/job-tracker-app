import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../utils/auth';

function HomePage() {
  const isAuthenticated = auth.isAuthenticated();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '📝',
      title: 'Track Applications',
      description:
        'Log every job application with company name, role, status, and application date in one organized place.',
    },
    {
      icon: '📊',
      title: 'Visual Dashboard',
      description:
        "Get a bird's-eye view of your job search with status breakdowns and progress tracking.",
    },
    {
      icon: '🔄',
      title: 'Status Management',
      description:
        'Update application stages from Applied → Interview → Offer → Rejected with a single click.',
    },
    {
      icon: '📌',
      title: 'Notes & Details',
      description:
        'Attach notes to each application — interview prep, recruiter contacts, and key deadlines.',
    },
    {
      icon: '🔍',
      title: 'Search & Filter',
      description:
        'Quickly find applications by company, role, or status with built-in search and filtering.',
    },
    {
      icon: '🔐',
      title: 'Secure & Private',
      description:
        'JWT-based authentication with Spring Security ensures your data stays private and secure.',
    },
  ];

  const techStack = [
    { name: 'React', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Spring Boot', color: 'bg-green-100 text-green-700' },
    { name: 'Spring Security', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'JWT Auth', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'PostgreSQL', color: 'bg-blue-100 text-blue-700' },
    { name: 'JPA/Hibernate', color: 'bg-orange-100 text-orange-700' },
    { name: 'Tailwind CSS', color: 'bg-sky-100 text-sky-700' },
    { name: 'REST API', color: 'bg-purple-100 text-purple-700' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description:
        'Sign up with email and password. Your data is secured with Spring Security & JWT.',
      icon: '👤',
    },
    {
      step: '02',
      title: 'Log Applications',
      description:
        'Add job applications with company, role, status, date, and personal notes.',
      icon: '✏️',
    },
    {
      step: '03',
      title: 'Track & Organize',
      description:
        'Monitor all applications from your dashboard. Filter, update, and stay on top.',
      icon: '🎯',
    },
  ];

  const technicalHighlights = [
    {
      title: 'RESTful API with Spring Boot',
      desc: 'Clean REST endpoints using @RestController with proper HTTP methods, status codes, exception handling, and DTO pattern.',
      icon: '🛠️',
    },
    {
      title: 'Spring Security + JWT',
      desc: 'Stateless authentication using JWT tokens, BCrypt password encoding, and custom security filter chain.',
      icon: '🔒',
    },
    {
      title: 'React SPA Frontend',
      desc: 'Component-based architecture with React Router, Axios interceptors for auth, and responsive Tailwind CSS design.',
      icon: '💻',
    },
    {
      title: 'JPA/Hibernate + PostgreSQL',
      desc: 'Entity relationships with proper annotations, repository pattern, and optimized database queries.',
      icon: '🗄️',
    },
  ];

  const keyHighlights = [
    { icon: '⚡', label: 'RESTful API', sub: 'Full CRUD Operations' },
    { icon: '🔐', label: 'Spring Security', sub: 'JWT Authentication' },
    { icon: '📱', label: 'Responsive', sub: 'Works on All Devices' },
    { icon: '🎨', label: 'Modern UI', sub: 'Tailwind CSS Styling' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ─── Hero Section ─── */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-50 rounded-full opacity-30 blur-3xl" />
        </div>

        <div
          className={`text-center max-w-4xl relative z-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Project Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Full-Stack Spring Boot + React Application
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Job Application{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Tracker
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            A full-stack web application to organize and monitor your job search.
            Track applications, manage statuses, and never lose sight of an
            opportunity.
          </p>

          {/* CTA Buttons */}
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
            >
              Go to Dashboard
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
              >
                Get Started
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-lg font-semibold px-8 py-4 rounded-xl border border-gray-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
              Built With
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tech.color} transition-transform duration-200 hover:scale-105 cursor-default`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Key Highlights ─── */}
      <section className="py-16 px-4 border-y border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {keyHighlights.map((item, index) => (
            <div key={index} className="group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <div className="font-bold text-gray-900">{item.label}</div>
              <div className="text-gray-400 text-sm">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful <span className="text-green-600">Features</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need to manage your job search workflow efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It <span className="text-green-600">Works</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Simple, intuitive, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-green-200 to-blue-200" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-2xl rounded-2xl mb-4 relative z-10">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-green-600 mb-1">
                  STEP {item.step}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technical Highlights (Resume-worthy) ─── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical <span className="text-green-600">Highlights</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Key engineering decisions and architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalHighlights.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-md"
              >
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Architecture Overview ─── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              System <span className="text-green-600">Architecture</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Clean separation of concerns with modern best practices.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Frontend */}
              <div className="p-6 bg-cyan-50 rounded-xl border border-cyan-100">
                <div className="text-3xl mb-3">⚛️</div>
                <h3 className="font-bold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>React 19</li>
                  <li>React Router DOM</li>
                  <li>Axios</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="text-3xl mb-3">🍃</div>
                <h3 className="font-bold text-gray-900 mb-2">Backend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Spring Boot 3</li>
                  <li>Spring Security</li>
                  <li>Spring Data JPA</li>
                  <li>JWT (jjwt)</li>
                </ul>
              </div>

              {/* Database */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-3xl mb-3">🗄️</div>
                <h3 className="font-bold text-gray-900 mb-2">Database</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>PostgreSQL</li>
                  <li>Hibernate ORM</li>
                  <li>Entity Relationships</li>
                  <li>Data Validation</li>
                </ul>
              </div>
            </div>

            {/* Flow arrows */}
            <div className="hidden md:flex justify-center items-center mt-8 text-gray-400">
              <span className="text-sm">React</span>
              <svg
                className="w-8 h-8 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                REST API
              </span>
              <svg
                className="w-8 h-8 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <span className="text-sm">Spring Boot</span>
              <svg
                className="w-8 h-8 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <span className="text-sm">PostgreSQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      {!isAuthenticated && (
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 shadow-2xl shadow-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to organize your job search?
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
                Create your free account and start tracking applications today.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                Create Free Account
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}



      {/* ─── Footer ─── */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Job Application Tracker — Full-Stack
            Spring Boot + React Project
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aman-origin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/aman-in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
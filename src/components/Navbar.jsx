import "../styles/navbar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: "home", label: "Home", icon: "◆" },
    { id: "about", label: "About", icon: "◇" },
    { id: "skills", label: "Skills", icon: "◆" },
    { id: "projects", label: "Projects", icon: "◇" },
    { id: "experience", label: "Experience", icon: "◆" },
    { id: "education", label: "Education", icon: "◇" },
    { id: "blogs", label: "Blogs", icon: "◆", isRoute: true },
    { id: "contacts", label: "Contacts", icon: "◇" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }

      if (currentScrollY < 50) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Only track sections on home page
      if (location.pathname === '/' || location.pathname === '/home') {
        const sections = navItems.filter(item => !item.isRoute).map((item) => item.id);
        let current = "home";

        for (let section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              current = section;
            }
          }
        }

        setActiveSection(current);
      } else if (location.pathname === '/blogs') {
        setActiveSection('blogs');
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, location]);

  const handleNavClick = (item) => {
    if (item.isRoute) {
      // Navigate to route
      navigate(`/${item.id}`);
      setActiveSection(item.id);
    } else {
      // Scroll to section on home page
      if (location.pathname !== '/' && location.pathname !== '/home') {
        // First navigate to home, then scroll
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.id);
        }, 100);
      } else {
        scrollToSection(item.id);
      }
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${visible ? "" : "navbar-hidden"}`}
      >
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={() => handleNavClick({ id: 'home' })}>
            <div className="logo-symbol">
              <span className="logo-letter">D</span>
              <span className="logo-dot"></span>
            </div>
            <div className="logo-text">
              <span className="logo-name">DEVYANSH</span>
              <span className="logo-subtitle">GROVER</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-underline"></span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              const email = "devyansh.grover348@gmail.com";
              const subject = "Let's Collaborate!";
              const body =
                "Hi Devyansh, I'd like to discuss a project with you.";
              const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
                subject,
              )}&body=${encodeURIComponent(body)}`;
              window.open(mailtoUrl, "_blank");
            }}
            className="navbar-cta"
          >
            <span>Let's Talk</span>
            <div className="cta-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 15L15 1M15 1H5M15 1V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-line line-1"></span>
            <span className="menu-line line-2"></span>
            <span className="menu-line line-3"></span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="scroll-progress-bar">
          <div
            className="scroll-progress-fill"
            style={{
              width: `${
                (window.pageYOffset /
                  (document.documentElement.scrollHeight -
                    window.innerHeight)) *
                100
              }%`,
            }}
          ></div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <span className="mobile-logo-letter">D</span>
              <span className="mobile-logo-text">DEVYANSH GROVER</span>
            </div>
          </div>

          <nav className="mobile-nav-links">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`mobile-nav-link ${
                  activeSection === item.id ? "active" : ""
                }`}
                style={{
                  animationDelay: mobileMenuOpen ? `${index * 0.05}s` : "0s",
                }}
              >
                <span className="mobile-nav-number">0{index + 1}</span>
                <span className="mobile-nav-label">{item.label}</span>
                <span className="mobile-nav-icon">{item.icon}</span>
              </button>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <button
              onClick={() => {
                const email = "devyansh.grover348@gmail.com";
                const subject = "Let's Collaborate!";
                const body =
                  "Hi Devyansh, I'd like to discuss a project with you.";
                const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
                  subject,
                )}&body=${encodeURIComponent(body)}`;
                window.open(mailtoUrl, "_blank");
                setMobileMenuOpen(false);
              }}
              className="mobile-cta-button"
            >
              Let's Talk →
            </button>

            <div className="mobile-social-links">
              <a
                href="mailto:devyansh.grover348@gmail.com"
                className="mobile-social-link"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/devyanshgrover/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/DevyanshGrover18"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mobile-menu-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-line"></div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
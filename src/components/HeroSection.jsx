import { useState, useEffect } from "react";
import '../styles/heroSection.css';

const HeroSection = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    "Front-End Development",
    "Back-end Development", 
    "Full-Stack Development",
  ];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  // Typing effect
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    let i = loopNum % titles.length;
    let fullText = titles[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(200);
    } else {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(300);
    }
  };

  const sendEmail = () => {
    const email = "devyansh.grover348@gmail.com";
    const subject = "Hello Devyansh";
    const body = "I want to contact you";

    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoUrl, "_blank");
  };

  const scrollDown = (id) => {
    let element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="home" className="hero-container">
      {/* Main Content */}
      <div className="hero-content">
        {/* Left Side - Vertical Text & Social */}
        <div className="hero-sidebar">
          <div className="vertical-text">PORTFOLIO 2026</div>
          
          <div className="social-links">
            <a onClick={sendEmail} className="social-link" title="Email">
              <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/devyanshgrover/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/DevyanshGrover18" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Center - Main Content */}
        <div className="hero-main">
          {/* Status Badge */}
          {/* <div className="status-badge">
            <span className="status-dot"></span>
            Available for work
          </div> */}

          {/* Main Heading */}
          <h1 className="hero-heading">
            <span className="heading-line heading-name">
              <span className="text-reveal">DEVYANSH GROVER</span>
            </span>
            <span className="heading-line">
              <span className="text-reveal">Developer</span>
            </span>
          </h1>

          {/* Typing Text */}
          <div className="typing-wrapper">
            <span className="typing-label">Specializing in</span>
            <div className="typing-box">
              <span className="typing-output">{text}</span>
              <span className="cursor-blink">|</span>
            </div>
          </div>

          {/* Description */}
          <p className="hero-description">
            Crafting digital experiences that blend cutting-edge technology 
            with thoughtful design. I build web applications that users love 
            and businesses depend on.
          </p>

          {/* CTA Buttons */}
          <div className="cta-group">
            <button onClick={sendEmail} className="btn-primary">
              <span>Start a Project</span>
              <div className="btn-arrow">→</div>
            </button>
            <button onClick={()=>scrollDown("projects")} className="btn-secondary">
              <span>View Work</span>
            </button>
          </div>
        </div>

        {/* Right Side - 3D Rotating Image */}
        <div className="hero-image-section">
          <div className="image-wrapper">
            <div className="image-frame">
              <img 
                src="https://res.cloudinary.com/drc2tmpf1/image/upload/pfpbw2_mab1oq.jpg" 
                alt="Devyansh Grover"
                className="profile-image"
              />
              <div className="image-overlay"></div>
            </div>
            
            {/* Floating Labels */}
            <div className="floating-label label-1">
              <span className="label-icon">⚡</span>
              <span>Fast & Efficient</span>
            </div>
            <div className="floating-label label-2">
              <span className="label-icon">🎨</span>
              <span>Design Focused</span>
            </div>
            <div className="floating-label label-3">
              <span className="label-icon">🚀</span>
              <span>Innovation Driven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator-modern" onClick={()=> scrollDown('about')}>
        <div className="scroll-line"></div>
        <div className="scroll-text-bottom">SCROLL</div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="corner-decoration corner-top-left"></div>
      <div className="corner-decoration corner-bottom-right"></div>
    </div>
  );
};

export default HeroSection;
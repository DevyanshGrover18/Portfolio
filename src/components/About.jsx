import "../styles/about.css";
import { useState, useEffect, useRef } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const [showGif, setShowGif] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const tabs = [
    { id: "story", label: "My Story", icon: "📖" },
    { id: "passion", label: "Passion", icon: "💡" },
    { id: "approach", label: "Approach", icon: "🎯" },
  ];

  const highlights = [
    {
      number: "04+",
      label: "Core Technologies",
      description: "React • Node • Firebase • AI APIs",
    },
    {
      number: "50+",
      label: "RESTful APIs created",
      description: "Smooth Backend Integeration",
    },
    {
      number: "1000+",
      label: "Hours of Clean Code",
      description: "Modular, documented, production-style",
    },
    {
      number: "24/7",
      label: "Commitment",
      description: "Dedicated to excellence",
    },
  ];

  const expertise = [
    { skill: "React.js", level: 95 },
    { skill: "Node.js & Express", level: 90 },
    { skill: "UI/UX Design", level: 85 },
    { skill: "Database Design", level: 88 },
    { skill: "RESTful APIs", level: 92 },
  ];

  const interests = [
    { icon: "💻", title: "Code", desc: "Clean & Scalable" },
    { icon: "🎨", title: "Design", desc: "Beautiful UIs" },
    { icon: "🚀", title: "Innovation", desc: "Latest Tech" },
    { icon: "📚", title: "Learning", desc: "Never Stop" },
    { icon: "🤝", title: "Collaboration", desc: "Team Player" },
    { icon: "⚡", title: "Performance", desc: "Optimized" },
  ];

  return (
    <section
      id="about"
      className={`about-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">Get to know me</span>
          </div>
          <h2 className="section-title">
            <span className="title-line">About</span>
            <span className="title-line title-highlight">Me</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="about-content-grid">
          {/* Left Column - Profile & Tabs */}
          <div className="about-left-column">
            {/* Profile Card */}
            <div className="profile-showcase">
              <div className="profile-image-wrapper">
                <div className="profile-image-border">
                  {!showGif && (
                    <div
                      className="profile-loader-animation"
                      onAnimationEnd={() => setShowGif(true)}
                    />
                  )}

                  {showGif && (
                    <img
                      src="https://res.cloudinary.com/drc2tmpf1/image/upload/v1770385586/Visual_data_hwwt2z.gif"
                      alt="Devyansh Grover"
                      className="profile-showcase-img"
                    />
                  )}

                  <div className="profile-overlay-gradient"></div>
                </div>
                <div className="profile-status-badge">
                  <span className="status-pulse"></span>
                  Available for Projects
                </div>
              </div>

              <div className="profile-info-card">
                <h3 className="profile-name">Devyansh Grover</h3>
                <p className="profile-role">Full-Stack Developer</p>
                <div className="profile-location">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>India</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats-grid">
              {highlights.map((item, index) => (
                <div
                  className="stat-card"
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-number">{item.number}</div>
                  <div className="stat-label">{item.label}</div>
                  <div className="stat-description">{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Story & Details */}
          <div className="about-right-column">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                  <span className="tab-indicator"></span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "story" && (
                <div className="tab-panel story-panel">
                  <h3 className="panel-title">Building Digital Excellence</h3>
                  <p className="panel-text">
                    I'm a passionate full-stack developer who believes that
                    great software is born from the intersection of elegant
                    code, thoughtful design, and genuine care for the user
                    experience.
                  </p>
                  <p className="panel-text">
                    My journey into web development started with a curiosity
                    about how things work on the internet. That curiosity
                    evolved into a deep passion for creating digital experiences
                    that not only function flawlessly but also delight users at
                    every interaction.
                  </p>
                  <p className="panel-text">
                    Over the years, I've had the privilege of working on diverse
                    projects ranging from sleek landing pages to complex web
                    applications, each one teaching me something new and pushing
                    me to grow as a developer.
                  </p>

                  {/* Expertise Bars */}
                  <div className="expertise-section">
                    <h4 className="expertise-title">Core Expertise</h4>
                    <div className="expertise-bars">
                      {expertise.map((item, index) => (
                        <div
                          className="expertise-item"
                          key={index}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="expertise-header">
                            <span className="expertise-skill">
                              {item.skill}
                            </span>
                            <span className="expertise-level">
                              {item.level}%
                            </span>
                          </div>
                          <div className="expertise-bar-bg">
                            <div
                              className="expertise-bar-fill"
                              style={{ width: `${item.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "passion" && (
                <div className="tab-panel passion-panel">
                  <h3 className="panel-title">What Drives Me</h3>
                  <p className="panel-text">
                    I'm deeply passionate about creating web experiences that
                    make a difference. For me, development isn't just about
                    writing code—it's about solving real problems and making
                    people's lives easier through technology.
                  </p>
                  <p className="panel-text">
                    I thrive on challenges that push me to think creatively and
                    learn new technologies. Whether it's optimizing performance,
                    crafting beautiful animations, or architecting scalable
                    systems, I approach each task with enthusiasm and
                    dedication.
                  </p>

                  {/* Interests Grid */}
                  <div className="interests-grid">
                    {interests.map((interest, index) => (
                      <div
                        className="interest-card"
                        key={index}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="interest-icon">{interest.icon}</div>
                        <div className="interest-title">{interest.title}</div>
                        <div className="interest-desc">{interest.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "approach" && (
                <div className="tab-panel approach-panel">
                  <h3 className="panel-title">My Development Philosophy</h3>
                  <p className="panel-text">
                    I believe in a user-first approach to development. Every
                    line of code I write, every design decision I make, is
                    guided by one question: "Does this serve the user's needs?"
                  </p>

                  <div className="approach-principles">
                    <div className="principle-card">
                      <div className="principle-number">01</div>
                      <div className="principle-content">
                        <h4 className="principle-title">Clean Code</h4>
                        <p className="principle-desc">
                          Writing maintainable, well-documented code that others
                          can easily understand and build upon.
                        </p>
                      </div>
                    </div>

                    <div className="principle-card">
                      <div className="principle-number">02</div>
                      <div className="principle-content">
                        <h4 className="principle-title">User Experience</h4>
                        <p className="principle-desc">
                          Prioritizing intuitive interfaces and smooth
                          interactions that users genuinely enjoy.
                        </p>
                      </div>
                    </div>

                    <div className="principle-card">
                      <div className="principle-number">03</div>
                      <div className="principle-content">
                        <h4 className="principle-title">Continuous Learning</h4>
                        <p className="principle-desc">
                          Staying updated with the latest technologies and best
                          practices in the ever-evolving web landscape.
                        </p>
                      </div>
                    </div>

                    <div className="principle-card">
                      <div className="principle-number">04</div>
                      <div className="principle-content">
                        <h4 className="principle-title">Collaboration</h4>
                        <p className="principle-desc">
                          Working closely with designers, stakeholders, and
                          fellow developers to achieve shared goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="about-cta-section">
          <div className="cta-card">
            <div className="cta-content">
              <h3 className="cta-title">Let's Create Something Amazing</h3>
              <p className="cta-description">
                Have a project in mind? Let's discuss how we can work together
                to bring your ideas to life.
              </p>
            </div>
            <button
              onClick={() => {
                const email = "devyansh.grover348@gmail.com";
                const subject = "Project Inquiry";
                const body =
                  "Hi Devyansh, I'd love to discuss a project with you.";
                const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
                  subject,
                )}&body=${encodeURIComponent(body)}`;
                window.open(mailtoUrl, "_blank");
              }}
              className="cta-button-main"
            >
              <span>Get In Touch</span>
              <div className="cta-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

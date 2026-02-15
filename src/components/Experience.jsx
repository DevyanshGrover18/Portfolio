import { useState, useEffect, useRef } from "react";
import "../styles/experience.css";
import iconsSvgList from "../utils/iconsSvgList";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const experience = {
    id: 1,
    jobTitle: "React Developer",
    company: "Founders Cart Pvt. Ltd",
    companyUrl: "https://www.linkedin.com/company/founderscart/",
    location: "Remote",
    startDate: "Jun 2023",
    endDate: "Jan 2024",
    description: "Led development of scalable web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality solutions that improved user experience and business metrics.",
    achievements: [
      "Developed and deployed 5+ full-stack web applications using React and Node.js",
      "Improved application performance by 40% through code optimization and best practices",
      "Mentored junior developers and conducted code reviews to maintain code quality",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ],
    techStack: ["react", "nodejs", "mongodb", "express", "redux", "api"]
  };

  const getTechIcon = (tech) => {
    
    return iconsSvgList[tech] || null;
  };

  return (
    <section
      id="experience"
      className={`experience-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="experience-container">
        {/* Section Header */}
        <div className="experience-header">
          <div className="section-label-experience">
            <span className="label-line-experience"></span>
            <span className="label-text-experience">EXPERIENCE</span>
          </div>
          <h2 className="experience-title">
            <span className="title-part">Where I've </span>
            <span className="title-part title-gradient">Worked</span>
          </h2>
          <p className="experience-subtitle">
            Building real-world solutions and gaining hands-on expertise
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {/* Timeline Line */}
          <div className="timeline-line">
            <div className="timeline-progress"></div>
          </div>

          {/* Experience Item */}
          <div className="timeline-item">
            {/* Timeline Dot */}
            <div className="timeline-dot">
              <div className="dot-outer"></div>
              <div className="dot-inner"></div>
              <div className="dot-pulse"></div>
            </div>

            {/* Experience Card */}
            <div className="experience-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="header-left">
                  <h3 className="job-title">{experience.jobTitle}</h3>
                  <a 
                    href={experience.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="company-name"
                  >
                    {experience.company}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </a>
                </div>

                <div className="header-right">
                  <div className="duration-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                    </svg>
                    {experience.startDate} - {experience.endDate}
                  </div>
                  <div className="location-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {experience.location}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                <p className="experience-description">{experience.description}</p>

                <div className="achievements">
                  <h4 className="achievements-title">Key Achievements</h4>
                  <ul className="achievements-list">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="experience-tech-stack">
                  <h4 className="tech-stack-title">Technologies Used</h4>
                  <div className="tech-stack-grid">
                    {experience.techStack.map((tech, index) => (
                      <div key={index} className="tech-item">
                        <div className="tech-icon-exp">
                          {getTechIcon(tech)}
                        </div>
                        <span className="tech-name">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline End Marker */}
          <div className="timeline-end">
            <div className="end-dot"></div>
            <span className="end-text">Present</span>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Experience;
import { useState, useEffect, useRef } from "react";
import "../styles/education.css";

const Education = () => {
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

  const education = [
    {
      id: 1,
      degree: "B.Tech in Electronics and Communication",
      institution: "Guru Tegh Bahadur Institute of Technology",
      grade: "8.9 CGPA",
      duration: "2021 - 2025",
      status: "Completed",
      level: "Undergraduate"
    },
    {
      id: 2,
      degree: "Class XII",
      institution: "Ryan International School",
      grade: "95.20%",
      duration: "2020 - 2021",
      status: "Completed",
      level: "Senior Secondary"
    },
    {
      id: 3,
      degree: "Class X",
      institution: "Ryan International School",
      grade: "90.33%",
      duration: "2018 - 2019",
      status: "Completed",
      level: "Secondary"
    }
  ];

  return (
    <section
      id="education"
      className={`education-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header">
          <div className="section-label-education">
            <span className="label-line-education"></span>
            <span className="label-text-education">EDUCATION</span>
          </div>
          <h2 className="education-title">
            <span className="title-part">Academic </span>
            <span className="title-part title-gradient">Journey</span>
          </h2>
          <p className="education-subtitle">
            Building a strong foundation through continuous learning
          </p>
        </div>

        {/* Education Certificates Grid */}
        <div className="certificates-grid">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`certificate-card ${edu.id === 1 ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Decorative Border */}
              <div className="certificate-border">
                <div className="border-corner corner-tl"></div>
                <div className="border-corner corner-tr"></div>
                <div className="border-corner corner-bl"></div>
                <div className="border-corner corner-br"></div>
              </div>

              {/* Certificate Seal */}
              <div className="certificate-seal">
                <div className="seal-outer">
                  <div className="seal-inner">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                    </svg>
                  </div>
                </div>
                <div className="seal-ribbon"></div>
              </div>

              {/* Status Badge */}
              <div className={`status-badge ${edu.status.toLowerCase()}`}>
                {edu.status}
              </div>

              {/* Certificate Content */}
              <div className="certificate-content">
                {/* Level Label */}
                <div className="level-label">{edu.level}</div>

                {/* Degree Title */}
                <h3 className="degree-title">{edu.degree}</h3>

                {/* Institution Name */}
                <div className="institution-name">
                  <div className="institution-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                    </svg>
                  </div>
                  <span>{edu.institution}</span>
                </div>

                {/* Divider */}
                <div className="certificate-divider"></div>

                {/* Grade and Duration */}
                <div className="certificate-details">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Grade</span>
                      <span className="detail-value">{edu.grade}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 11H7v2h2v-2m4 0h-2v2h2v-2m4 0h-2v2h2v-2m2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V9h14v11z"/>
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{edu.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Line Pattern */}
                <div className="decorative-pattern">
                  <div className="pattern-line"></div>
                  <div className="pattern-dot"></div>
                  <div className="pattern-line"></div>
                </div>
              </div>

              {/* Watermark */}
              <div className="certificate-watermark">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Background Decorations */}
        <div className="education-decorations">
          <div className="floating-icon icon-1">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
          </div>
          <div className="floating-icon icon-2">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
          </div>
          <div className="floating-icon icon-3">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
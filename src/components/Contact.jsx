import { useState, useEffect, useRef } from "react";
import iconsSvgList from "../utils/iconsSvgList";
import "../styles/contact.css";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    type: "", // 'success', 'error', 'loading'
    message: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Sending message..." });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { error: "Unexpected server response" };

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "An error occurred. Please try again later.",
      });
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setFormStatus({ type: "", message: "" });
    }, 5000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/DevyanshGrover18",
      color: "#FFFFFF",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/devyanshgrover/",
      color: "#0A66C2",
    },
    {
      name: "Email",
      icon: "email",
      url: "https://mail.google.com/mail/u/0/?fs=1&to=devyansh.grover348@gmail.com&su=Let%27s+Collaborate!&body=Hi+Devyansh,+I%27d+like+to+discuss+a+project+with+you.&tf=cm",
      color: "#EA4335",
    },
    {
      name: "WhatsApp",
      icon: "whatsapp",
      url: "https://wa.me/8130340531",
      color: "#25D366",
    },
  ];

  const getSocialIcon = (iconName) => {
    return iconsSvgList[iconName] || null;
  };

  return (
    <section
      id="contacts"
      className={`scroll-mt-8 contact-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <div className="section-label-contact">
            <span className="label-line-contact"></span>
            <span className="label-text-contact">GET IN TOUCH</span>
          </div>
          <h2 className="contact-title">
            <span className="title-part">Let's Work </span>
            <span className="title-part title-gradient">Together</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind? Let's create something amazing together
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* Form Status Message */}
              {formStatus.message && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.type === "success" && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                  {formStatus.type === "error" && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                  )}
                  {formStatus.type === "loading" && (
                    <div className="loading-spinner"></div>
                  )}
                  <span>{formStatus.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={formStatus.type === "loading"}
              >
                <span>Send Message</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="contact-info">
            <div className="info-card">
              <h3 className="info-title">Connect With Me</h3>
              <p className="info-text">
                Feel free to reach out through any of these platforms. I'm
                always open to discussing new projects and opportunities.
              </p>

              <div className="contact-social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    style={{ "--social-color": social.color }}
                  >
                    <div className="contact-social-icon">
                      {getSocialIcon(social.icon)}
                    </div>
                    <span className="contact-social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="quick-info">
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">Faridabad, Haryana, India</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">
                    devyansh.grover348@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="contact-decorations">
          =<div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

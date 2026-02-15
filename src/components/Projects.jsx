import { useState, useEffect, useRef } from "react";
import "../styles/projects.css";
import iconsSvgList from "../utils/iconsSvgList";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Close modal when clicking outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Mera AI",
      description:
        "An AI chatbot that turn your website visitors into booked appointments 24×7 — without hiring staff.",
      category: "Full-Stack",
      image:
        "https://imgs.search.brave.com/yGiviN0IQcpW-YaA7ogeMQeeXsQRRjKu67lt34tf3dc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE3Lzc1LzQ0LzM1/LzM2MF9GXzE3NzU0/NDM1NTZfczBnRE92/N2lPWnMwNnBsclRE/eWpobHN5MnEyUGgw/VlouanBn",
      techStack: [
        "react",
        "nodejs",
        "mongodb",
        "express",
        "tailwindcss",
        "firebase",
        "groq",
      ],
      featured: true,
      liveLink: null,
      githubLink: "https://github.com/DevyanshGrover18/Mera-AI",
      features: [
        "AI-powered conversational lead qualification",
        "Automated appointment booking integration",
        "Custom-trained responses based on business data",
        "Multi-page website embedding",
        "Real-time chat interface with typing simulation",
        "Admin dashboard for conversation analytics",
        "Business data correction & override handling",
        "Fallback human escalation system",
      ],
      longDescription:
        "Mera AI is a full-stack AI chatbot SaaS platform designed to help businesses capture, qualify, and convert website visitors into booked appointments automatically. It integrates directly into business websites and uses structured business data + AI-powered conversation logic to deliver human-like interactions. The platform includes an admin dashboard, correction system for controlled AI responses, real-time chat, and lead tracking analytics to improve conversion rates.",
    },
    {
      id: 2,
      title: "Mera Forms",
      description:
        "A full-stack drag-and-drop form builder that lets users create, customize, and publish dynamic forms with real-time response tracking.",
      category: "Full-Stack",
      image:
        "https://imgs.search.brave.com/I7Ce6ACPe9ESsKswzsq2fQHGJEx5d1oDzFZfXn03pYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzEyLzc0LzMz/LzM2MF9GXzExMjc0/MzM4OV8ycnJPSGMy/ODIxQXc2OVh1Zmh1/M09BN3k4Sk1KTk9E/Ry5qcGc", // replace with actual screenshot
      techStack: [
        "react",
        "ts",
        "nodejs",
        "express",
        "mongodb",
        "tailwindcss",
        "jwt",
      ],
      featured: true,
      liveLink: null, // replace with actual domain
      githubLink: null, // private SaaS product
      features: [
        "Drag-and-drop form builder interface",
        "Dynamic field types (text, select, checkbox, file, etc.)",
        "Full CRUD for forms and responses",
        "Public shareable form links",
        "Response collection & storage",
        "Form analytics dashboard",
        "Authentication & user-based form ownership",
        "Form validation rules & conditional logic",
        "Export responses as CSV",
      ],
      longDescription:
        "Mera Forms is a full-stack SaaS form builder application that enables users to design, manage, and publish custom forms without writing code. Built with a modular component architecture on the frontend and a scalable REST API backend, it supports dynamic field rendering, secure response storage, authentication, and analytics. Users can generate public shareable links for forms and manage submissions from a centralized dashboard.",
    },
    {
      id: 3,
      title: "Mera Dhaba",
      description:
        "A full-stack online food ordering platform with secure JWT authentication and encrypted user management.",
      category: "Full-Stack",
      image:
        "https://imgs.search.brave.com/NaJaURddyaWnjSywX7yOzH3ykm4v_v-ZadTV1M715Z4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzQ5LzI1/LzM2MF9GXzM0NjQ5/MjU4OV9sdzFBNkIy/V0ZBSUVKdHFsRk41/dWJzOEdmQkJGMWdh/ZC5qcGc", // replace with actual screenshot
      techStack: [
        "react",
        "nodejs",
        "express",
        "mongodb",
        "tailwindcss",
        "jwt",
        "bcrypt",
      ],
      featured: true,
      liveLink: null,
      githubLink: "https://github.com/DevyanshGrover18/MeraDhaba",
      features: [
        "User authentication with JWT",
        "Password hashing using bcrypt",
        "Dynamic food menu management",
        "Add to cart & checkout system",
        "Protected API routes with middleware",
        "Responsive UI",
      ],
      longDescription:
        "Mera Dhaba is a secure full-stack food ordering application built using the MERN stack. It implements JWT-based authentication and bcrypt password hashing to ensure secure user management. The platform supports dynamic menu updates, cart functionality, protected routes, role-based access control, and a dedicated admin dashboard for managing orders and food items. Designed with scalable REST APIs and clean frontend state management.",
    },
    {
      id: 4,
      title: "Mera Blog",
      description:
        "A full-stack content management system with a secure admin dashboard and dynamic public content rendering via APIs.",
      category: "Coming Soon...",
      image:
        "https://imgs.search.brave.com/ENcMtxDPpAIy749NAutJa9HK3xtwFgpEkuPksJWS_O0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9uZXdz/LXdlYnNpdGUtZGVz/aWduLWJsb2ctZ3Jh/cGhpYy11cGRhdGUt/dGVzdGluZy1sYXB0/b3Atb25saW5lLXdl/Yi1wYWdlLWRlc2ln/bmVyLWVkaXRvci1j/b2Rlci13b3JraW5n/LXJlc3BvbnNpdmUt/c2l0ZS0yMTY1NzE4/NDUuanBn", // replace with actual screenshot
      techStack: [
        "react",
        "nodejs",
        "express",
        "mongodb",
        "jwt",
        "redis",
        "cloudinary",
      ],
      featured: false,
      liveLink: null,
      githubLink: null,
      features: [
        "Secure admin authentication (JWT)",
        "Role-based protected dashboard",
        "Full CRUD for blog posts",
        "Rich text editor with media upload",
        "Image hosting integration",
        "Draft & publish workflow",
        "RESTful APIs for dynamic content rendering",
        "SEO-friendly routing",
        "Real-time content updates without redeploy",
      ],
      longDescription:
        "Mera Blog is a full-stack content management system built to separate content creation from presentation. Administrators manage blog posts through a protected dashboard with full CRUD capabilities, while the public-facing website dynamically fetches and renders published content through REST APIs. The system eliminates hardcoded content, supports real-time updates, and follows a scalable client-server architecture with secure authentication and structured data management.",
    },
    {
      id: 5,
      title: "Mera Todo",
      description:
        "A responsive frontend task management app that allows users to create, update, and organize daily tasks efficiently.",
      category: "Frontend",
      image:
        "https://imgs.search.brave.com/MqBdjy8X74J592AXve3pu4kIkQ-ZXCcigeXnPMwsRVY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzU5LzMxLzcw/LzM2MF9GXzI1OTMx/NzAxM19uSkphQmdH/R3p2WE1kNmNBeUxk/NnlNSnRiZG5kNjF3/ay5qcGc",
      techStack: ["react", "tailwindcss"],
      featured: false,
      liveLink: null,
      githubLink: "https://github.com/DevyanshGrover18/Todo-App",
      features: [
        "Add, edit, and delete tasks",
        "Mark tasks as completed",
        "Persistent storage using localStorage",
        "Responsive UI design",
        "Clean component-based architecture",
      ],
      longDescription:
        "Mera Todo is a frontend task management application built with React and TypeScript. It focuses on clean component structure, state management, and responsive design. Tasks are stored in localStorage for persistence without requiring a backend. The project demonstrates frontend fundamentals including CRUD operations, conditional rendering, reusable components, and user-friendly UI interactions.",
    },
    {
      id: 6,
      title: "ColdCraft",
      description:
        "An AI-powered web app that generates high-converting, personalized cold emails for job seekers and freelancers.",
      category: "Coming Soon...",
      image: "https://imgs.search.brave.com/8r1pp7D7t6ew5szEuqdiYDmPnP9HxYJKpnIdEeYhK68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMjU4/MDI5MC5qcGc", // replace with actual screenshot
      techStack: [
        "react",
        "express",
        "groq",
      ],
      featured: true,
      liveLink: 'https://cold-craft-xi.vercel.app/', // replace if deployed
      githubLink: "https://github.com/DevyanshGrover18/ColdCraft", // private if SaaS
      features: [
        "AI-generated personalized cold emails",
        "Context-based prompt engineering",
        "Tone selection (professional, friendly, bold)",
        "Job description & portfolio-based customization",
        "Email saving & history tracking",
        "Authentication & user dashboard",
        "Copy-to-clipboard & export functionality",
        "Usage tracking & generation limits",
      ],
      longDescription:
        "ColdCraft is an AI-powered web application designed to help job seekers and freelancers craft personalized, high-converting cold emails in seconds. Users provide context such as job descriptions, recruiter details, or portfolio links, and the system generates tailored outreach emails using structured prompt engineering. The platform includes secure authentication, generation history tracking, and a clean dashboard experience built on a scalable REST API architecture.",
    },
  ];

  const getTechIcon = (tech) => {
    return iconsSvgList[tech] || null;
  };

  return (
    <section
      id="projects"
      className={`projects-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="section-label-projects">
            <span className="label-line-projects"></span>
            <span className="label-text-projects">MY WORK</span>
          </div>
          <h2 className="projects-title">
            <span className="title-part">Featured </span>
            <span className="title-part title-gradient">Projects</span>
          </h2>
          <p className="projects-subtitle">
            A collection of projects I've built, showcasing my skills and
            creativity
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bento-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="bento-image">
                <img src={project.image} alt={project.title} />
                <div className="bento-overlay"></div>
              </div>

              <div className="bento-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Tech Stack Icons */}
                <div className="tech-stack-icons">
                  {project.techStack.map((tech, idx) => (
                    <div key={idx} className="tech-icon" title={tech}>
                      {getTechIcon(tech)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-hover-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="modal-body">
              <div className="modal-header">
                <div className="modal-category">{selectedProject.category}</div>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-long-description">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div className="modal-tech-stack">
                <h3 className="modal-section-title">Tech Stack</h3>
                <div className="modal-tech-icons">
                  {selectedProject.techStack.map((tech, idx) => (
                    <div key={idx} className="modal-tech-item">
                      <div className="modal-tech-icon">{getTechIcon(tech)}</div>
                      <span className="modal-tech-name">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-features">
                <h3 className="modal-section-title">Key Features</h3>
                <ul className="features-list">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-links">
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Live Demo
                </a>
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn secondary"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                  View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;

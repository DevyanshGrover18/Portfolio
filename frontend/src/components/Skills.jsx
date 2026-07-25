import { useState, useEffect, useRef } from "react";
import "../styles/skills.css";
import iconsSvgList from "../utils/iconsSvgList";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
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

  const skills = [
    { name: "HTML", icon: "html", category: "frontend", level: "Expert" },
    { name: "CSS", icon: "css", category: "frontend", level: "Expert" },
    { name: "JavaScript", icon: "js", category: "frontend", level: "Expert" },
    { name: "TypeScript", icon: "ts", category: "frontend", level: "Advanced" },
    { name: "React.js", icon: "react", category: "frontend", level: "Expert" },
    {
      name: "Next.js",
      icon: "nextjs",
      category: "frontend",
      level: "Beginner",
    },
    { name: "Node.js", icon: "nodejs", category: "backend", level: "Advanced" },
    {
      name: "Express.js",
      icon: "express",
      category: "backend",
      level: "Advanced",
    },
    { name: "REST APIs", icon: "api", category: "backend", level: "Expert" },
    {
      name: "MongoDB",
      icon: "mongodb",
      category: "database",
      level: "Advanced",
    },
    { name: "SQL", icon: "sql", category: "database", level: "Beginner" },
    {
      name: "PostgreSQL",
      icon: "postgresql",
      category: "database",
      level: "Beginner",
    },
    { name: "Git", icon: "git", category: "tools", level: "Expert" },
    {
      name: "Redux Toolkit",
      icon: "redux",
      category: "tools",
      level: "Advanced",
    },
    { name: "Postman", icon: "postman", category: "tools", level: "Advanced" },
    { name: "Vercel", icon: "vercel", category: "tools", level: "Advanced" },
    { name: "Codex", icon: "chatgpt", category: "tools", level: "Advanced" },
    { name: "Claude", icon: "claude", category: "tools", level: "Advanced" },
    {
      name: "Python",
      icon: "python",
      category: "programming",
      level: "Intermediate",
    },
    {
      name: "C++",
      icon: "cpp",
      category: "programming",
      level: "Intermediate",
    },
  ];

  const categories = [
    { id: "all", label: "All Skills", icon: "🎯" },
    { id: "frontend", label: "Frontend", icon: "🎨" },
    { id: "backend", label: "Backend", icon: "⚙️" },
    { id: "database", label: "Database", icon: "💾" },
    { id: "tools", label: "Tools", icon: "🛠️" },
    { id: "programming", label: "Programming", icon: "💻" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className={`skills-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header">
          <div className="section-label-skills">
            <span className="label-line-skills"></span>
            <span className="label-text-skills">MY SKILLSET</span>
          </div>
          <h2 className="skills-title">
            <span className="title-part">What makes it </span>
            <span className="title-part title-gradient">Work</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Skills 3D Cards Grid */}
        <div className="skills-cards-grid">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`skill-card-3d ${skill.category}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-inner">
                {/* Front of card */}
                <div className="card-front">
                  <div className="card-glow"></div>
                  <div className="skill-icon-large">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <h3 className="skill-name-large">{skill.name}</h3>
                  <div className="skill-category-badge">{skill.category}</div>
                </div>

                {/* Back of card */}
                <div className="card-back">
                  <div className="card-back-content">
                    <div className="skill-level-badge">{skill.level}</div>
                    <h3 className="skill-name-back">{skill.name}</h3>
                    <div className="skill-bars">
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width:
                              skill.level === "Expert"
                                ? "95%"
                                : skill.level === "Advanced"
                                  ? "80%"
                                  : skill.level === "Intermediate"
                                    ? "65%"
                                    : "30%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="skill-description">
                      {skill.level === "Expert"
                        ? "Highly proficient and experienced"
                        : skill.level === "Advanced"
                          ? "Strong working knowledge"
                          : skill.level === "Intermediate"
                            ? "Solid foundation and growing"
                            : "Learning and Growing"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Count */}
        <div className="skills-count">
          <div className="count-number">{filteredSkills.length}</div>
          <div className="count-label">
            {activeCategory === "all"
              ? "Total Skills"
              : `${categories.find((c) => c.id === activeCategory)?.label} Skills`}
          </div>
        </div>
      </div>
    </section>
  );
};

// Icon component generator
const getSkillIcon = (iconName) => {
  return iconsSvgList[iconName] || null;
};

export default Skills;

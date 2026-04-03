import { ArrowDown } from 'lucide-react';

const techStack = [
  { icon: '⚛️', name: 'React' },
  { icon: '📦', name: 'Node.js' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '⚡', name: 'TypeScript' },
];

const stats = [
  { number: '5+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '30+', label: 'Happy Clients' },
];

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm Alex</p>
          <h1 className="hero-title">
            Full Stack <span className="gradient-text">Developer</span>
          </h1>
          <h2 className="hero-subtitle">
            Building Digital Experiences
          </h2>
          <p className="hero-description">
            I create beautiful, functional, and user-friendly web applications 
            using modern technologies. Passionate about clean code and innovative solutions.
          </p>
          
          <div className="hero-buttons">
            <button onClick={scrollToProjects} className="btn btn-primary">
              View My Work
            </button>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-wrapper">
            <img 
              src="/images/Profilepic.webp" 
              alt="Developer"
            />
          </div>
          <div className="tech-stack">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-item" title={tech.name}>
                {tech.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
}

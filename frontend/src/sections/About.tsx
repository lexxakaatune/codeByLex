const skills = [
  'React', 'TypeScript', 'Node.js', 'MongoDB', 'Express',
  'Next.js', 'Tailwind CSS', 'Git', 'Docker', 'AWS',
  'GraphQL', 'PostgreSQL', 'Redux', 'Jest', 'CI/CD'
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-container">
          <div className="about-image">
            <div className="about-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=700&fit=crop" 
                alt="Working"
              />
            </div>
            <div className="experience-card">
              <div className="experience-number">5+</div>
              <div className="experience-text">Years of<br />Experience</div>
            </div>
          </div>

          <div className="about-content">
            <h2 className="about-title">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="about-text">
              I'm a passionate full-stack developer with over 5 years of experience 
              building web applications. I specialize in the MERN stack and love 
              creating efficient, scalable, and user-friendly solutions.
            </p>
            <p className="about-text">
              My journey in web development started with a curiosity about how 
              websites work, which evolved into a deep passion for creating 
              digital experiences that make a difference.
            </p>
            
            <h3 className="skills-title">My Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

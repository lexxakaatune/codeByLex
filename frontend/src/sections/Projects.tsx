import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projectService, type Project } from '@/services/api';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAll();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleProjects: Project[] = [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with cart, checkout, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      order: 1,
      createdAt: '',
      updatedAt: ''
    },
    {
      _id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      order: 2,
      createdAt: '',
      updatedAt: ''
    },
    {
      _id: '3',
      title: 'Portfolio Dashboard',
      description: 'Personal portfolio website with admin panel for content management.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['React', 'Tailwind', 'Express', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      order: 3,
      createdAt: '',
      updatedAt: ''
    }
  ];

  const displayProjects = projects.length > 0 ? projects : sampleProjects;

  if (isLoading) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle">Here are some of my recent works</p>
          </div>
          <div className="projects-loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="project-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Here are some of my recent works. Each project is a unique piece of development.
          </p>
        </div>

        <div className="projects-grid">
          {displayProjects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-image">
                <img 
                  src={project.image || 'https://via.placeholder.com/600x400'} 
                  alt={project.title}
                />
                {project.featured && <span className="featured-badge">Featured</span>}
                <div className="project-overlay">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    title="View Live"
                  >
                    <ExternalLink size={20} />
                  </a>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      title="View Code"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

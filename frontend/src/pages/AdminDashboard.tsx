import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { projectService, type Project, type ProjectInput } from '@/services/api';
import { Plus, Edit2, Trash2, X, Sun, Moon, LogOut, ExternalLink, Star } from 'lucide-react';

interface ProjectFormData extends ProjectInput {
  _id?: string;
}

const emptyProject: ProjectFormData = {
  title: '', description: '', image: '', technologies: [],
  liveUrl: '', githubUrl: '', featured: false, order: 0
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectFormData>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [error, setError] = useState('');
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAll();
      setProjects(data.projects || []);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/admin/login'); };
  const openAddModal = () => { setEditingProject(emptyProject); setTechInput(''); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingProject(emptyProject); setTechInput(''); setError(''); };

  const openEditModal = (project: Project) => {
    setEditingProject({ ...project, technologies: [...project.technologies] });
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingProject._id) {
        await projectService.update(editingProject._id, editingProject);
      } else {
        await projectService.create(editingProject);
      }
      await loadProjects();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.delete(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !editingProject.technologies.includes(techInput.trim())) {
      setEditingProject(prev => ({ ...prev, technologies: [...prev.technologies, techInput.trim()] }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setEditingProject(prev => ({ ...prev, technologies: prev.technologies.filter(t => t !== tech) }));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); addTechnology(); }
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Admin<span>Panel</span></div>
          <div className="navbar-actions">
            <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.username}</span>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Projects</h1>
          <div className="admin-actions">
            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
              <Plus size={18} /> Add Project
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="projects-loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="project-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <h3 className="empty-state-title">No projects yet</h3>
            <p className="empty-state-text">Start by adding your first project</p>
            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
              <Plus size={18} /> Add Project
            </button>
          </div>
        ) : (
          <div className="projects-table-container">
            <table className="projects-table">
              <thead>
                <tr><th>Image</th><th>Title</th><th>Technologies</th><th>Featured</th><th>Order</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td><img src={project.image || 'https://via.placeholder.com/60x40'} alt={project.title} className="project-thumb" /></td>
                    <td className="project-title-cell">{project.title}</td>
                    <td>
                      <div className="project-tech-cell">
                        {project.technologies.slice(0, 3).map((tech, i) => <span key={i} className="project-tech-tag">{tech}</span>)}
                        {project.technologies.length > 3 && <span className="project-tech-tag">+{project.technologies.length - 3}</span>}
                      </div>
                    </td>
                    <td>{project.featured && <span className="featured-badge"><Star size={12} style={{ display: 'inline', marginRight: '4px' }} />Featured</span>}</td>
                    <td>{project.order}</td>
                    <td>
                      <div className="project-actions">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-edit" title="View Live"><ExternalLink size={16} /></a>
                        <button className="action-btn action-btn-edit" onClick={() => openEditModal(project)} title="Edit"><Edit2 size={16} /></button>
                        <button className="action-btn action-btn-delete" onClick={() => handleDelete(project._id)} title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingProject._id ? 'Edit Project' : 'Add New Project'}</h2>
              <button className="modal-close" onClick={closeModal}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input type="text" className="form-input" value={editingProject.title} onChange={e => setEditingProject(prev => ({ ...prev, title: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order</label>
                    <input type="number" className="form-input" value={editingProject.order} onChange={e => setEditingProject(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea className="form-textarea" rows={3} value={editingProject.description} onChange={e => setEditingProject(prev => ({ ...prev, description: e.target.value }))} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input type="url" className="form-input" value={editingProject.image} onChange={e => setEditingProject(prev => ({ ...prev, image: e.target.value }))} placeholder="https://example.com/image.jpg" />
                </div>

                <div className="form-group">
                  <label className="form-label">Technologies</label>
                  <div className="tech-input-container">
                    {editingProject.technologies.map((tech) => (
                      <span key={tech} className="tech-chip">{tech}<button type="button" onClick={() => removeTechnology(tech)}><X size={14} /></button></span>
                    ))}
                    <input type="text" className="tech-input" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={handleTechKeyDown} onBlur={addTechnology} placeholder="Add tech..." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Live URL *</label>
                    <input type="url" className="form-input" value={editingProject.liveUrl} onChange={e => setEditingProject(prev => ({ ...prev, liveUrl: e.target.value }))} placeholder="https://your-project.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub URL</label>
                    <input type="url" className="form-input" value={editingProject.githubUrl} onChange={e => setEditingProject(prev => ({ ...prev, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-checkbox">
                    <input type="checkbox" checked={editingProject.featured} onChange={e => setEditingProject(prev => ({ ...prev, featured: e.target.checked }))} />
                    <span>Featured Project</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">{editingProject._id ? 'Update' : 'Create'} Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

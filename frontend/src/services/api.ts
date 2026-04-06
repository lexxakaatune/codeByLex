// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for making API requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
}

// Types
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// Auth services
export const authService = {
  login: (username: string, password: string): Promise<{ success: boolean; token: string; user: User; message: string }> =>
    fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  
  register: (username: string, email: string, password: string): Promise<{ success: boolean; token: string; user: User; message: string }> =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),
  
  getCurrentUser: (): Promise<User> =>
    fetchWithAuth('/auth/me'),
};

// Project services
export const projectService = {
  getAll: (): Promise<{ success: boolean; projects: Project[]; count: number }> =>
    fetchWithAuth('/api/projects'),
  
  getFeatured: (): Promise<{ success: boolean; projects: Project[]; count: number }> =>
    fetchWithAuth('/api/projects/featured'),
  
  getById: (id: string): Promise<{ success: boolean; project: Project }> =>
    fetchWithAuth(`/api/projects/${id}`),
  
  create: (project: ProjectInput): Promise<{ success: boolean; project: Project; message: string }> =>
    fetchWithAuth('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  
  update: (id: string, project: ProjectInput): Promise<{ success: boolean; project: Project; message: string }> =>
    fetchWithAuth(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    }),
  
  delete: (id: string): Promise<{ success: boolean; message: string }> =>
    fetchWithAuth(`/api/projects/${id}`, {
      method: 'DELETE',
    }),
};

export default { authService, projectService };

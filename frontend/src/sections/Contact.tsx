import { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send } from 'lucide-react';

const contactMethods = [
  { icon: Mail, title: 'Email', value: 'alexcasimia@gmail.com', href: 'mailto:alexcasimia@gmail.com' },
  { icon: Phone, title: 'Phone', value: '+234 (806) 539-1792', href: 'tel:+2348065391792' },
  { icon: MapPin, title: 'Location', value: 'Nigeria.', href: '#' }
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/lex-thedev-69b363340', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/lexxakaatune', label: 'X (formerly Twitter)' }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h2 className="contact-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="contact-text">
              Have a project in mind or want to collaborate? Feel free to reach out. 
              I'm always open to discussing new projects and opportunities.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <a key={index} href={method.href} className="contact-method">
                  <div className="contact-icon">
                    <method.icon size={24} />
                  </div>
                  <div className="contact-method-content">
                    <h4>{method.title}</h4>
                    <p>{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div style={{ 
                  padding: '1rem', 
                  background: 'rgba(34, 197, 94, 0.1)', 
                  color: 'var(--success)',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <button type="submit" className="form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <><>Send Message</><Send size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

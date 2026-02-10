import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Wrench, Brain, Clock } from 'lucide-react';
import { personalInfo, skills, projects, experience, socialLinks } from '../mock';

const Home = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSkills(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await axios.post(`${API}/contacts`, formData);
      
      if (response.data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus('');
        }, 5000);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    }
  };

  const getIconForSocial = (iconName) => {
    switch(iconName) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'mail': return <Mail className="w-5 h-5" />;
      default: return null;
    }
  };

  const getIconForSkill = (category) => {
    switch(category) {
      case 'programming': return <Code className="w-5 h-5" />;
      case 'tools': return <Wrench className="w-5 h-5" />;
      case 'soft': return <Brain className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`header-sticky ${isScrolled ? 'header-scrolled' : ''} bg-background/80`}>
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">KP</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-4"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border animate-fadeIn">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('about')} className="text-left hover:text-primary transition-colors">About</button>
                <button onClick={() => scrollToSection('skills')} className="text-left hover:text-primary transition-colors">Skills</button>
                <button onClick={() => scrollToSection('projects')} className="text-left hover:text-primary transition-colors">Projects</button>
                <button onClick={() => scrollToSection('experience')} className="text-left hover:text-primary transition-colors">Experience</button>
                <button onClick={() => scrollToSection('contact')} className="text-left hover:text-primary transition-colors">Contact</button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="container-custom text-center z-10 animate-fadeInUp">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {personalInfo.name}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {personalInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="btn-primary text-lg px-8 py-6"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="text-lg px-8 py-6"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fadeInUp" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slideInLeft">
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_portfoliodev-4/artifacts/861luzwg_20250810_132247%20%282%29.jpg" 
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="animate-slideInRight">
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  {personalInfo.about}
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={link.name}
                    >
                      {getIconForSocial(link.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fadeInUp" style={{ fontFamily: 'Poppins, sans-serif' }}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Programming Skills */}
            <Card className="animate-fadeInUp hover-scale">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {getIconForSkill('programming')}
                  <CardTitle>Programming</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.programming.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: visibleSkills ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="animate-fadeInUp hover-scale" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {getIconForSkill('tools')}
                  <CardTitle>Tools & Platforms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.tools.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: visibleSkills ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="animate-fadeInUp hover-scale" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {getIconForSkill('soft')}
                  <CardTitle>Soft Skills</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.soft.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: visibleSkills ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fadeInUp" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects showcasing my skills and passion for web development
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project.id} className="project-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <div className="project-image bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Code className="w-16 h-16 text-primary/40" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                {(project.liveDemo || project.github) && (
                  <CardFooter className="flex gap-2">
                    {project.liveDemo && (
                      <Button size="sm" variant="default" className="flex-1" asChild>
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fadeInUp" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            {experience.map((item, index) => (
              <div key={item.id} className="timeline-item animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-base">{item.organization}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fadeInUp" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
          <div className="max-w-2xl mx-auto">
            <Card className="animate-fadeInUp">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Let's Connect</CardTitle>
                <CardDescription className="text-center">
                  Reach out to me directly via email or connect on social media
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={link.name}
                    >
                      {getIconForSocial(link.icon)}
                    </a>
                  ))}
                </div>

                {/* Direct Contact Button */}
                <div className="text-center pt-4">
                  <Button size="lg" asChild className="w-full md:w-auto">
                    <a href={`mailto:${personalInfo.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Me an Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => scrollToSection('about')} className="text-sm hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-sm hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-primary transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
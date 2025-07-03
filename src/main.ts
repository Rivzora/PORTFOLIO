import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import emailjs from '@emailjs/browser';

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface TypedConfig {
  strings: string[];
  typeSpeed: number;
  backSpeed: number;
  backDelay: number;
  loop: boolean;
  showCursor: boolean;
  cursorChar: string;
}

class Portfolio {
  private navbar: HTMLElement | null;
  private navToggle: HTMLElement | null;
  private navMenu: HTMLElement | null;
  private contactForm: HTMLFormElement | null;
  private typed: Typed | null = null;
  private loadingScreen: HTMLElement | null;

  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle'); // Fixed ID
    this.navMenu = document.getElementById('nav-menu');
    this.contactForm = document.getElementById('contact-form') as HTMLFormElement;
    this.loadingScreen = document.getElementById('loading-screen');
    
    this.init();
  }

  private init(): void {
    this.hideLoadingScreen();
    this.initAOS();
    this.initTyped();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupContactForm();
    this.setupSmoothScrolling();
  }
  private hideLoadingScreen(): void {
    // Hide loading screen after a short delay
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
          if (this.loadingScreen) {
            this.loadingScreen.remove();
          }
        }, 500);
      }
    }, 1500); // Show loading for 1.5 seconds
  }

  private initAOS(): void {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }

  private initTyped(): void {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const options: TypedConfig = {
      strings: [
        'Masters Student in Computer Application',
        'Aspiring Full Stack Developer', 
        'Learning React & Modern Web Technologies',
        'Building Projects & Gaining Experience',
        'Passionate About Code & Innovation',
        'Future Software Engineer'
      ],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    };

    this.typed = new Typed(typedElement, options);
  }

  private setupNavigation(): void {
    // Mobile menu toggle
    this.navToggle?.addEventListener('click', () => {
      this.navMenu?.classList.toggle('active');
      this.navToggle?.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
      });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks) as HTMLAnchorElement[];

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');
          navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  private setupScrollEffects(): void {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Navbar background on scroll
      if (this.navbar) {
        if (currentScrollY > 100) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }

      // Hide/show navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        this.navbar?.classList.add('nav-hidden');
      } else {
        this.navbar?.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero') as HTMLElement;
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content') as HTMLElement;
        if (parallax) {
          parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      });
    }
  }

  private setupContactForm(): void {
    if (!this.contactForm) return;

    // Initialize EmailJS (you'll need to replace with your actual keys)
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    this.contactForm.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      
      const formData = new FormData(this.contactForm!);
      const data: ContactFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string
      };

      // Validate form data
      if (!this.validateForm(data)) {
        this.showNotification('Please fill in all fields correctly.', 'error');
        return;
      }

      const submitButton = this.contactForm!.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalText = submitButton.innerHTML;
      
      try {
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Send email using EmailJS
        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message
          }
        );

        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.contactForm!.reset();
      } catch (error) {
        console.error('EmailJS error:', error);
        this.showNotification('Failed to send message. Please try again.', 'error');
      } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    });
  }

  private validateForm(data: ContactFormData): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return !!(
      data.name.trim() &&
      data.email.trim() &&
      emailRegex.test(data.email) &&
      data.subject.trim() &&
      data.message.trim()
    );
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close') as HTMLButtonElement;
    closeButton.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  private setupSmoothScrolling(): void {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href')!);
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Public method to destroy the instance
  public destroy(): void {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}

// Skills animation
class SkillsAnimation {
  private skills: NodeListOf<Element>;

  constructor() {
    this.skills = document.querySelectorAll('.skill-item');
    this.init();
  }

  private init(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 100);
        }
      });
    }, { threshold: 0.5 });

    this.skills.forEach(skill => observer.observe(skill));
  }
}

// Project hover effects
class ProjectEffects {
  private projectCards: NodeListOf<Element>;

  constructor() {
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  private init(): void {
    this.projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hovered');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
  new SkillsAnimation();
  new ProjectEffects();
});

// Handle page visibility change to pause/resume animations
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.body.classList.add('paused');
  } else {
    // Resume animations when page is visible
    document.body.classList.remove('paused');
  }
});

export { Portfolio, SkillsAnimation, ProjectEffects };

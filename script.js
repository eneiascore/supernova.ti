// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    const sections = ['home', 'sobre', 'servicos', 'portfolio', 'contato'];
    let currentSection = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
            currentSection = sectionId;
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Testimonials carousel
let currentTestimonial = 0;
const totalTestimonials = testimonialItems.length;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Update dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonialItems[index]) {
        testimonialItems[index].classList.add('active');
    }
    
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Manual testimonial navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        
        // Reset auto-rotation timer
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .about-stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                
                // Skip if already animated
                if (counter.dataset.animated) return;
                
                // Extract number from text (e.g., "100+" -> 100)
                const match = target.match(/\d+/);
                if (!match) return;
                
                const targetNumber = parseInt(match[0]);
                const duration = 2000; // 2 seconds
                const increment = targetNumber / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNumber) {
                        counter.textContent = target; // Restore original text
                        clearInterval(timer);
                        counter.dataset.animated = 'true';
                    } else {
                        const currentText = target.replace(/\d+/, Math.floor(current));
                        counter.textContent = currentText;
                    }
                }, 16);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .about-text, .about-stats');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Parallax effect for floating elements
function setupParallax() {
    const floatingElements = document.querySelectorAll('.floating-dot');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${parallax * speed}px)`;
        });
    });
}

// Form handling (for future contact form)
function setupForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Here you would normally send the form data
                showNotification('Mensagem enviada com sucesso!', 'success');
                form.reset();
            } else {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '0.875rem',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Page load performance optimization
function optimizePageLoad() {
    // Lazy load images when they become visible
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    animateCounters();
    setupScrollAnimations();
    setupParallax();
    setupForms();
    optimizePageLoad();
    
    // Show initial testimonial
    showTestimonial(0);
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set correct active link
    updateActiveNavLink();
});

// Handle page visibility changes (pause animations when tab is not active)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(testimonialInterval);
    } else {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : totalTestimonials - 1;
        showTestimonial(currentTestimonial);
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
});

// Touch/swipe support for mobile testimonials
let touchStartX = 0;
let touchEndX = 0;

const testimonialContainer = document.querySelector('.testimonials-container');

if (testimonialContainer) {
    testimonialContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next testimonial
                nextTestimonial();
            } else {
                // Swipe right - previous testimonial
                currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : totalTestimonials - 1;
                showTestimonial(currentTestimonial);
            }
            
            clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
    }
}

// Accessibility improvements
function improveAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    
    Object.assign(skipLink.style, {
        position: 'absolute',
        top: '-40px',
        left: '6px',
        background: '#000',
        color: '#fff',
        padding: '8px',
        textDecoration: 'none',
        zIndex: '10000',
        fontSize: '14px'
    });
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
}

// Initialize accessibility improvements
improveAccessibility();

// Console welcome message
console.log('%c🚀 Supernova.TI', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cTransformando ideias em código desde 2019', 'color: #6b7280; font-size: 14px;');
console.log('%cVisite: https://supernova.ti', 'color: #10b981; font-size: 12px;');

// Supernova.ti - JavaScript functionality

// Mobile menu functionality
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.className = 'fas fa-times';
    } else {
        mobileMenu.classList.remove('open');
        menuIcon.className = 'fas fa-bars';
    }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Header scroll effect
let isScrolled = false;

function handleScroll() {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50 && !isScrolled) {
        isScrolled = true;
        header.classList.add('scrolled');
    } else if (scrollPosition <= 50 && isScrolled) {
        isScrolled = false;
        header.classList.remove('scrolled');
    }
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const arrow = element.querySelector('.faq-arrow');
    
    // Close all other FAQ items
    const allFAQItems = document.querySelectorAll('.faq-item');
    allFAQItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('open');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherArrow = item.querySelector('.faq-arrow');
            if (otherAnswer) otherAnswer.style.maxHeight = '0';
            if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ item
    const isOpen = faqItem.classList.contains('open');
    
    if (isOpen) {
        faqItem.classList.remove('open');
        answer.style.maxHeight = '0';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        faqItem.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        arrow.style.transform = 'rotate(180deg)';
    }
}

// Category filter functionality
function filterBlogPosts(category) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-card');
    
    // Update active category button
    categoryBtns.forEach(btn => {
        btn.classList.remove('category-btn-active');
        if (btn.textContent.includes(category) || category === 'Todos') {
            btn.classList.add('category-btn-active');
        }
    });
    
    // Filter blog posts (in a real implementation, this would filter actual content)
    blogPosts.forEach(post => {
        if (category === 'Todos') {
            post.style.display = 'block';
        } else {
            const postCategory = post.querySelector('.blog-card-category').textContent;
            if (postCategory === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        }
    });
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value;
    
    if (email && isValidEmail(email)) {
        alert('Obrigado por se inscrever! Você receberá nossas dicas em breve.');
        emailInput.value = '';
    } else {
        alert('Por favor, insira um email válido.');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hover-lift, .feature-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Setup animations
    setupAnimations();
    
    // Add click handlers for category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.textContent.split(' ')[0];
            filterBlogPosts(category);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            subscribeNewsletter();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (isMobileMenuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
});

// Smooth reveal animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
        padding: 0 3rem;
    }
    
    .faq-item.open .faq-answer {
        padding: 1.5rem 3rem;
    }
    
    .faq-arrow {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Blog navigation functions
function openNewsPage(articleId) {
    window.location.href = 'noticia.html';
}

function goToHome() {
    window.location.href = 'index.html';
}

function goToHomeSection(sectionId) {
    window.location.href = `index.html#${sectionId}`;
}

// New function for About page animations
function setupAboutAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Other existing functions...

    // Setup animations for the About page if it's the current page
    if (document.body.classList.contains('about-page')) {
        setupAboutAnimations();
    }
});












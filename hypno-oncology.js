// Hypno-Oncology Page JavaScript

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate research stats
            if (entry.target.classList.contains('research-stat')) {
                animateStatNumber(entry.target.querySelector('.stat-percentage'));
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.benefit-card, .timeline-item, .technique-card, .faq-item, .research-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Animate stat numbers
function animateStatNumber(element) {
    if (!element || element.dataset.animated) return;
    
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    element.dataset.animated = 'true';
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

// Add hover effect to timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.animated-gradient');
    
    if (heroBackground) {
        heroBackground.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.2}px) rotate(${scrolled * 0.05}deg)`;
    }
});

// FAQ item expansion (optional - can be implemented if needed)
document.querySelectorAll('.faq-item').forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
        // Toggle expanded class for potential future expansion feature
        this.classList.toggle('expanded');
    });
});

// Highlight active navigation
const currentPage = window.location.pathname.split('/').pop();
if (currentPage === 'hypno-oncology.html') {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'hypno-oncology.html') {
            link.classList.add('active');
        }
    });
}

// Initialize page animations
document.addEventListener('DOMContentLoaded', () => {
    // Fade in hero content
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-statement');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('Hypno-Oncology page initialized');
});
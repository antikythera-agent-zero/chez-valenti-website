// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const consultationForm = document.getElementById('consultationForm');

// Mobile Navigation Toggle with smooth animation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Always close mobile menu when any link is clicked
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling Function with easing
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// Navigation Link Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Only handle anchor links (starting with #)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
        // Let normal navigation happen for other links
    });
});

// Enhanced Navbar with dynamic background
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollY > lastScrollY && scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Advanced Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, observerOptions);

// Parallax Effects
class ParallaxController {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Hero video parallax
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            this.elements.push({
                element: heroVideo,
                speed: -0.5,
                offset: 0
            });
        }

        // Background elements parallax
        document.querySelectorAll('[data-parallax]').forEach(element => {
            this.elements.push({
                element: element,
                speed: parseFloat(element.dataset.parallax) || -0.3,
                offset: element.offsetTop
            });
        });

        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(item => {
            const { element, speed, offset } = item;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize parallax
const parallax = new ParallaxController();

// Magnetic Button Effect
class MagneticButton {
    constructor(element) {
        this.element = element;
        this.boundingRect = this.element.getBoundingClientRect();
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseMove(e) {
        const { left, top, width, height } = this.element.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.3;
        const y = (e.clientY - top - height / 2) * 0.3;
        
        this.element.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        this.element.style.transition = 'transform 0.2s ease';
    }

    onMouseLeave() {
        this.element.style.transform = 'translate(0, 0) scale(1)';
        this.element.style.transition = 'transform 0.3s ease';
    }
}

// Apply magnetic effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-primary, .btn-secondary, .purchase-btn').forEach(button => {
        new MagneticButton(button);
    });
});

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';
        
        this.init();
    }

    init() {
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                width: 10px;
                height: 10px;
                background: var(--denim);
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.2s ease, opacity 0.2s ease;
            }
            
            .custom-cursor-follower {
                width: 30px;
                height: 30px;
                border: 2px solid var(--cadet-gray);
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9998;
                opacity: 0.5;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .custom-cursor.hover {
                transform: scale(2);
                background: var(--rose-quartz);
            }
            
            @media (max-width: 768px) {
                .custom-cursor, .custom-cursor-follower {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX - 15 + 'px';
                this.cursorFollower.style.top = e.clientY - 15 + 'px';
            }, 50);
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .testimonial-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768) {
    new CustomCursor();
}

// Scroll-triggered animations with stagger
document.addEventListener('DOMContentLoaded', () => {
    // Add animate class to elements
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .about-text, .book-text, .highlight-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Testimonial cards animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
});

// Text reveal animation
class TextReveal {
    constructor(element) {
        this.element = element;
        this.text = this.element.textContent;
        this.element.innerHTML = '';
        this.init();
    }

    init() {
        // Split text into spans
        this.text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 0.02}s`;
            this.element.appendChild(span);
        });

        // Trigger animation on intersection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }
}

// Text reveal disabled for new rotating questions design

// Form Handling with EmailJS integration
consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Enhanced validation with animations
    let isValid = true;
    const requiredFields = ['name', 'email', 'message'];
    
    requiredFields.forEach(field => {
        const input = this.querySelector(`[name="${field}"]`);
        const formGroup = input.closest('.form-group');
        
        if (!formObject[field]) {
            isValid = false;
            formGroup.classList.add('error');
            input.classList.add('shake');
            
            setTimeout(() => {
                input.classList.remove('shake');
            }, 500);
        } else {
            formGroup.classList.remove('error');
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
        const emailInput = this.querySelector('[name="email"]');
        emailInput.closest('.form-group').classList.add('error');
        emailInput.classList.add('shake');
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state with animation
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Prepare template parameters for EmailJS
    const templateParams = {
        from_name: formObject.name,
        from_email: formObject.email,
        phone: formObject.phone || 'Not provided',
        service: formObject.service || 'Not specified',
        message: formObject.message,
        date: date,
        time: time
    };

    // Send email using EmailJS
    emailjs.send('service_e21w73j', 'template_6uz7zkr', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Reset form with animation
            const inputs = consultationForm.querySelectorAll('input, textarea, select');
            inputs.forEach((input, index) => {
                setTimeout(() => {
                    input.value = '';
                    input.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        input.style.transform = 'scale(1)';
                    }, 200);
                }, index * 50);
            });
            
            // Show success message
            showNotification('Your consultation request has been sent successfully! We will contact you soon.', 'success');
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            showNotification('There was an error sending your request. Please try again or contact us directly.', 'error');
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
});

// Add form animation styles
const formStyles = document.createElement('style');
formStyles.textContent = `
    .form-group.error input,
    .form-group.error textarea,
    .form-group.error select {
        border-color: var(--error);
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    .shake {
        animation: shake 0.5s ease;
    }
`;
document.head.appendChild(formStyles);

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add enhanced styles
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                backdrop-filter: blur(20px);
                animation: slideInRight 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            }
            
            .notification-success {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95));
                border: 1px solid rgba(16, 185, 129, 0.3);
                color: white;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            }
            
            .notification-error {
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95));
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: white;
                box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
            }
            
            .notification-info {
                background: linear-gradient(135deg, rgba(39, 93, 173, 0.95), rgba(30, 64, 175, 0.95));
                border: 1px solid rgba(39, 93, 173, 0.3);
                color: white;
                box-shadow: 0 10px 30px rgba(39, 93, 173, 0.3);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-icon {
                font-size: 1.4rem;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }
            
            .notification-message {
                flex: 1;
                font-weight: 500;
                line-height: 1.4;
            }
            
            .notification-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(120%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(120%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✨',
        error: '⚠️',
        info: '💡'
    };
    return icons[type] || icons.info;
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Google Maps Integration with custom styling
function initMap() {
    // Advanced Knysna Surgical Centre coordinates
    const knysnaLocation = {
        lat: -34.0365,
        lng: 23.0473
    };

    // Custom map styles matching the website theme
    const mapStyles = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{"color": "#f4fff8"}]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#4d4847"}]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#fcf7f8"}]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#ced3dc"}]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{"color": "#f4fff8"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{"color": "#e5f4e3"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#ced3dc"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"color": "#fcf7f8"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#aba9c3"}]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{"color": "#ced3dc"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#8baaad"}]
        }
    ];

    // Create map
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: knysnaLocation,
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
    });

    // Custom marker
    const marker = new google.maps.Marker({
        position: knysnaLocation,
        map: map,
        title: 'Advanced Knysna Surgical Centre',
        animation: google.maps.Animation.DROP,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#275dad',
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 2
        }
    });

    // Info window with styled content
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 15px; font-family: 'Inter', sans-serif; max-width: 250px;">
                <h3 style="margin: 0 0 10px 0; color: #1c3738; font-size: 18px;">Chez Valenti</h3>
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #4d4847;">Advanced Knysna Surgical Centre</p>
                <p style="margin: 0; color: #5b616a; font-size: 14px; line-height: 1.4;">
                    4 Barracuda Street, Fisher Haven<br>
                    Knysna, 6571<br>
                    South Africa
                </p>
                <a href="https://maps.google.com/?q=Advanced+Knysna+Surgical+Centre,+4+Barracuda+Street,+Fisher+Haven,+Knysna,+6571" 
                   target="_blank" 
                   style="display: inline-block; margin-top: 10px; color: #275dad; text-decoration: none; font-weight: 600; font-size: 14px;">
                   Get Directions →
                </a>
            </div>
        `
    });

    // Show info window on marker click
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    // Bounce animation on hover
    marker.addListener('mouseover', () => {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 1400);
    });
}

// Fallback for Google Maps
function initMapFallback() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem; text-align: center; background: linear-gradient(135deg, var(--mint-cream), var(--snow));">
                <div style="font-size: 3rem; margin-bottom: 1rem; filter: grayscale(0.2);">📍</div>
                <h3 style="margin-bottom: 1rem; color: var(--gunmetal); font-family: var(--font-display);">Advanced Knysna Surgical Centre</h3>
                <p style="margin-bottom: 0.5rem; color: var(--text-secondary);">4 Barracuda Street, Fisher Haven</p>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">Knysna, 6571, South Africa</p>
                <a href="https://maps.google.com/?q=Advanced+Knysna+Surgical+Centre,+4+Barracuda+Street,+Fisher+Haven,+Knysna,+6571" 
                   target="_blank" 
                   class="btn-primary"
                   style="text-decoration: none; padding: 0.8rem 1.5rem; border-radius: 30px;">
                   📍 Open in Google Maps
                </a>
            </div>
        `;
    }
}

// Initialize map fallback if Google Maps fails to load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof google === 'undefined' || !google.maps) {
            initMapFallback();
        }
    }, 3000);
});

// Handle Google Maps API load error
window.gm_authFailure = function() {
    initMapFallback();
};

// Smooth Parallax Effect
class SmoothParallax {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        let ticking = false;
        
        const updateElements = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            this.elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateElements);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
}

// Initialize smooth parallax
new SmoothParallax();

// Lazy Loading for Images with fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                
                img.onload = () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Ripple effect for buttons
class RippleEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn-primary, .btn-secondary, .purchase-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Apply ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-primary, .btn-secondary, .purchase-btn').forEach(button => {
        new RippleEffect(button);
    });
});

// Counter animation for stats
class CounterAnimation {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.textContent);
        this.current = 0;
        this.increment = this.target / 50;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    animate() {
        const updateCounter = () => {
            if (this.current < this.target) {
                this.current += this.increment;
                this.element.textContent = Math.ceil(this.current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target + '+';
            }
        };
        updateCounter();
    }
}

// Apply counter animation to stat numbers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-number').forEach(stat => {
        new CounterAnimation(stat);
    });
});

// Smooth reveal for sections
class SmoothReveal {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
            observer.observe(section);
        });
    }
}

// Initialize smooth reveal
new SmoothReveal();

// Book Purchase Link Tracking with enhanced feedback
document.querySelectorAll('.purchase-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const platform = this.classList.contains('amazon') ? 'Amazon' : 
                        this.classList.contains('takealot') ? 'Takealot' : 'Kindle';
        
        // Visual feedback with ripple
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Track book purchase clicks
        console.log(`Book purchase click: ${platform}`);
    });
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 10px;
        background: var(--denim);
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 20px;
        transition: top 0.3s ease;
        z-index: 10000;
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ARIA labels for interactive elements
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('role', 'button');
        
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
}

// Rotating Questions Animation
class RotatingQuestions {
    constructor() {
        this.questions = document.querySelectorAll('.question-text');
        this.currentIndex = 0;
        this.interval = null;
        
        if (this.questions.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Start rotation
        this.startRotation();
        
        // Pause on hover
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.addEventListener('mouseenter', () => this.pauseRotation());
            heroContent.addEventListener('mouseleave', () => this.startRotation());
        }
    }
    
    startRotation() {
        if (this.interval) return;
        
        this.interval = setInterval(() => {
            this.rotateQuestion();
        }, 5000); // Change question every 5 seconds
    }
    
    pauseRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    rotateQuestion() {
        // Hide current question
        this.questions[this.currentIndex].classList.remove('active');
        
        // Move to next question
        this.currentIndex = (this.currentIndex + 1) % this.questions.length;
        
        // Show next question
        setTimeout(() => {
            this.questions[this.currentIndex].classList.add('active');
        }, 300);
    }
}

// Initialize rotating questions
document.addEventListener('DOMContentLoaded', () => {
    new RotatingQuestions();
});

// Newsletter Form Handler with EmailJS
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get email value
        const emailInput = this.querySelector('#newsletter-email');
        const email = emailInput.value.trim();
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-newsletter');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Subscribing...';
        submitBtn.disabled = true;
        
        // Get current date and time
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        
        // Prepare template parameters for EmailJS
        const templateParams = {
            subscriber_email: email,
            date: date,
            time: time
        };
        
        // Send email using EmailJS
        emailjs.send('service_e21w73j', 'template_nd24blx', templateParams)
            .then(function(response) {
                console.log('Newsletter subscription SUCCESS!', response.status, response.text);
                
                // Show success message
                showNotification('Thank you for subscribing! You have been added to our newsletter.', 'success');
                
                // Reset form with animation
                emailInput.value = '';
                emailInput.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    emailInput.style.transform = 'scale(1)';
                }, 200);
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Add subtle celebration animation
                newsletterForm.classList.add('success-pulse');
                setTimeout(() => {
                    newsletterForm.classList.remove('success-pulse');
                }, 1000);
            }, function(error) {
                console.log('Newsletter subscription FAILED...', error);
                
                // Show error message
                showNotification('There was an error with your subscription. Please try again.', 'error');
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
    
    // Add focus effects to newsletter input
    const newsletterInput = document.querySelector('#newsletter-email');
    if (newsletterInput) {
        newsletterInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        newsletterInput.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    }
}

// Add newsletter animation styles
const newsletterStyles = document.createElement('style');
newsletterStyles.textContent = `
    .newsletter-input-group.focused {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
    
    .newsletter-form.success-pulse {
        animation: successPulse 1s ease;
    }
    
    @keyframes successPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    .btn-newsletter:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .btn-newsletter .loading-spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
        vertical-align: middle;
    }
`;
document.head.appendChild(newsletterStyles);

// Photo Carousel Functionality
class PhotoCarousel {
    constructor() {
        this.photos = [
            {
                src: 'assets/Chez-valenti-1Up.png',
                alt: 'Chez Valenti - Master Hypnotherapist'
            },
            {
                src: 'assets/Chez-valenti-2Up.png', 
                alt: 'Chez Valenti Professional Portrait'
            },
            {
                src: 'assets/Chez-valenti-4Up.png',
                alt: 'Chez Valenti in Practice'
            },
            {
                src: 'assets/Chez-valenti-5Up.png',
                alt: 'Chez Valenti Professional Photo'
            }
        ];
        
        this.currentIndex = 0;
        this.mainPhoto = document.getElementById('mainPhoto');
        this.currentPhotoSpan = document.getElementById('currentPhoto');
        this.totalPhotosSpan = document.getElementById('totalPhotos');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.thumbnails = document.querySelectorAll('.thumbnail-item');
        
        this.init();
    }
    
    init() {
        if (!this.mainPhoto) return;
        
        // Set total photos
        this.totalPhotosSpan.textContent = this.photos.length;
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevPhoto());
        this.nextBtn.addEventListener('click', () => this.nextPhoto());
        
        // Add thumbnail click listeners
        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToPhoto(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevPhoto();
            if (e.key === 'ArrowRight') this.nextPhoto();
        });
        
        // Touch/swipe support for mobile
        let startX = null;
        this.mainPhoto.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.mainPhoto.addEventListener('touchend', (e) => {
            if (!startX) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextPhoto(); // Swipe left = next
                } else {
                    this.prevPhoto(); // Swipe right = previous
                }
            }
            startX = null;
        });
    }
    
    updatePhoto() {
        const photo = this.photos[this.currentIndex];
        
        // Fade effect
        this.mainPhoto.style.opacity = '0.3';
        
        setTimeout(() => {
            this.mainPhoto.src = photo.src;
            this.mainPhoto.alt = photo.alt;
            
            // Adjust positioning for specific photos in main view
            if (this.currentIndex === 1) {
                this.mainPhoto.style.objectPosition = 'center 25%'; // Photo 2 - show Dry Eye Center sign
            } else if (this.currentIndex === 3) {
                this.mainPhoto.style.objectPosition = 'center 20%'; // Photo 4 - show head properly
            } else {
                this.mainPhoto.style.objectPosition = 'center center'; // Default for photos 1 & 3
            }
            
            this.mainPhoto.style.opacity = '1';
        }, 200);
        
        // Update counter
        this.currentPhotoSpan.textContent = this.currentIndex + 1;
        
        // Update active thumbnail
        this.thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextPhoto() {
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
        this.updatePhoto();
    }
    
    prevPhoto() {
        this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
        this.updatePhoto();
    }
    
    goToPhoto(index) {
        this.currentIndex = index;
        this.updatePhoto();
    }
}

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize photo carousel
    new PhotoCarousel();
    
    console.log('Chez Valenti website initialized successfully');
});
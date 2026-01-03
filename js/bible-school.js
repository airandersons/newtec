// VBI Bible School Page JavaScript

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.querySelector('.main-nav ul');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (mainNav && mobileMenuBtn && !mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mainNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = Number(stat.dataset.count);
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// Tab functionality for programs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabId) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    // Update active tab button
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
        }
    });
}

// Initialize tab functionality
if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Application form handling
const vbiApplicationForm = document.getElementById('vbiApplicationForm');

if (vbiApplicationForm) {
    vbiApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--accent)';
                
                // Add error message
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = 'var(--accent)';
                    errorMsg.style.fontSize = '0.9rem';
                    errorMsg.style.marginTop = '0.5rem';
                    field.parentNode.appendChild(errorMsg);
                }
            } else {
                field.style.borderColor = '';
                
                // Remove error message if exists
                const errorMsg = field.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
        
        // Check checkbox
        const checkbox = this.querySelector('input[type="checkbox"]');
        if (checkbox && !checkbox.checked) {
            isValid = false;
            checkbox.parentNode.style.color = 'var(--accent)';
        } else if (checkbox) {
            checkbox.parentNode.style.color = '';
        }
        
        if (isValid) {
            // In a real implementation, you would send this data to a server
            alert('Thank you for your application request! Our admissions team will contact you within 2 business days.');
            this.reset();
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mainNav) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            // Calculate scroll position
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Trigger stats animation if it's the stats section
            if (element.classList.contains('vbi-stats')) {
                animateStats();
            }
            
            // Add animation class based on existing animation class
            if (element.classList.contains('animate-fade-up') || 
                element.classList.contains('animate-slide-up') ||
                element.classList.contains('animate-slide-left') ||
                element.classList.contains('animate-slide-right') ||
                element.classList.contains('animate-scale-in')) {
                element.style.animationPlayState = 'running';
            }
        }
    });
}, observerOptions);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('#currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.why-vbi-card, .faculty-card, .tuition-card, .step-circle');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove('active');
            if (index === currentTestimonial) {
                testimonial.classList.add('active');
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    
    // Auto-rotate testimonials every 8 seconds
    if (testimonials.length > 1) {
        setInterval(rotateTestimonials, 8000);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 768 && mainNav) {
        mainNav.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
});

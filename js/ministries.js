// Ministries Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Animate ministry stats on hero section
    animateMinistryStats();
    
    // Initialize ministry cards animation
    initMinistryCards();
    
    // Handle ministry interest form submission
    handleMinistryForm();
    
    // Add scroll animations for ministries page
    initMinistryAnimations();
    
    // Set current year in footer
    setCurrentYear();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNavList = document.getElementById('mainNavList');
    
    if (mobileMenuBtn && mainNavList) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNavList.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mainNavList.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNavList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = mainNavList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNavList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Animate the ministry statistics counters
function animateMinistryStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = Number(stat.dataset.count);
        let current = 0;
        const increment = target / 60;
        const delay = Math.random() * 500; // Stagger animations
        
        setTimeout(() => {
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 25);
        }, delay);
    });
}

// Add hover effects and animations to ministry cards
function initMinistryCards() {
    const ministryCards = document.querySelectorAll('.ministry-card');
    
    ministryCards.forEach(card => {
        // Add hover effect for images
        const ministryImage = card.querySelector('.ministry-image');
        if (ministryImage) {
            card.addEventListener('mouseenter', () => {
                ministryImage.style.transform = 'scale(1.05)';
                ministryImage.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                ministryImage.style.transform = 'scale(1)';
            });
        }
        
        // Add click effect for join buttons
        const joinButton = card.querySelector('.ministry-btn');
        if (joinButton) {
            joinButton.addEventListener('click', function(e) {
                e.preventDefault();
                const ministryName = card.querySelector('h3').textContent;
                showMinistryModal(ministryName);
            });
        }
    });
}

// Show modal when clicking join ministry button
function showMinistryModal(ministryName) {
    // Create modal HTML
    const modalHTML = `
        <div class="ministry-modal" id="ministryModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>Join ${ministryName}</h3>
                <p>Thank you for your interest in joining our ${ministryName}!</p>
                <p>Our ministry leader will contact you within 24-48 hours with more information about getting started.</p>
                
                <div class="modal-form">
                    <input type="text" placeholder="Your Name" id="modalName">
                    <input type="email" placeholder="Email Address" id="modalEmail">
                    <input type="tel" placeholder="Phone Number" id="modalPhone">
                    <textarea placeholder="Any specific questions or comments?" rows="3" id="modalMessage"></textarea>
                    <button class="btn btn-primary" id="modalSubmit">Submit Information</button>
                </div>
                
                <p class="modal-note">You can also contact the ministry leader directly using the information on the ministry card.</p>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('ministryModal');
    const closeBtn = modal.querySelector('.modal-close');
    const submitBtn = modal.querySelector('#modalSubmit');
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close modal when clicking outside
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    }
    
    // Handle form submission
    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('modalName').value;
        const email = document.getElementById('modalEmail').value;
        
        if (name && email) {
            // In a real implementation, this would send data to a server
            alert(`Thank you ${name}! Your interest in ${ministryName} has been submitted. We'll contact you at ${email} soon.`);
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        } else {
            alert('Please provide at least your name and email address.');
        }
    });
    
    // Add modal styles if not already present
    if (!document.querySelector('#ministryModalStyles')) {
        const modalStyles = `
            <style id="ministryModalStyles">
                .ministry-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 3000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                    padding: 20px;
                }
                
                .ministry-modal.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.85);
                }
                
                .modal-content {
                    background-color: white;
                    border-radius: var(--border-radius);
                    padding: 3rem;
                    max-width: 500px;
                    width: 100%;
                    position: relative;
                    z-index: 2;
                    transform: translateY(30px);
                    transition: transform 0.3s;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                
                .ministry-modal.active .modal-content {
                    transform: translateY(0);
                }
                
                .modal-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--gray);
                    line-height: 1;
                    transition: color 0.3s;
                    z-index: 3;
                }
                
                .modal-close:hover {
                    color: var(--accent);
                }
                
                .modal-icon {
                    width: 80px;
                    height: 80px;
                    background-color: var(--secondary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                    color: var(--dark);
                    font-size: 2.5rem;
                }
                
                .modal-content h3 {
                    text-align: center;
                    color: var(--primary);
                    margin-bottom: 1.5rem;
                    font-family: var(--font-heading);
                }
                
                .modal-content p {
                    text-align: center;
                    color: var(--gray);
                    margin-bottom: 1rem;
                    font-family: var(--font-main);
                }
                
                .modal-form {
                    margin: 2rem 0;
                }
                
                .modal-form input,
                .modal-form textarea {
                    width: 100%;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border: 1px solid var(--light-gray);
                    border-radius: 8px;
                    font-family: var(--font-main);
                    font-size: 1rem;
                }
                
                .modal-form textarea {
                    min-height: 100px;
                    resize: vertical;
                }
                
                .modal-form button {
                    width: 100%;
                    justify-content: center;
                }
                
                .modal-note {
                    font-size: 0.9rem;
                    color: var(--gray);
                    font-style: italic;
                    font-family: var(--font-main);
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }
}

// Handle main ministry interest form submission
function handleMinistryForm() {
    const form = document.getElementById('ministryInterestForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const ministry = form.querySelector('select').value;
            
            // Simple validation
            if (name && email && ministry) {
                // In a real implementation, send to server
                alert(`Thank you ${name}! Your interest in ${ministry} ministry has been received. We'll contact you at ${email} within 24-48 hours.`);
                
                // Reset form
                form.reset();
                
                // Scroll to top of form
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('Please fill in all required fields: Name, Email, and Ministry Interest.');
            }
        });
    }
}

// Initialize scroll animations for ministries page
function initMinistryAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special handling for stats if they come into view
                if (entry.target.classList.contains('ministry-stats')) {
                    animateMinistryStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        observer.observe(el);
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal links
            if (href === '#' || href.startsWith('#!')) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
                    }

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

// Image gallery functionality
const thumbnails = document.querySelectorAll('.thumbnail');
const galleryImg = document.querySelector('.gallery-img');

if (thumbnails && galleryImg) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Get the new image source
            const newImage = thumbnail.getAttribute('data-image');
            
            // Fade out current image
            galleryImg.style.opacity = '0';
            
            // Wait for fade out then change image and fade in
            setTimeout(() => {
                galleryImg.src = newImage;
                galleryImg.style.opacity = '1';
            }, 300);
        });
    });
}

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 30);
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Add scroll animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    animatedElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            
            // Trigger stats animation if it's the stats section
            if (element.classList.contains('stats-grid')) {
                animateStats();
            }
        }
    });
}

// Parallax effect for hero background
function updateParallax() {
    const scrollPosition = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
}

// Play button functionality for sermon video
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // In a real implementation, this would trigger the YouTube player
        alert('In the live website, this would play the latest sermon video. For now, please visit our YouTube channel.');
        window.open('https://youtube.com/@newtestamentevangelicalchu8693?si=mDZGXb1qoIEl_plF', '_blank');
    });
}

// Image modal functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const modalClose = document.querySelector('.modal-close');

// Open modal when clicking on gallery images
if (galleryImg && imageModal && modalImage) {
    galleryImg.addEventListener('click', () => {
        modalImage.src = galleryImg.src;
        imageModal.classList.add('active');
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
    });
}

// Close modal when clicking outside image
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations for elements already in viewport
    handleScrollAnimations();
    
    // Add hover effect to time cards
    const timeCards = document.querySelectorAll('.time-card');
    timeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});

// Event listeners for scroll and resize
window.addEventListener('scroll', () => {
    updateParallax();
    handleScrollAnimations();
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 768 && mainNav) {
        mainNav.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
});

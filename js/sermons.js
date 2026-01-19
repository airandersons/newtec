// Sermons & Media Page JavaScript

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
                stat.textContent = target.toLocaleString(); // Add commas for large numbers
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    });
}

// Live stream countdown
function updateCountdown() {
    // Set next Sunday at 9:00 AM
    const now = new Date();
    const nextSunday = new Date();
    
    // Get days until next Sunday (0 = Sunday, 1 = Monday, etc.)
    const daysUntilSunday = (7 - now.getDay()) % 7;
    nextSunday.setDate(now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
    nextSunday.setHours(9, 0, 0, 0);
    
    // If today is Sunday and before 9 AM, use today
    if (now.getDay() === 0 && now.getHours() < 9) {
        nextSunday.setDate(now.getDate());
    }
    
    const timeDiff = nextSunday - now;
    
    // If we're currently in a live stream (Sunday 9AM-11:30AM)
    if (now.getDay() === 0 && now.getHours() >= 9 && now.getHours() < 11) {
        document.querySelector('.live-text').textContent = 'LIVE NOW';
        document.querySelector('.countdown').style.display = 'none';
        return;
    }
    
    // If we're in evening service (Sunday 5PM-6:30PM)
    if (now.getDay() === 0 && now.getHours() >= 17 && now.getHours() < 18) {
        document.querySelector('.live-text').textContent = 'LIVE NOW';
        document.querySelector('.countdown').style.display = 'none';
        return;
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

// Sermon filtering functionality
const filterOptions = document.querySelectorAll('.filter-option');
const sermonCards = document.querySelectorAll('.sermon-card');

function filterSermons(category) {
    sermonCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize filter functionality
if (filterOptions.length > 0) {
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Filter sermons
            const category = option.getAttribute('data-filter');
            filterSermons(category);
        });
    });
}

// Sort functionality
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const container = document.querySelector('.sermons-grid');
        const cards = Array.from(sermonCards);
        
        switch(sortBy) {
            case 'newest':
                cards.sort((a, b) => {
                    // Sort by date - newest first
                    // In a real implementation, you would use actual dates
                    return -1; // Placeholder
                });
                break;
            case 'oldest':
                cards.sort((a, b) => {
                    // Sort by date - oldest first
                    return 1; // Placeholder
                });
                break;
            case 'popular':
                cards.sort((a, b) => {
                    // Sort by views - most popular first
                    return -1; // Placeholder
                });
                break;
        }
        
        // Reappend cards in sorted order
        cards.forEach(card => {
            container.appendChild(card);
        });
    });
}

// Load more functionality
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // In a real implementation, this would load more sermons from an API
        // For now, just show a message
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Sermons Loaded';
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.remove('btn-outline');
        loadMoreBtn.classList.add('btn-secondary');
        
        // Update count
        document.querySelector('.total-sermons').textContent = 'Showing all 423 sermons';
    });
}

// Audio player functionality
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const volumeSlider = document.querySelector('.volume-slider');

let isPlaying = false;
let currentTime = 942; // 15:42 in seconds
let totalTime = 2722; // 45:22 in seconds

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const progress = (currentTime / totalTime) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(totalTime);
}

if (playBtn) {
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        
        if (isPlaying) {
            // Simulate playback
            const interval = setInterval(() => {
                if (currentTime < totalTime) {
                    currentTime += 1;
                    updateProgress();
                } else {
                    clearInterval(interval);
                    isPlaying = false;
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }, 1000);
            
            // Store interval ID to clear later
            playBtn.dataset.interval = interval;
        } else {
            clearInterval(playBtn.dataset.interval);
        }
    });
}

if (progressBar) {
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        currentTime = Math.floor(pos * totalTime);
        updateProgress();
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        // In a real implementation, this would control audio volume
        console.log(`Volume set to ${volume}%`);
    });
}

// Share modal functionality
const shareModal = document.getElementById('shareModal');
const shareBtns = document.querySelectorAll('.btn-share');
const modalClose = document.querySelector('.modal-close');

function openShareModal() {
    shareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    shareModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (shareBtns.length > 0) {
    shareBtns.forEach(btn => {
        btn.addEventListener('click', openShareModal);
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeShareModal);
}

// Close modal when clicking outside
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        closeShareModal();
    }
});

// Copy link functionality
const copyBtn = document.querySelector('.share-link .btn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const linkInput = document.querySelector('.share-link input');
        linkInput.select();
        document.execCommand('copy');
        
        // Show confirmation
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('btn-primary');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('btn-primary');
        }, 2000);
    });
}

// Newsletter form handling
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to sermon notifications!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

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
            if (element.classList.contains('youtube-stats')) {
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
    
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    
    // Initialize progress display
    updateProgress();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.sermon-card, .series-card, .sidebar-sermon-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // YouTube redirect confirmation
    const youtubeLinks = document.querySelectorAll('a[href*="youtube.com"]');
    youtubeLinks.forEach(link => {
        if (link.getAttribute('target') === '_blank') {
            link.addEventListener('click', (e) => {
                // Optional: Add analytics tracking here
                console.log(`YouTube link clicked: ${link.href}`);
            });
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 768 && mainNav) {
        mainNav.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
    
    // Close share modal on mobile
    if (window.innerWidth < 768 && shareModal.classList.contains('active')) {
        closeShareModal();
    }
});

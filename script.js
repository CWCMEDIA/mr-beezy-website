// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNav();
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initLoadingAnimation();
    initVideoModal();
    initLogoVideo();
});

// ===== MOBILE NAVIGATION =====
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
    
    // Hero video volume fade on scroll
    initHeroVideoVolumeFade();
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email) {
                showNotification('Please fill in your name and email.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! Your booking request has been sent. We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
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

// ===== LOADING ANIMATION =====
function initLoadingAnimation() {
    // Create loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }, 1000);
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ADDITIONAL ENHANCEMENTS =====

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }, 16));
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title-main');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
}

// Counter animation for stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initTypingEffect();
    initCounterAnimation();
});

// ===== VIDEO CONTROLS =====
function initVideoModal() {
    const video = document.querySelector('.hero-video');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    
    if (video && playPauseBtn) {
        // Update button state based on video state
        video.addEventListener('play', function() {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        });
        
        video.addEventListener('pause', function() {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        });
        
        // Handle play/pause button click
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Handle mute/unmute functionality
        const muteBtn = document.getElementById('muteBtn');
        const muteIcon = muteBtn.querySelector('.mute-icon');
        const unmuteIcon = muteBtn.querySelector('.unmute-icon');
        
        if (muteBtn) {
            muteBtn.addEventListener('click', function() {
                if (video.muted) {
                    video.muted = false;
                    muteIcon.style.display = 'none';
                    unmuteIcon.style.display = 'block';
                } else {
                    video.muted = true;
                    muteIcon.style.display = 'block';
                    unmuteIcon.style.display = 'none';
                }
            });
        }
        
        // Show controls on video hover
        const videoContainer = document.querySelector('.hero-video-container');
        videoContainer.addEventListener('mouseenter', function() {
            document.querySelector('.video-overlay').style.opacity = '1';
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            document.querySelector('.video-overlay').style.opacity = '0';
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images (if added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== PORTAL CARD INTERACTIONS =====
function initPortalCardInteractions() {
    const portalCard = document.querySelector('.portal-card');
    if (portalCard) {
        // Mouse tracking effect
        portalCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        portalCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        });

        // Add ripple effect on click
        portalCard.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(220, 38, 38, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1000';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize portal card interactions
document.addEventListener('DOMContentLoaded', function() {
    initPortalCardInteractions();
});

// ===== IMAGE MODAL FUNCTIONALITY =====
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeImageModal();
        }
    });
});

// ===== HERO VIDEO VOLUME FADE =====
function initHeroVideoVolumeFade() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Set initial volume and mute state
        heroVideo.volume = 1;
        heroVideo.muted = true; // Start muted for autoplay compatibility
        
        // Get hero section height for calculations
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        
        // Throttle scroll events for performance
        let ticking = false;
        
        function updateVideoVolume() {
            const scrollY = window.scrollY;
            const heroBottom = heroHeight;
            
            // Calculate volume based on scroll position
            let volume = 1;
            
            if (scrollY > 0) {
                // Start fading when we begin scrolling
                const fadeStart = 0;
                const fadeEnd = heroBottom * 0.8; // Fade to mute by 80% of hero height
                
                if (scrollY >= fadeEnd) {
                    volume = 0; // Fully muted
                } else if (scrollY > fadeStart) {
                    // Linear fade from 1 to 0
                    volume = 1 - (scrollY / fadeEnd);
                }
            }
            
            // Apply volume with smooth transition
            heroVideo.volume = Math.max(0, Math.min(1, volume));
            
            ticking = false;
        }
        
        // Handle scroll events
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateVideoVolume);
                ticking = true;
            }
        });
        
        // Unmute video on first user interaction
        function unmuteVideo() {
            if (heroVideo.muted) {
                heroVideo.muted = false;
                // Remove muted indicator
                const videoContainer = heroVideo.closest('.hero-video-container');
                if (videoContainer) {
                    videoContainer.classList.remove('muted');
                }
                // Remove event listeners after unmuting
                document.removeEventListener('click', unmuteVideo);
                document.removeEventListener('keydown', unmuteVideo);
                document.removeEventListener('touchstart', unmuteVideo);
                document.removeEventListener('scroll', unmuteVideo);
                document.removeEventListener('mousemove', unmuteVideo);
            }
        }
        
        // Add muted indicator
        const videoContainer = heroVideo.closest('.hero-video-container');
        if (videoContainer) {
            videoContainer.classList.add('muted');
        }
        
        // Add event listeners for user interaction
        document.addEventListener('click', unmuteVideo);
        document.addEventListener('keydown', unmuteVideo);
        document.addEventListener('touchstart', unmuteVideo);
        document.addEventListener('scroll', unmuteVideo);
        document.addEventListener('mousemove', unmuteVideo);
        
        // Initial volume update
        updateVideoVolume();
        
        // Ensure video plays on page load
        heroVideo.addEventListener('loadedmetadata', function() {
            this.play().catch(function(error) {
                console.log('Autoplay failed:', error);
            });
        });
    }
}

// ===== LOGO VIDEO HANDLING =====
function initLogoVideo() {
    const logoVideo = document.querySelector('.logo-background-video');
    const navLogo = document.querySelector('.nav-logo');
    
    if (logoVideo) {
        // Show loading state
        logoVideo.style.opacity = '0';
        
        // Force video to load and play
        logoVideo.load();
        
        // When video can start playing
        logoVideo.addEventListener('canplay', function() {
            this.classList.add('loaded');
            this.style.opacity = '1';
            if (navLogo) {
                navLogo.classList.add('video-loaded');
            }
            // Ensure it plays
            this.play().catch(function(error) {
                console.log('Logo video play failed:', error);
            });
        });
        
        // When video ends, pause it to keep the final frame
        logoVideo.addEventListener('ended', function() {
            this.pause();
            // Optional: Add a subtle effect to indicate it's "dried"
            this.style.filter = 'brightness(1.1) contrast(1.05)';
        });
        
        // Ensure video plays on page load/refresh
        logoVideo.addEventListener('loadedmetadata', function() {
            this.currentTime = 0;
            this.play().catch(function(error) {
                console.log('Logo video autoplay failed:', error);
            });
        });
        
        // Handle video loading errors
        logoVideo.addEventListener('error', function() {
            console.log('Logo video failed to load');
            // Keep the fallback background visible
            if (navLogo) {
                navLogo.classList.remove('video-loaded');
            }
        });
        
        // Add timeout for slow connections
        setTimeout(() => {
            if (logoVideo.readyState < 2) { // HAVE_CURRENT_DATA
                console.log('Video taking too long to load, showing fallback');
                if (navLogo) {
                    navLogo.classList.remove('video-loaded');
                }
            }
        }, 3000); // 3 second timeout
        
        // Force play after a short delay for Safari
        setTimeout(() => {
            if (logoVideo.paused) {
                logoVideo.play().catch(function(error) {
                    console.log('Delayed logo video play failed:', error);
                });
            }
        }, 100);
    }
} 
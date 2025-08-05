// Portal Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
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

    // Add hover effects for motivation cards
    const motivationCards = document.querySelectorAll('.motivation-card');
    motivationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize logo video handling
    initLogoVideo();
});

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
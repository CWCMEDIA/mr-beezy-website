// Content Manager for Mr Beezy Website
// Makes ALL existing text on the website editable through portal.mediacwc.com

class ContentManager {
    constructor() {
        this.apiKey = 'mcwc_zcZGca8WprPUpQvklS7hnBQTQcTcVJYB';
        this.domain = window.location.hostname;
        this.content = null;
        this.init();
    }

    async init() {
        // Store API key for persistence
        localStorage.setItem('mr_beezy_api_key', this.apiKey);
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.makeAllTextEditable();
                this.fetchCustomContent();
            });
        } else {
            this.makeAllTextEditable();
            this.fetchCustomContent();
        }
        
        // Set up periodic content refresh (every 5 minutes)
        setInterval(() => {
            this.fetchCustomContent();
        }, 5 * 60 * 1000);
    }

    makeAllTextEditable() {
        console.log('🔍 Scanning website for real content...');
        
        // Make all text elements editable by scanning the actual page
        this.scanAndMakeEditable();
        
        console.log('✅ All real text on website is now editable through portal.mediacwc.com');
    }

    scanAndMakeEditable() {
        // Get all text-containing elements
        const textElements = this.getAllTextElements();
        
        // Map specific sections to portal-expected keys
        this.mapSpecificSections();
        
        // Make remaining elements editable with generic keys
        textElements.forEach((element, index) => {
            const text = element.textContent.trim();
            if (text && text.length > 0 && !element.hasAttribute('data-content-key')) {
                // Create a unique key based on content and position
                const key = this.generateContentKey(element, text, index);
                
                // Make this element editable
                this.makeElementEditable(element, key, text);
            }
        });
    }

    mapSpecificSections() {
        // Map specific sections to the format your portal expects
        const sectionMappings = {
            // Hero Section
            'hero-title': '.hero-title-main, .hero-title-sub',
            'hero-subtitle': '.hero-title-sub',
            'hero-description': '.hero-description',
            'hero-cta': '.hero-buttons .btn, .hero-cta-button',
            
            // About Section
            'about-title': '#about .section-title, .about-title',
            'about-subtitle': '#about .about-text h3, .about-subtitle',
            'about-paragraph1': '#about .about-text p:first-of-type',
            'about-paragraph2': '#about .about-text p:nth-of-type(2)',
            'about-stats-people': '#about .stat:nth-child(1) .stat-number',
            'about-stats-institutions': '#about .stat:nth-child(2) .stat-number',
            'about-stats-years': '#about .stat:nth-child(3) .stat-number',
            'about-cta': '#about .about-cta-button .btn, .about-cta',
            
            // Services Section
            'services-title': '#services .section-title, .services-title',
            'service-corporate-title': '.service-card:nth-child(1) h3',
            'service-corporate-description': '.service-card:nth-child(1) p',
            'service-education-title': '.service-card:nth-child(2) h3',
            'service-education-description': '.service-card:nth-child(2) p',
            'service-sports-title': '.service-card:nth-child(3) h3',
            'service-sports-description': '.service-card:nth-child(3) p',
            'service-personal-title': '.service-card:nth-child(4) h3',
            'service-personal-description': '.service-card:nth-child(4) p',
            'service-portal-title': '.service-card:nth-child(5) h3',
            'service-portal-description': '.service-card:nth-child(5) p',
            'service-portal-cta': '.service-card:nth-child(5) .btn',
            
            // Previous Visits
            'previous-visits-title': '.mr-beezy-action .section-title',
            'previous-visits-education': '.action-videos .video-card:nth-child(1) h3',
            'previous-visits-corporate': '.action-videos .video-card:nth-child(2) h3',
            'previous-visits-sports': '.action-videos .video-card:nth-child(3) h3',
            
            // Testimonials
            'testimonials-title': '#testimonials .section-title',
            'testimonial-corporate-title': '.testimonial-card:nth-child(1) .author-info h4',
            'testimonial-corporate-subtitle': '.testimonial-card:nth-child(1) .author-info span',
            'testimonial-education-title': '.testimonial-card:nth-child(2) .author-info h4',
            'testimonial-education-subtitle': '.testimonial-card:nth-child(2) .author-info span',
            'testimonial-sports-title': '.testimonial-card:nth-child(3) .author-info h4',
            'testimonial-sports-subtitle': '.testimonial-card:nth-child(3) .author-info span',
            
            // Contact Section
            'contact-title': '#contact .section-title, .contact-title',
            'contact-subtitle': '#contact .section-subtitle, .contact-subtitle',
            'contact-email': '#contact .contact-item:nth-child(1) p, .contact-email',
            'contact-phone': '#contact .contact-item:nth-child(2) p, .contact-phone',
            'contact-form-button': '#contact #booking-form button, .contact-form-button',
            
            // Footer
            'footer-tagline': '.footer-section:nth-child(1) p, .footer-tagline',
            'footer-quick-links': '.footer-section:nth-child(2) h4, .footer-quick-links',
            'footer-services': '.footer-section:nth-child(3) h4, .footer-services',
            'footer-connect': '.footer-section:nth-child(4) h4, .footer-connect',
            'footer-copyright': '.footer-bottom p, .footer-copyright',
            
            // Exit Intent Popup
            'exit-intent-title': '#exitIntentPopup .exit-popup-title',
            'exit-intent-message': '#exitIntentPopup .exit-popup-message',
            'exit-intent-primary-button': '#exitIntentPopup .transform-btn',
            'exit-intent-secondary-button': '#exitIntentPopup .stay-btn',
            
            // Brand Section
            'brand-strapline-title': '.brand-strapline-title'
        };
        
        // Apply the mappings
        Object.keys(sectionMappings).forEach(key => {
            const selector = sectionMappings[key];
            const element = document.querySelector(selector);
            if (element) {
                const text = element.textContent.trim();
                if (text) {
                    this.makeElementEditable(element, key, text);
                }
            }
        });
    }

    getAllTextElements() {
        // Get all elements that contain text
        const selectors = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // Headings
            'p', 'span', 'div', 'a', 'button', 'label', // Text elements
            'li', 'td', 'th' // List and table elements
        ];
        
        let elements = [];
        selectors.forEach(selector => {
            const found = document.querySelectorAll(selector);
            elements = elements.concat(Array.from(found));
        });
        
        // Filter out elements that are children of already selected elements
        elements = elements.filter(element => {
            return !elements.some(other => 
                other !== element && other.contains(element)
            );
        });
        
        return elements;
    }

    generateContentKey(element, text, index) {
        // Create a meaningful key based on the element and content
        let key = '';
        
        // Try to get a meaningful identifier
        if (element.id) {
            key = element.id;
        } else if (element.className) {
            const classes = element.className.split(' ').filter(c => c.length > 0);
            if (classes.length > 0) {
                key = classes[0];
            }
        }
        
        // If no good identifier, create one from content
        if (!key || key.length < 3) {
            key = this.createKeyFromText(text);
        }
        
        // Add index to ensure uniqueness
        key = `${key}-${index}`;
        
        return key;
    }

    createKeyFromText(text) {
        // Create a key from the text content
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .substring(0, 20);
    }

    makeElementEditable(element, key, originalText) {
        // Add data attributes for content management
        element.setAttribute('data-content-key', key);
        element.setAttribute('data-content-original', originalText);
        element.setAttribute('data-content-editable', 'true');
        
        // Store the element reference
        if (!this.contentElements) this.contentElements = {};
        this.contentElements[key] = element;
    }

    async fetchCustomContent() {
        try {
            const response = await fetch(`https://portal.mediacwc.com/api/website-content/${this.domain}`, {
                method: 'GET',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.content) {
                    this.updateWithCustomContent(data.content);
                    console.log('✅ Content updated from portal');
                }
            } else {
                console.debug('Portal content fetch failed (using original content):', response.status);
            }
        } catch (error) {
            // Silently fail - website continues to work with original content
            console.debug('Portal content fetch failed (using original content):', error.message);
        }
    }

    updateWithCustomContent(customContent) {
        // Update any custom content from portal
        Object.keys(customContent).forEach(key => {
            const element = document.querySelector(`[data-content-key="${key}"]`);
            if (element && customContent[key]) {
                element.textContent = customContent[key];
            }
        });
    }

    // Method to get all editable content keys
    getAllEditableKeys() {
        const keys = [];
        document.querySelectorAll('[data-content-key]').forEach(el => {
            keys.push(el.getAttribute('data-content-key'));
        });
        return keys;
    }

    // Method to export current content for portal
    exportCurrentContent() {
        const content = {};
        document.querySelectorAll('[data-content-key]').forEach(el => {
            const key = el.getAttribute('data-content-key');
            const text = el.textContent.trim();
            
            // Only include meaningful content (not empty or just whitespace)
            if (text && text.length > 0 && text !== '\n' && text !== ' ') {
                content[key] = text;
            }
        });
        return content;
    }

    // Method to reset to original content
    resetToOriginal() {
        document.querySelectorAll('[data-content-key]').forEach(el => {
            const original = el.getAttribute('data-content-original');
            if (original) {
                el.textContent = original;
            }
        });
    }

    // Method to show all editable content
    showAllEditableContent() {
        const content = this.exportCurrentContent();
        console.log('=== All Editable Content on Website ===');
        Object.keys(content).forEach(key => {
            console.log(`${key}: "${content[key]}"`);
        });
        return content;
    }

    // Get current content
    getContent() {
        return this.exportCurrentContent();
    }

    // Check if content is loaded from API
    isUsingApiContent() {
        return this.apiKey !== null;
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.contentManager = new ContentManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
}

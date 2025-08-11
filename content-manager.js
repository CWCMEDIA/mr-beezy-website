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
        console.log('🔍 Mapping Mr Beezy website content...');
        
        // Directly map the specific content elements
        this.mapSpecificContent();
        
        console.log('✅ All Mr Beezy content is now editable through portal.mediacwc.com');
    }

    mapSpecificContent() {
        // Direct mapping to actual content elements on the page
        const contentMap = [
            // Hero Section - These are the ACTUAL elements on your page
            { key: 'hero-title', selector: '.hero-title-main', expectedText: 'MOTIVATIONAL SPEAKER' },
            { key: 'hero-subtitle', selector: '.hero-title-sub', expectedText: 'MR BEEZY' },
            { key: 'hero-description', selector: '.hero-description', expectedText: 'BECOME THE MOST SUCCESSFUL VERSION OF YOURSELF WITH MR BEEZY' },
            { key: 'hero-cta', selector: '.hero-buttons .btn', expectedText: 'BOOK MR BEEZY' },
            
            // Brand Section
            { key: 'brand-strapline-title', selector: '.brand-strapline-title', expectedText: 'Trusted by Leading Brands' },
            
            // About Section
            { key: 'about-title', selector: '#about .section-title', expectedText: 'About Mr Beezy' },
            { key: 'about-subtitle', selector: '#about .about-text h3', expectedText: 'Meet Mr Beezy' },
            { key: 'about-paragraph1', selector: '#about .about-text p:first-of-type', expectedText: 'Mr Beezy is an award winning motivational speaker, leadership coach and founder of Mr Beezy Ltd, with over 14 years of experience empowering individuals and organisations to unlock peak performance. Having delivered keynote sessions and training to over 100,000 people across more than 500 educational institutions and corporate settings, he brings a unique ability to inspire, engage and drive real change.' },
            { key: 'about-paragraph2', selector: '#about .about-text p:nth-of-type(2)', expectedText: 'From Fortune 500 companies to leading UK schools and universities, Mr Beezy is trusted by senior leaders, educators and executives for his powerful blend of storytelling, strategy and mindset transformation. His philosophy "No Grind, No Glory" champions discipline, resilience and accountability as the foundations of long term success.' },
            
            // Services Section
            { key: 'services-title', selector: '#services .section-title', expectedText: 'Speaking Services' },
            
            // Corporate service
            { key: 'service-corporate-title', selector: '.service-card:nth-child(1) h3', expectedText: 'Corporate' },
            { key: 'service-corporate-description', selector: '.service-card:nth-child(1) p', expectedText: 'Energize your team with powerful motivation and leadership insights that drive results and boost morale.' },
            
            // Education service
            { key: 'service-education-title', selector: '.service-card:nth-child(2) h3', expectedText: 'Education' },
            { key: 'service-education-description', selector: '.service-card:nth-child(2) p', expectedText: 'Inspire students and educators with messages of perseverance, goal-setting, and personal excellence.' },
            
            // Sports service
            { key: 'service-sports-title', selector: '.service-card:nth-child(3) h3', expectedText: 'Sports' },
            { key: 'service-sports-description', selector: '.service-card:nth-child(3) p', expectedText: 'Unlock peak performance with mental toughness training and athletic motivation strategies.' },
            
            // Personal Development service
            { key: 'service-personal-title', selector: '.service-card:nth-child(4) h3', expectedText: 'Personal Development' },
            { key: 'service-personal-description', selector: '.service-card:nth-child(4) p', expectedText: 'Transform individual lives through one-on-one coaching and small group sessions.' },
            
            // Portal service
            { key: 'service-portal-title', selector: '.service-card:nth-child(5) h3', expectedText: 'Motivation Portal' },
            { key: 'service-portal-description', selector: '.service-card:nth-child(5) p', expectedText: 'Access specialized motivation content and resources tailored to your specific needs and goals.' },
            
            // Previous Visits
            { key: 'previous-visits-title', selector: '.mr-beezy-action .section-title', expectedText: 'Previous Visits' },
            { key: 'previous-visits-education', selector: '.action-videos .video-card:nth-child(1) h3', expectedText: 'Education' },
            { key: 'previous-visits-corporate', selector: '.action-videos .video-card:nth-child(2) h3', expectedText: 'Corporate' },
            { key: 'previous-visits-sports', selector: '.action-videos .video-card:nth-child(3) h3', expectedText: 'Sports' },
            
            // Testimonials
            { key: 'testimonials-title', selector: '#testimonials .section-title', expectedText: 'What Clients Say' },
            
            // Contact Section
            { key: 'contact-title', selector: '#contact .section-title', expectedText: 'Contact Mr Beezy' },
            { key: 'contact-subtitle', selector: '#contact .contact-subtitle', expectedText: 'Get in touch to book your next event' },
            
            // Footer
            { key: 'footer-copyright', selector: '.footer .copyright', expectedText: '© 2024 Mr Beezy Ltd. All rights reserved.' }
        ];

        // Apply the mappings
        contentMap.forEach(item => {
            const element = document.querySelector(item.selector);
            
            if (element) {
                const actualText = element.textContent.trim();
                if (actualText && actualText.length > 0) {
                    // Make this element editable with the specific key
                    this.makeElementEditable(element, item.key, actualText);
                    console.log(`✅ Mapped: ${item.key} = "${actualText}"`);
                    
                    // Check if this matches expected text
                    if (item.expectedText && actualText !== item.expectedText) {
                        console.warn(`⚠️ Text mismatch for ${item.key}: Expected "${item.expectedText}", got "${actualText}"`);
                    }
                }
            } else {
                console.warn(`⚠️ Element not found for selector: ${item.selector} (key: ${item.key})`);
            }
        });

        // Also scan for any other text elements that might not be mapped
        this.scanRemainingElements();
    }

    scanRemainingElements() {
        // Get all text-containing elements that don't have data-content-key
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label');
        
        textElements.forEach((element, index) => {
            if (!element.hasAttribute('data-content-key') && element.textContent.trim()) {
                const text = element.textContent.trim();
                if (text && text.length > 0 && text !== '\n' && text !== ' ') {
                    // Create a unique key based on content and position
                    const key = this.generateContentKey(element, text, index);
                    
                    // Make this element editable
                    this.makeElementEditable(element, key, text);
                }
            }
        });
    }

    generateContentKey(element, text, index) {
        // Try to create a meaningful key from the text
        let key = this.createKeyFromText(text);
        
        // If the key is too generic, add element type and position
        if (key.length < 3 || key === 'text') {
            const tagName = element.tagName.toLowerCase();
            const className = element.className ? element.className.split(' ')[0] : '';
            key = `${tagName}-${className || 'item'}-${index}`;
        }
        
        return key;
    }

    createKeyFromText(text) {
        // Convert text to a key format
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 30);
    }

    makeElementEditable(element, key, originalText) {
        // Store original text
        element.setAttribute('data-content-original', originalText);
        
        // Add content key for portal identification
        element.setAttribute('data-content-key', key);
        
        // Add visual indicator for editable content
        element.style.cursor = 'pointer';
        element.title = `Editable content (${key})`;
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
            element.style.borderRadius = '4px';
            element.style.padding = '2px 4px';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.backgroundColor = '';
            element.style.borderRadius = '';
            element.style.padding = '';
        });
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

    // Method to test content mapping
    testContentMapping() {
        console.log('🧪 Testing Content Mapping...');
        console.log('Current domain:', this.domain);
        console.log('API Key:', this.apiKey);
        
        const mappedElements = document.querySelectorAll('[data-content-key]');
        console.log(`Found ${mappedElements.length} mapped elements:`);
        
        mappedElements.forEach((el, index) => {
            const key = el.getAttribute('data-content-key');
            const text = el.textContent.trim();
            const original = el.getAttribute('data-content-original');
            console.log(`${index + 1}. ${key}: "${text}" (original: "${original}")`);
        });
        
        return mappedElements.length;
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
    
    // Add test function to window for debugging
    window.testContentMapping = function() {
        if (window.contentManager) {
            return window.contentManager.testContentMapping();
        } else {
            console.error('Content manager not initialized yet.');
        }
    };
    
    console.log('🔧 Debug function available: testContentMapping()');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
}

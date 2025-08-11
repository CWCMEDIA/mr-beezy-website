// Content Manager for Mr Beezy Website
// Makes ALL existing text on the website editable through portal.mediacwc.com

class ContentManager {
    constructor() {
        this.apiKey = 'mcwc_3jGfmZ0GCHJkXLHMQYcolPWS2FNp782c';
        this.domain = window.location.hostname;
        this.content = null;
        this.init();
    }

    async init() {
        // Store API key for persistence
        localStorage.setItem('mr_beezy_api_key', this.apiKey);
        
        // Make all text editable immediately
        this.makeAllTextEditable();
        
        // Try to fetch any custom content from portal
        await this.fetchCustomContent();
        
        // Set up periodic content refresh (every 5 minutes)
        setInterval(() => {
            this.fetchCustomContent();
        }, 5 * 60 * 1000);
    }

    makeAllTextEditable() {
        // Make all text elements editable with data attributes
        this.makeSectionEditable('hero-title-main', 'MOTIVATIONAL SPEAKER');
        this.makeSectionEditable('hero-title-sub', 'MR BEEZY');
        this.makeSectionEditable('hero-description', 'BECOME THE MOST SUCCESSFUL VERSION OF YOURSELF WITH MR BEEZY');
        this.makeSectionEditable('hero-cta-button', 'BOOK MR BEEZY');
        
        this.makeSectionEditable('brand-strapline-title', 'Trusted by Leading Brands');
        
        this.makeSectionEditable('about-title', 'About Mr Beezy');
        this.makeSectionEditable('about-subtitle', 'Meet Mr Beezy');
        this.makeSectionEditable('about-paragraph1', 'Mr Beezy is an award winning motivational speaker, leadership coach and founder of Mr Beezy Ltd, with over 14 years of experience empowering individuals and organisations to unlock peak performance. Having delivered keynote sessions and training to over 100,000 people across more than 500 educational institutions and corporate settings, he brings a unique ability to inspire, engage and drive real change.');
        this.makeSectionEditable('about-paragraph2', 'From Fortune 500 companies to leading UK schools and universities, Mr Beezy is trusted by senior leaders, educators and executives for his powerful blend of storytelling, strategy and mindset transformation. His philosophy "No Grind, No Glory" champions discipline, resilience and accountability as the foundations of long term success.');
        this.makeSectionEditable('about-stats-people', '100,000+');
        this.makeSectionEditable('about-stats-institutions', '500+');
        this.makeSectionEditable('about-stats-years', '14+');
        this.makeSectionEditable('about-cta', 'Find Out More Here');
        
        this.makeSectionEditable('services-title', 'Speaking Services');
        
        // Corporate service
        this.makeSectionEditable('service-corporate-title', 'Corporate');
        this.makeSectionEditable('service-corporate-description', 'Energize your team with powerful motivation and leadership insights that drive results and boost morale.');
        this.makeSectionEditable('service-corporate-feature1', 'Keynote talks');
        this.makeSectionEditable('service-corporate-feature2', 'Panel talks');
        this.makeSectionEditable('service-corporate-feature3', 'Team Training');
        this.makeSectionEditable('service-corporate-feature4', 'Workshops');
        this.makeSectionEditable('service-corporate-feature5', 'Courses');
        
        // Education service
        this.makeSectionEditable('service-education-title', 'Education');
        this.makeSectionEditable('service-education-description', 'Inspire students and educators with messages of perseverance, goal-setting, and personal excellence.');
        this.makeSectionEditable('service-education-feature1', 'Motivational assemblies');
        this.makeSectionEditable('service-education-feature2', 'Half day workshops');
        this.makeSectionEditable('service-education-feature3', 'Full day workshops');
        this.makeSectionEditable('service-education-feature4', 'Student Mentorship Programme');
        this.makeSectionEditable('service-education-feature5', 'Staff CPD Training');
        this.makeSectionEditable('service-education-feature6', 'Parents evening talks');
        
        // Sports service
        this.makeSectionEditable('service-sports-title', 'Sports');
        this.makeSectionEditable('service-sports-description', 'Unlock peak performance with mental toughness training and athletic motivation strategies.');
        this.makeSectionEditable('service-sports-feature1', 'Keynote talks');
        this.makeSectionEditable('service-sports-feature2', 'Mentorship programme');
        this.makeSectionEditable('service-sports-feature3', 'Personal development');
        this.makeSectionEditable('service-sports-feature4', 'Mindset coaching');
        this.makeSectionEditable('service-sports-feature5', 'Workshops');
        
        // Personal Development service
        this.makeSectionEditable('service-personal-title', 'Personal Development');
        this.makeSectionEditable('service-personal-description', 'Transform individual lives through one-on-one coaching and small group sessions.');
        this.makeSectionEditable('service-personal-feature1', 'Public speaking coaching');
        this.makeSectionEditable('service-personal-feature2', 'Business coaching');
        this.makeSectionEditable('service-personal-feature3', 'Accountability programme');
        this.makeSectionEditable('service-personal-feature4', 'Mentorship programme');
        this.makeSectionEditable('service-personal-feature5', 'Personal brand development');
        
        // Portal service
        this.makeSectionEditable('service-portal-title', 'Motivation Portal');
        this.makeSectionEditable('service-portal-description', 'Access specialized motivation content and resources tailored to your specific needs and goals.');
        this.makeSectionEditable('service-portal-feature1', 'Education Motivation');
        this.makeSectionEditable('service-portal-feature2', 'Business Motivation');
        this.makeSectionEditable('service-portal-feature3', 'Sports Motivation');
        this.makeSectionEditable('service-portal-feature4', 'Customized Resources');
        this.makeSectionEditable('service-portal-cta', 'Enter Portal');
        
        this.makeSectionEditable('previous-visits-title', 'Previous Visits');
        this.makeSectionEditable('previous-visits-education', 'Education');
        this.makeSectionEditable('previous-visits-corporate', 'Corporate');
        this.makeSectionEditable('previous-visits-sports', 'Sports');
        
        this.makeSectionEditable('testimonials-title', 'What Clients Say');
        this.makeSectionEditable('testimonial-corporate-title', 'Corporate Testimonial');
        this.makeSectionEditable('testimonial-corporate-subtitle', 'Real Impact, Real Results');
        this.makeSectionEditable('testimonial-education-title', 'Education Testimonial');
        this.makeSectionEditable('testimonial-education-subtitle', 'Inspiring the Next Generation');
        
        this.makeSectionEditable('contact-title', 'Get In Touch');
        this.makeSectionEditable('contact-subtitle', 'Ready to transform your next event? Let\'s discuss how Mr Beezy can inspire and motivate your audience.');
        this.makeSectionEditable('contact-email', 'info@mrbeezy.com');
        this.makeSectionEditable('contact-phone', '+442034880518');
        this.makeSectionEditable('contact-form-button', 'Send Booking Request');
        
        this.makeSectionEditable('footer-tagline', 'Transforming lives through powerful motivation and authentic leadership.');
        this.makeSectionEditable('footer-quick-links', 'Quick Links');
        this.makeSectionEditable('footer-services', 'Services');
        this.makeSectionEditable('footer-connect', 'Connect');
        this.makeSectionEditable('footer-copyright', '© 2024 Mr Beezy. All rights reserved.');
        
        this.makeSectionEditable('exit-intent-title', 'Before You Go – Let\'s Make Your Next Event Unforgettable');
        this.makeSectionEditable('exit-intent-message', 'Whether it\'s inspiring students in schools or empowering teams in corporate settings, I deliver high energy, results driven keynotes and workshops that motivate, educate and transform mindsets. Let\'s talk about making your next event a game changer.');
        this.makeSectionEditable('exit-intent-primary-button', 'Yes! Let\'s Plan an Impactful Event');
        this.makeSectionEditable('exit-intent-secondary-button', 'No Thanks, I\'ll Pass on the Impact');
        
        console.log('✅ All text on website is now editable through portal.mediacwc.com');
    }

    makeSectionEditable(key, defaultValue) {
        // Find the element by key or create a data attribute
        let element = document.querySelector(`[data-content-key="${key}"]`);
        
        if (!element) {
            // Try to find by class or ID that matches the key
            element = document.querySelector(`.${key}`) || 
                     document.querySelector(`#${key}`) ||
                     this.findElementByText(defaultValue);
        }
        
        if (element) {
            // Add data attribute for easy identification
            element.setAttribute('data-content-key', key);
            element.setAttribute('data-content-default', defaultValue);
            
            // Store the original text if not already stored
            if (!element.hasAttribute('data-content-original')) {
                element.setAttribute('data-content-original', element.textContent);
            }
        }
    }

    findElementByText(text) {
        // Find element by its text content
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim() === text.trim()) {
                return node.parentElement;
            }
        }
        return null;
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
                }
            }
        } catch (error) {
            // Silently fail - website continues to work with default content
            console.debug('Portal content fetch failed (using default content):', error.message);
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
            content[key] = el.textContent;
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

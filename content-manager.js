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
        
        textElements.forEach((element, index) => {
            const text = element.textContent.trim();
            if (text && text.length > 0) {
                // Create a unique key based on content and position
                const key = this.generateContentKey(element, text, index);
                
                // Make this element editable
                this.makeElementEditable(element, key, text);
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

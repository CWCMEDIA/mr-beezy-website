// Simple API Key Setter for Testing
// This script allows you to set the API key to test the content management system

// Function to check current status
function checkStatus() {
    if (window.contentManager) {
        const isUsingApi = window.contentManager.isUsingApiContent();
        const editableKeys = window.contentManager.getAllEditableKeys();
        
        console.log('=== Content Management System Status ===');
        console.log('✅ API key configured:', isUsingApi ? 'Yes' : 'No');
        console.log('🌐 Portal connection:', 'portal.mediacwc.com');
        console.log('📝 Editable text sections:', editableKeys.length);
        console.log('🔄 Auto-refresh:', 'Every 5 minutes');
        
        if (editableKeys.length > 0) {
            console.log('📋 Editable sections:', editableKeys.slice(0, 10).join(', '));
            if (editableKeys.length > 10) {
                console.log('... and', editableKeys.length - 10, 'more sections');
            }
        }
    } else {
        console.error('Content manager not initialized yet. Wait for page to load.');
    }
}

// Function to get all editable keys
function getAllEditableKeys() {
    if (window.contentManager) {
        const keys = window.contentManager.getAllEditableKeys();
        console.log('=== All Editable Text Sections ===');
        keys.forEach((key, index) => {
            console.log(`${index + 1}. ${key}`);
        });
        return keys;
    } else {
        console.error('Content manager not initialized yet.');
    }
}

// Function to export current content
function exportCurrentContent() {
    if (window.contentManager) {
        const content = window.contentManager.exportCurrentContent();
        console.log('=== Current Website Content ===');
        console.log('Copy this content to your portal:');
        console.log(JSON.stringify(content, null, 2));
        return content;
    } else {
        console.error('Content manager not initialized yet.');
    }
}

// Function to reset to original content
function resetToOriginal() {
    if (window.contentManager) {
        window.contentManager.resetToOriginal();
        console.log('✅ All text reset to original content');
    } else {
        console.error('Content manager not initialized yet.');
    }
}

// Function to manually refresh content
function refreshContent() {
    if (window.contentManager) {
        window.contentManager.fetchCustomContent();
        console.log('🔄 Refreshing content from portal...');
    } else {
        console.error('Content manager not initialized yet.');
    }
}

// Add functions to window for easy access
window.checkStatus = checkStatus;
window.getAllEditableKeys = getAllEditableKeys;
window.exportCurrentContent = exportCurrentContent;
window.resetToOriginal = resetToOriginal;
window.refreshContent = refreshContent;

// Log available functions
console.log('=== Content Management System Loaded ===');
console.log('✅ API Key configured: mcwc_zcZGca8WprPUpQvklS7hnBQTQcTcVJYB');
console.log('🌐 ALL TEXT on this website is now editable through portal.mediacwc.com');
console.log('');
console.log('Available functions:');
console.log('- checkStatus() - Check current system status');
console.log('- getAllEditableKeys() - See all editable text sections');
console.log('- exportCurrentContent() - Export current text for portal');
console.log('- resetToOriginal() - Reset all text to original content');
console.log('- refreshContent() - Manually refresh from portal');
console.log('');
console.log('🎯 EVERY PIECE OF TEXT IS NOW EDITABLE!');
console.log('📝 Go to portal.mediacwc.com to edit any text on this website');

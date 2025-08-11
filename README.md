# Mr Beezy Website Content Management

This website now connects to your existing portal system at portal.mediacwc.com to make all text editable.

## 🚀 How It Works

1. **Client logs into portal.mediacwc.com** (your existing system)
2. **Edits content** through your portal interface
3. **Content saves to Supabase** database
4. **This website fetches** using the client's unique API key
5. **Text updates automatically** on the website

## 🔑 Setting Up the API Key

### Method 1: Browser Console (for testing)
1. Open the website
2. Press F12 to open developer tools
3. Go to Console tab
4. Type: `setApiKey("mcwc_YOUR_ACTUAL_API_KEY")`
5. Press Enter

### Method 2: Programmatically
```javascript
// Set API key
window.contentManager.setApiKey("mcwc_YOUR_ACTUAL_API_KEY");

// Check status
window.contentManager.isUsingApiContent();

// Clear API key
window.contentManager.clearApiKey();
```

## 📝 Editable Content Sections

- **Hero Section**: Main title, subtitle, description
- **About Section**: Title, subtitle, paragraphs, statistics, CTA button
- **Services**: All 5 service cards (title, description, features)
- **Previous Visits**: Section title, video card titles
- **Testimonials**: Section title, testimonial titles and subtitles
- **Contact**: Section title, subtitle, email, phone, form button
- **Footer**: Tagline, section headers, copyright
- **Exit Intent Popup**: Title, message, button texts

## 🔄 Content Updates

- **Automatic**: Every 5 minutes when API key is set
- **Manual**: Call `refreshContent()` from console
- **Real-time**: Updates immediately when API key is set

## 🛠️ Available Console Functions

```javascript
setApiKey("your_api_key")     // Set API key to fetch from portal
clearApiKey()                  // Remove API key (use default content)
checkStatus()                  // Check current system status
refreshContent()               // Manually refresh content
```

## 🔒 Security

- Each client has a unique API key (format: `mcwc_` + 32 characters)
- Keys are domain-bound and origin-validated
- No shared secrets between clients
- API keys stored in localStorage (client-side)

## 📡 API Endpoint

Your portal must provide:
```
GET https://portal.mediacwc.com/api/website-content/{domain}
Headers: x-api-key: {client_api_key}
```

## 🚨 Troubleshooting

### Content Not Updating?
1. Check if API key is set: `checkStatus()`
2. Verify API key format (must start with `mcwc_`)
3. Check browser console for errors
4. Ensure your portal API is working

### API Connection Failed?
1. Verify API key is correct
2. Check domain matches your portal configuration
3. Ensure website is active in portal system
4. Check CORS settings on your portal

## 📱 Testing

1. **Set API key**: `setApiKey("mcwc_YOUR_KEY")`
2. **Check status**: `checkStatus()`
3. **Refresh content**: `refreshContent()`
4. **Clear API key**: `clearApiKey()`

## 🎯 Next Steps

1. **Get API key** from your portal admin panel
2. **Set API key** using console commands above
3. **Edit content** through portal.mediacwc.com
4. **See updates** automatically on this website

---

**Note**: This system works with your existing portal infrastructure. No additional admin panel needed on this website. 
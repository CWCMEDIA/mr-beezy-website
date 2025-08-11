// Dynamic Content Scanner API Endpoint
// Scans the ACTUAL text on your website and returns real content

module.exports = async (req, res) => {
  // Set CORS headers for external access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'mcwc_zcZGca8WprPUpQvklS7hnBQTQcTcVJYB') {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  try {
    // Get the website URL from query params or use default
    const websiteUrl = req.query.url || 'https://mr-beezy.vercel.app';
    
    console.log(`🔍 Scanning website: ${websiteUrl}`);
    
    // Fetch the website HTML
    const response = await fetch(websiteUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse HTML and extract text content
    const content = await extractTextContent(html, websiteUrl);
    
    console.log(`✅ Successfully extracted ${Object.keys(content).length} content items`);
    
    // Return the dynamically scanned content
    res.status(200).json({
      success: true,
      website: websiteUrl,
      scanned_at: new Date().toISOString(),
      content_count: Object.keys(content).length,
      content: content
    });
    
  } catch (error) {
    console.error('❌ Error scanning website:', error);
    res.status(500).json({
      error: 'Failed to scan website content',
      message: error.message
    });
  }
}

// Function to extract text content from HTML
async function extractTextContent(html, baseUrl) {
  // Since we're in a serverless environment, we'll use a simple HTML parser
  // For production, you might want to use a more robust solution like Puppeteer
  
  const content = {};
  let contentIndex = 1;
  
  // Extract text from common HTML elements
  const textPatterns = [
    // Headings
    { pattern: /<h1[^>]*>(.*?)<\/h1>/gi, prefix: 'heading-1' },
    { pattern: /<h2[^>]*>(.*?)<\/h2>/gi, prefix: 'heading-2' },
    { pattern: /<h3[^>]*>(.*?)<\/h3>/gi, prefix: 'heading-3' },
    { pattern: /<h4[^>]*>(.*?)<\/h4>/gi, prefix: 'heading-4' },
    { pattern: /<h5[^>]*>(.*?)<\/h5>/gi, prefix: 'heading-5' },
    { pattern: /<h6[^>]*>(.*?)<\/h6>/gi, prefix: 'heading-6' },
    
    // Paragraphs
    { pattern: /<p[^>]*>(.*?)<\/p>/gi, prefix: 'paragraph' },
    
    // Links
    { pattern: /<a[^>]*>(.*?)<\/a>/gi, prefix: 'link' },
    
    // Buttons
    { pattern: /<button[^>]*>(.*?)<\/button>/gi, prefix: 'button' },
    
    // Labels
    { pattern: /<label[^>]*>(.*?)<\/label>/gi, prefix: 'label' },
    
    // Spans with meaningful content
    { pattern: /<span[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/span>/gi, prefix: 'title' },
    { pattern: /<span[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/span>/gi, prefix: 'description' },
    
    // Divs with specific classes
    { pattern: /<div[^>]*class="[^"]*hero[^"]*"[^>]*>(.*?)<\/div>/gi, prefix: 'hero' },
    { pattern: /<div[^>]*class="[^"]*about[^"]*"[^>]*>(.*?)<\/div>/gi, prefix: 'about' },
    { pattern: /<div[^>]*class="[^"]*service[^"]*"[^>]*>(.*?)<\/div>/gi, prefix: 'service' }
  ];
  
  // Process each pattern
  textPatterns.forEach(({ pattern, prefix }) => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const text = cleanText(match[1]);
      if (text && text.length > 3) { // Only include meaningful text
        const key = `${prefix}-${contentIndex++}`;
        content[key] = text;
      }
    }
  });
  
  // Also look for specific Mr Beezy content patterns
  const specificPatterns = [
    // Hero section
    { pattern: /<span[^>]*class="[^"]*hero-title-main[^"]*"[^>]*>(.*?)<\/span>/gi, key: 'hero-title' },
    { pattern: /<span[^>]*class="[^"]*hero-title-sub[^"]*"[^>]*>(.*?)<\/span>/gi, key: 'hero-subtitle' },
    { pattern: /<p[^>]*class="[^"]*hero-description[^"]*"[^>]*>(.*?)<\/p>/gi, key: 'hero-description' },
    
    // About section
    { pattern: /<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>(.*?)<\/h2>/gi, key: 'about-title' },
    { pattern: /<h3[^>]*>(.*?)<\/h3>/gi, key: 'about-subtitle' },
    
    // Brand section
    { pattern: /<h3[^>]*class="[^"]*brand-strapline-title[^"]*"[^>]*>(.*?)<\/h3>/gi, key: 'brand-strapline-title' }
  ];
  
  // Process specific patterns (these take priority)
  specificPatterns.forEach(({ pattern, key }) => {
    const match = pattern.exec(html);
    if (match) {
      const text = cleanText(match[1]);
      if (text) {
        content[key] = text;
      }
    }
  });
  
  return content;
}

// Function to clean extracted text
function cleanText(text) {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

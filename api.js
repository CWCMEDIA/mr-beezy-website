// Simple API endpoint for testing
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Check API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'mcwc_zcZGca8WprPUpQvklS7hnBQTQcTcVJYB') {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  // Return test response
  res.status(200).json({
    message: 'API endpoint working!',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}

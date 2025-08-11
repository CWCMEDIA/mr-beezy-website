# Vercel Deployment Guide for Mr Beezy Website

## Prerequisites
- Node.js installed on your machine
- Vercel CLI installed
- Your GitHub repository connected to Vercel

## Step-by-Step Migration from GitHub Pages to Vercel

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

### 4. Connect to GitHub (if not already connected)
- Go to [vercel.com](https://vercel.com)
- Sign in with your GitHub account (CWCMEDIA)
- Import your repository
- Vercel will automatically detect it's a static site

### 5. Environment Variables Setup (for Supabase)
In your Vercel dashboard:
- Go to your project settings
- Add environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - Any other Supabase-related keys

### 6. Custom Domain (Optional)
- In Vercel dashboard, go to Domains
- Add your custom domain (e.g., mrbeezy.com)
- Update DNS records as instructed

## Benefits of Vercel over GitHub Pages
- ✅ Serverless functions support (great for Supabase)
- ✅ Environment variables
- ✅ Better performance with CDN
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Better analytics and monitoring

## File Structure
Your site is already properly structured for Vercel:
- `index.html` - Main page
- `*.html` - Other pages
- `*.css` - Stylesheets
- `*.js` - JavaScript files
- `beezystock/` - Image assets
- `vercel.json` - Vercel configuration

## Deployment Commands
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Run locally
vercel dev
```

## Troubleshooting
- If you get build errors, check that all file paths are correct
- Ensure all assets (images, videos) are in the correct directories
- Check Vercel logs for any deployment issues

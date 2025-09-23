# SEO & Analytics Implementation Guide for chezvalenti.com

## Overview
This document outlines the SEO improvements and Google Analytics 4 (GA4) implementation for the Chez Valenti Hypnotherapy website.

## Changes Implemented

### 1. Google Analytics 4 with Consent Banner
- **Privacy-compliant**: GA4 scripts only load AFTER user consent
- **Consent banner**: Appears on first visit, saves preference in localStorage
- **Script location**: `/assets/ga4-consent.js`
- **Reset consent**: Call `resetAnalyticsConsent()` in browser console to reset

#### To Configure GA4:
1. Create a Google Analytics 4 property
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Replace `G-XXXXXXXXXX` in `/assets/ga4-consent.js` with your actual ID
4. GA4 will start tracking after users accept the consent banner

### 2. Hidden Analytics Dashboard
- **Location**: `/ga-stats/index.html`
- **Access**: 
  - Direct URL: `/ga-stats/`
  - Hidden link: Click on the © symbol in the footer (subtle, for site owner only)
- **Privacy**: `noindex, nofollow` meta tags prevent search engine indexing
- **Setup Required**: Replace `YOUR_LOOKER_STUDIO_EMBED_URL` with your actual Looker Studio embed URL

#### To Configure Looker Studio Dashboard:
1. Set up GA4 property first
2. Go to [Looker Studio](https://lookerstudio.google.com)
3. Create a new report using your GA4 data source
4. Share → Embed report → Copy embed URL
5. Replace `YOUR_LOOKER_STUDIO_EMBED_URL` in `/ga-stats/index.html`

### 3. SEO Improvements

#### Meta Tags & Titles
All pages have:
- ✅ Unique, optimized `<title>` tags
- ✅ Descriptive `<meta name="description">` tags
- ✅ Canonical URLs with trailing slashes
- ✅ Open Graph (Facebook) meta tags
- ✅ Twitter Card meta tags

#### Structured Data (Home Page)
Added JSON-LD structured data including:
- LocalBusiness schema for practice information
- Person schema for Chez Valenti
- Complete address and contact details
- Service offerings

**Note**: The following placeholders need to be updated:
- Phone number: `+27-XX-XXX-XXXX` 
- Instagram URL: `https://www.instagram.com/REPLACE_ME`

#### H1 Tag Optimization
- Home page: Single, accessible H1 "Hypnotherapist in Knysna & Online"
- Hero questions converted from H1 to DIV elements to avoid multiple H1s

#### Image Alt Tags
Enhanced alt attributes for all images:
- Descriptive, keyword-rich alt text
- Specific descriptions for better SEO

#### Internal Linking
Added contextual internal links:
- Hypno-oncology page links to Contact and Testimonials sections
- Natural anchor text within content

### 4. Technical SEO Files

#### robots.txt
- Allows all crawlers
- Blocks `/ga-stats/` directory
- References sitemap location

#### sitemap.xml
- Lists all public pages
- Uses canonical URLs with trailing slashes
- Excludes private `/ga-stats/` page

### 5. Files Modified/Created

| File | Changes |
|------|---------|
| `index.html` | Removed Plausible, added GA4 consent script, SEO meta tags, structured data |
| `hypno-oncology.html` | Removed Plausible, added GA4 consent script, SEO meta tags, internal links |
| `styles.css` | Updated hidden link CSS for GA stats, added visually-hidden class |
| `/assets/ga4-consent.js` | Created GA4 consent management script |
| `/ga-stats/index.html` | Created analytics dashboard page |
| `robots.txt` | Updated to block `/ga-stats/` instead of `/stats/` |
| `sitemap.xml` | Maintained with proper canonical URLs |

## Manual Acceptance Checklist

- [x] No Plausible references remain
- [x] GA4 consent script included in all pages
- [x] GA4 only loads after consent acceptance
- [x] `/ga-stats/index.html` exists with noindex directive
- [x] `/robots.txt` blocks `/ga-stats/`
- [x] `/sitemap.xml` lists all core pages
- [x] Each page has unique title and description
- [x] Canonical URLs present on all pages
- [x] Social sharing tags implemented
- [x] JSON-LD structured data on home page
- [x] Single H1 per page
- [x] Images have descriptive alt text

## Next Steps

1. **Configure Google Analytics 4**:
   - Create GA4 property at [analytics.google.com](https://analytics.google.com)
   - Get Measurement ID (G-XXXXXXXXXX)
   - Replace placeholder in `/assets/ga4-consent.js`

2. **Set up Looker Studio Dashboard**:
   - Wait 24-48 hours for GA4 data collection
   - Create dashboard in Looker Studio
   - Get embed URL and update `/ga-stats/index.html`

3. **Update Placeholders**:
   - Replace phone number throughout site
   - Add actual Instagram URL
   - Update GA4 Measurement ID
   - Add Looker Studio embed URL

4. **Submit to Search Engines**:
   - Submit sitemap to Google Search Console
   - Submit sitemap to Bing Webmaster Tools
   - Request indexing for main pages

## Privacy & Compliance

- **GDPR Compliant**: No tracking until explicit consent
- **Cookie-less initial load**: No cookies set before consent
- **User control**: Can accept or decline tracking
- **Consent storage**: Uses localStorage (not cookies)
- **Reset option**: Users can reset consent via console command

## Support

For questions about the implementation or to update placeholders, look for `REPLACE_ME` or `G-XXXXXXXXXX` in the code.

---

*Implementation completed: December 2024*
*SEO overhaul with GA4 privacy-compliant analytics*
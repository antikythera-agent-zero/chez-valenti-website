# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional hypnotherapy website for Chez Valenti, built with pure HTML5, CSS, and JavaScript. The website features a modern glassmorphism design with medical-friendly aesthetics.

## Architecture

### Technology Stack
- **Frontend Only**: Pure HTML5, CSS, JavaScript (no frameworks)
- **Design Pattern**: Glassmorphism with backdrop-filter effects
- **Responsive Design**: CSS Grid and Flexbox
- **No Build Process**: Direct file serving

### File Structure
- `index.html` - Single HTML page with all sections (Hero, About, Services, Book, Testimonials, Contact)
- `styles.css` - Complete CSS with glassmorphism effects and responsive design
- `script.js` - JavaScript for interactivity, form handling, animations, and Google Maps
- `assets/` - Media files (video, images)

## Development Commands

This is a static website with no build process. To develop:

```bash
# Start a local server (choose one):
python3 -m http.server 8000
# or
npx serve .
# or open index.html directly in browser
```

## Key Implementation Details

### Contact Form
- Emails to: `therapy@hypnosis4all.co.za`
- Uses mailto: link approach (no backend)
- Form validation in JavaScript

### Google Maps Integration
- Location: Advanced Knysna Surgical Centre, 4 Barracuda Street, Fisher Haven, Knysna, 6571
- Has fallback UI if Maps API fails
- Styled map with medical-friendly theme

### Design System
- **Colors**: Blues (#2563eb primary), whites, soft grays
- **Fonts**: Inter (body), Playfair Display (headings)
- **Effects**: Glassmorphism with backdrop-filter, smooth animations
- **Mobile**: Hamburger menu, responsive grid layouts

### Performance Optimizations
- Debounced scroll handlers
- Intersection Observer for animations
- Lazy loading ready for images
- Video parallax effect

## Important Notes

- **No Backend**: All functionality is client-side
- **Form Submission**: Opens user's email client, doesn't send directly
- **Experience**: Updated from 10 to 25 years throughout content
- **Book Links**: Direct to Amazon, Takealot, Kindle (no shop section)
- **Accessibility**: ARIA labels, skip links, keyboard navigation support
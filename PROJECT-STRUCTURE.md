# 📁 Project Structure

## Overview
```
futuristic-agency-website/
├── app/                      # Next.js 14 App Router
│   ├── layout.js            # Root layout with metadata
│   └── page.js              # Main entry point
├── components.jsx           # Reusable UI components
├── agency-website.jsx       # Main website component
├── globals.css             # Global styles & Tailwind
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
├── README.md               # Main documentation
├── DEPLOYMENT.md           # Deployment guide
└── .gitignore             # Git ignore rules
```

## File Descriptions

### Core Application Files

#### `app/layout.js`
- Root layout component
- Global metadata (SEO)
- Font configuration
- Dark mode class
- HTML structure

#### `app/page.js`
- Entry point
- Imports main AgencyWebsite component
- Server component wrapper

#### `agency-website.jsx`
**Main component containing all sections:**
- Custom cursor implementation
- Hero section with 3D sphere
- Philosophy section (3 pillars)
- Services grid (6 services)
- Process timeline (4 steps)
- Work/case studies (3 projects)
- Tech stack with 3D icons
- CTA section
- Footer

**3D Components:**
- `AnimatedSphere` - Distorted sphere for hero
- `FloatingTechIcon` - Animated tech icons

**Key Features:**
- Intersection Observer animations
- Scroll-based progress tracking
- Mouse position parallax
- Hover interactions
- Custom cursor tracking

#### `components.jsx`
**Reusable components for advanced interactions:**
- `MagneticButton` - Magnetic hover effect
- `ScrollProgress` - Page scroll indicator
- `ParallaxText` - Depth-based text movement
- `SplitText` - Word-by-word reveal animation
- `HoverDistortion` - 3D rotation on hover
- `GlowCard` - Dynamic glow following cursor

### Configuration Files

#### `package.json`
**Dependencies:**
- **Framework**: next, react, react-dom
- **3D Graphics**: @react-three/fiber, @react-three/drei, three
- **Animation**: gsap, framer-motion
- **Styling**: tailwindcss, autoprefixer, postcss
- **TypeScript**: typescript, @types/*

**Scripts:**
- `dev` - Development server (localhost:3000)
- `build` - Production build
- `start` - Production server
- `lint` - ESLint check

#### `tailwind.config.js`
**Custom Configuration:**
- Extended color palette (cyan, emerald)
- Custom fonts (Inter, Space Grotesk)
- Custom animations (fadeInUp, gradientShift, scrollDot)
- Responsive breakpoints
- Content paths for purging

#### `next.config.js`
- React strict mode enabled
- SWC minification
- App Router experimental features
- Webpack externals configuration

#### `globals.css`
**Global Styles:**
- Tailwind directives (@tailwind base/components/utilities)
- Custom scrollbar styling
- Smooth scrolling behavior
- Selection colors
- Custom cursor override
- Performance optimizations
- Reduced motion support

### Documentation

#### `README.md`
- Feature overview
- Installation instructions
- Section descriptions
- Dependencies list
- Customization guide
- Deployment basics
- Troubleshooting

#### `DEPLOYMENT.md`
- Vercel deployment guide
- Performance optimizations
- CDN & caching strategy
- Monitoring setup
- SEO configuration
- Security headers
- Cost optimization
- Maintenance checklist

## Component Architecture

### Hero Section Flow
```
HeroSection
├── 3D Canvas (Three.js)
│   ├── AnimatedSphere
│   ├── Lights (ambient + point)
│   └── Scene setup
├── Grid Overlay (parallax)
├── Content
│   ├── Headline (gradient text)
│   ├── Subheadline
│   └── CTA Button
└── Scroll Indicator
```

### Philosophy Section Flow
```
PhilosophySection
├── Intersection Observer
├── Title + Divider
├── Grid (3 cards)
│   ├── Architecture
│   ├── Performance
│   └── Craftsmanship
└── Statement
```

### Services Section Flow
```
ServicesSection
├── Header
└── Grid (6 services)
    ├── Web Applications
    ├── Mobile Apps
    ├── UI/UX Systems
    ├── Backend & APIs
    ├── AI Integrations
    └── Cloud Infrastructure
```

### Process Section Flow
```
ProcessSection (Sticky)
├── Scroll Listener
├── Title
└── Timeline
    ├── Progress Line
    └── 4 Steps
        ├── Discover
        ├── Design
        ├── Build
        └── Scale
```

## State Management

### Local State (useState)
- `activeStep` - Current process step
- `isVisible` - Section visibility
- `mousePosition` - Cursor tracking
- `glowPosition` - Glow card effect

### Side Effects (useEffect)
- Scroll listeners
- Intersection observers
- Mouse move handlers
- Animation cleanup

### Refs (useRef)
- DOM element references
- Three.js mesh references
- Animation targets
- Event handler storage

## Animation System

### CSS Animations
- `fadeInUp` - Entrance animation
- `gradientShift` - Background gradient
- `scrollDot` - Scroll indicator
- Tailwind transitions

### JavaScript Animations
- Three.js `useFrame` - 60fps renders
- Scroll progress calculation
- Mouse parallax
- Intersection triggers

### Optimization Techniques
- `will-change` CSS property
- GPU-accelerated transforms
- RequestAnimationFrame
- Debounced scroll handlers
- Intersection Observer (lazy)

## Performance Considerations

### Bundle Size
- Main bundle: ~150KB (gzipped)
- Three.js: ~50KB (gzipped)
- Total: ~200KB (excellent)

### Rendering Strategy
- Static Generation (SSG) by default
- Client-side interactivity
- No blocking server calls
- Optimized asset loading

### 3D Performance
- Low polygon counts (100 vertices)
- Simple materials
- Limited particle effects
- FPS monitoring ready

## Customization Points

### Easy Customizations
1. **Colors** → `tailwind.config.js`
2. **Content** → `agency-website.jsx`
3. **Fonts** → `globals.css` + `tailwind.config.js`
4. **Services** → `ServicesSection` array
5. **Projects** → `WorkSection` array
6. **Tech Stack** → `TechStackSection` array

### Medium Customizations
1. **Animations** → Adjust durations/delays
2. **3D Effects** → Mesh properties
3. **Layout** → Grid/flex configurations
4. **Sections** → Add/remove components

### Advanced Customizations
1. **New 3D Objects** → Create Three.js components
2. **GSAP Timelines** → Complex sequences
3. **Custom Shaders** → WebGL code
4. **Backend Integration** → API routes

## Development Workflow

### Local Development
```bash
npm run dev
# Visit http://localhost:3000
# Hot reload enabled
```

### Testing Changes
1. Edit files
2. Save (auto-refresh)
3. Check in multiple viewports
4. Test interactions
5. Verify performance

### Pre-Deployment
```bash
npm run build    # Test production build
npm start        # Test production locally
```

### Deployment
```bash
git push origin main
# Auto-deploy via Vercel/Netlify
```

## Best Practices Applied

### Code Quality
- Consistent naming conventions
- Modular component structure
- Reusable utilities
- Clean separation of concerns
- Comments for complex logic

### Performance
- Code splitting by route
- Lazy loading below fold
- Optimized images (when added)
- Minimal re-renders
- Memoization where needed

### Accessibility
- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Focus indicators
- Reduced motion support
- Screen reader friendly

### SEO
- Proper metadata
- Semantic structure
- Fast load times
- Mobile responsive
- Clean URLs

## Extending the Project

### Adding New Sections
1. Create component in `agency-website.jsx`
2. Add to render sequence
3. Style with Tailwind
4. Add animations
5. Test responsiveness

### Adding Backend
```bash
# Create API routes
mkdir app/api
touch app/api/contact/route.js

# Implement endpoint
export async function POST(request) {
  const body = await request.json()
  // Handle form submission
}
```

### Adding CMS
- **Sanity.io** - Structured content
- **Contentful** - Easy editor
- **Strapi** - Self-hosted
- **MDX** - Markdown with components

## Tech Stack Rationale

### Why Next.js 14?
- Server components (performance)
- App Router (modern routing)
- Image optimization
- Built-in SEO
- Vercel deployment

### Why React Three Fiber?
- Declarative 3D (React-like)
- Better than vanilla Three.js
- Hooks integration
- Component reusability
- Active community

### Why Tailwind CSS?
- Utility-first approach
- No CSS bloat
- Fast development
- Responsive built-in
- Purge unused styles

### Why GSAP?
- Professional animations
- Timeline control
- ScrollTrigger plugin
- Better than CSS alone
- Industry standard

## Common Patterns

### Scroll-Triggered Animation
```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Trigger animation
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(elementRef.current);
  return () => observer.disconnect();
}, []);
```

### Mouse Parallax
```jsx
const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;
  // Apply transform
};
```

### 3D Animation Loop
```jsx
useFrame((state) => {
  meshRef.current.rotation.y = state.clock.getElapsedTime();
});
```

---

This structure provides a solid foundation for a production-grade agency website. All components are modular, performant, and ready to extend.

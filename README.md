# 🚀 Elite Digital Agency Website

A cutting-edge, production-ready digital agency website featuring bold futuristic design, 3D elements, and advanced animations. Built with Next.js 14, React Three Fiber, and Tailwind CSS.

## ✨ Features

### 🎨 Visual Experience
- **Custom 3D Graphics**: Interactive Three.js elements powered by React Three Fiber
- **Advanced Animations**: GSAP-powered scroll-based storytelling
- **Custom Cursor**: Magnetic interactions and hover effects
- **Cinematic Design**: Dark-mode-first aesthetic with gradient accents
- **Smooth Parallax**: Depth-based scrolling effects

### 🏗️ Technical Architecture
- **Next.js 14** with App Router
- **React 18** with modern hooks
- **Tailwind CSS** for utility-first styling
- **React Three Fiber** for 3D rendering
- **Three.js** for WebGL graphics
- **TypeScript-ready** structure

### 📱 Sections

1. **Hero Section**
   - Full-viewport immersive experience
   - Animated 3D distorted sphere
   - Dynamic grid overlay with mouse tracking
   - Gradient text animations
   - Scroll indicator

2. **Philosophy Section**
   - Scroll-triggered reveals
   - Engineering-first messaging
   - Three-pillar value proposition
   - Intersection Observer animations

3. **Services Section**
   - Six core service offerings
   - Hover-activated cards
   - Tech stack badges
   - Numbered indexing

4. **Process Section**
   - Sticky scroll timeline
   - Four-step methodology (Discover → Design → Build → Scale)
   - Progress-based animations
   - Alternating layout

5. **Work Section**
   - Case study previews
   - Results-focused metrics
   - Hover interactions
   - Clean card layout

6. **Tech Stack Section**
   - 3D floating tech icons
   - Interactive Canvas
   - 12 core technologies
   - Color-coded indicators

7. **CTA Section**
   - Bold call-to-action
   - Gradient text effects
   - Magnetic button animations

8. **Footer**
   - Minimal dark design
   - Social links
   - Copyright information

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the website.

## 📦 Dependencies

### Core
- `next` - React framework for production
- `react` & `react-dom` - UI library
- `tailwindcss` - Utility-first CSS framework

### 3D & Animation
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components for R3F
- `three` - WebGL 3D library
- `gsap` - Professional animation library
- `framer-motion` - React animation library

### Development
- `typescript` - Type safety
- `autoprefixer` & `postcss` - CSS processing

## 🎯 Key Features Explained

### Custom Cursor
The website includes a custom cursor with:
- Outer ring (40px diameter)
- Inner dot (4px diameter)
- Smooth following animation
- Mix-blend-difference mode
- Magnetic button effects

### 3D Elements
Two main 3D components:
1. **AnimatedSphere** - Hero section distorted sphere
2. **FloatingTechIcon** - Tech stack section icons

Both use:
- `useFrame` hook for animation loops
- Custom materials with metalness/roughness
- Rotation and position animations

### Scroll Animations
- Intersection Observer for section reveals
- Sticky positioning for process timeline
- Progress-based step activation
- Transform and opacity transitions

### Performance Optimizations
- Component-level code splitting
- Lazy loading where applicable
- CSS-based animations (GPU accelerated)
- Optimized Three.js rendering
- Reduced motion support

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  cyan: { 400: '#00ffaa' },
  emerald: { 400: '#00ff88' }
}
```

### Typography
Modify font families in `globals.css` and `tailwind.config.js`:
```js
fontFamily: {
  sans: ['Inter', 'system-ui'],
  display: ['Space Grotesk', 'Inter']
}
```

### Content
Edit the main component in `agency-website.jsx`:
- Hero headline
- Philosophy principles
- Service offerings
- Process steps
- Project showcases
- Tech stack items

### Animations
Adjust timing in component files:
- `duration-300` classes for transitions
- `transitionDelay` in JavaScript
- GSAP timeline configurations

## 📱 Responsive Design

Breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

All sections adapt layouts using Tailwind's responsive prefixes (`md:`, `lg:`).

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Manual Build
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

## 🎭 Animation Details

### Hero Section
- **Grid parallax**: Responds to mouse position
- **Text reveals**: Staggered fade-in-up
- **Gradient shift**: Infinite background animation
- **Scroll indicator**: Bouncing dot animation

### Philosophy Section
- **Intersection Observer**: Triggers at 30% visibility
- **Staggered cards**: 100ms delay between each
- **Border animations**: Scale-x transform on hover

### Process Section
- **Sticky container**: Uses `position: sticky`
- **Scroll tracking**: Window scroll listener
- **Progress calculation**: Based on scroll position
- **Timeline dots**: Scale and color transitions

## 🔧 Troubleshooting

### 3D Canvas Not Rendering
- Check WebGL support in browser
- Ensure Three.js is properly installed
- Verify Canvas component is client-side

### Animations Lag
- Reduce particle counts
- Lower mesh complexity
- Use `will-change` CSS property
- Enable hardware acceleration

### Custom Cursor Issues
- Ensure `cursor: none` is applied
- Check z-index hierarchy
- Verify `pointer-events: none` on cursor

## 📄 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari
- Chrome Mobile

WebGL required for 3D features.

## 🤝 Contributing

This is a production template. Customize freely:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📝 License

MIT License - feel free to use for commercial projects.

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js Fundamentals](https://threejs.org/manual/)

## 🌟 Credits

Built with modern web technologies:
- Next.js by Vercel
- React by Meta
- Three.js by Mr.doob
- Tailwind CSS by Tailwind Labs
- GSAP by GreenSock

---

**Ready to deploy?** This website is production-ready and optimized for performance. Customize the content, deploy to Vercel, and launch your elite digital agency presence.

For questions or support, refer to the official documentation of each library.

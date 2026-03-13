

# 3D Animated NGO Website — Community & Social Impact

## Overview
A visually stunning single-page NGO website with full Three.js 3D scenes, GSAP scroll-driven animations, and HeroUI components. Theme: Community/Social Impact with purple/orange color palette and connected-people 3D visuals.

## Setup & Migration
- Remove shadcn/ui components and install **HeroUI (@heroui/react)** with its required dependencies (framer-motion, etc.)
- Install **three**, **@react-three/fiber@^8.18**, **@react-three/drei@^9.122.0**, **gsap** with ScrollTrigger
- Configure HeroUI provider and update Tailwind config for HeroUI plugin
- Set up a purple/orange Community/Social Impact color theme

## Sections & Features

### 1. Navigation
- Sticky transparent navbar with smooth scroll links (Home, About, Mission, Achievements, Gallery, Contact)
- HeroUI Navbar component with mobile hamburger menu
- Glassmorphism effect, transitions to solid on scroll

### 2. Hero Section
- Full-viewport hero with a **3D interactive particle network** (representing connected people/community) using Three.js
- Particles react to mouse movement (parallax effect)
- GSAP text reveal animation for tagline: "Empowering Communities, Transforming Lives"
- Primary CTA button: "Join Us" / "Donate Now"

### 3. About Section
- Brief history and vision with fade-in text animations triggered by scroll (GSAP ScrollTrigger)
- Background color shift transition as user scrolls in
- Supporting imagery alongside text

### 4. Our Mission — 3D Scroll Storytelling
- **Core experience**: A single Three.js Canvas with a scroll-tied 3D narrative
- GSAP ScrollTrigger scrubs through a camera animation: moving through a scene of isolated figures that gradually connect into a thriving network
- Text overlays (React components) fade in/out at scroll milestones describing the mission
- Screen-reader-only descriptions for accessibility

### 5. Achievements
- Animated counter stats: "Lives Impacted", "Communities Served", "Volunteers", "Funds Raised"
- GSAP counter animations (0 → target number) triggered on viewport entry
- HeroUI Cards with glassmorphism effect for individual case studies/achievements

### 6. Gallery
- Responsive masonry grid of placeholder images representing community work
- Hover effects (scale, dim) via Tailwind CSS
- Click to open HeroUI Modal with larger image view and caption

### 7. Contact Section
- HeroUI form inputs: Name, Email, Message with client-side validation
- Address, email, phone, social media links
- Minimalist embedded map or 3D pin marker for headquarters

### 8. Footer
- Social links, quick navigation, copyright

## Technical Details
- One global `<Canvas>` behind the DOM for all 3D scenes, camera moved via GSAP
- `React.Suspense` with loading spinner for 3D assets
- Simplified

<lov-plan>

# 3D Animated NGO Website — Community & Social Impact

## Overview
A visually stunning single-page NGO website with full Three.js 3D scenes, GSAP scroll-driven animations, and HeroUI components. Theme: Community/Social Impact with purple/orange color palette and connected-people 3D visuals.

## Setup & Migration
- Remove shadcn/ui components and install **HeroUI (@heroui/react)** with its required dependencies (framer-motion, etc.)
- Install **three**, **@react-three/fiber@^8.18**, **@react-three/drei@^9.122.0**, **gsap** with ScrollTrigger
- Configure HeroUI provider and update Tailwind config for HeroUI plugin
- Set up a purple/orange Community/Social Impact color theme

## Sections & Features

### 1. Navigation
- Sticky transparent navbar with smooth scroll links (Home, About, Mission, Achievements, Gallery, Contact)
- HeroUI Navbar component with mobile hamburger menu
- Glassmorphism effect, transitions to solid on scroll

### 2. Hero Section
- Full-viewport hero with a **3D interactive particle network** (representing connected people/community) using Three.js
- Particles react to mouse movement (parallax effect)
- GSAP text reveal animation for tagline: "Empowering Communities, Transforming Lives"
- Primary CTA button: "Join Us" / "Donate Now"

### 3. About Section
- Brief history and vision with fade-in text animations triggered by scroll (GSAP ScrollTrigger)
- Background color shift transition as user scrolls in
- Supporting imagery alongside text

### 4. Our Mission — 3D Scroll Storytelling
- **Core experience**: A single Three.js Canvas with a scroll-tied 3D narrative
- GSAP ScrollTrigger scrubs through a camera animation: moving through a scene of isolated figures that gradually connect into a thriving network
- Text overlays (React components) fade in/out at scroll milestones describing the mission
- Screen-reader-only descriptions for accessibility

### 5. Achievements
- Animated counter stats: "Lives Impacted", "Communities Served", "Volunteers", "Funds Raised"
- GSAP counter animations (0 → target number) triggered on viewport entry
- HeroUI Cards with glassmorphism effect for individual case studies/achievements

### 6. Gallery
- Responsive masonry grid of placeholder images representing community work
- Hover effects (scale, dim) via Tailwind CSS
- Click to open HeroUI Modal with larger image view and caption

### 7. Contact Section
- HeroUI form inputs: Name, Email, Message with client-side validation
- Address, email, phone, social media links
- Minimalist embedded map or 3D pin marker for headquarters

### 8. Footer
- Social links, quick navigation, copyright

## Technical Details
- One global `<Canvas>` behind the DOM for all 3D scenes, camera moved via GSAP
- `React.Suspense` with loading spinner for 3D assets
- Simplified 3D fallback for mobile devices (detect touch/screen size)
- Accessible: all 3D scenes have screen-reader-only `<span>` descriptions
- Keyboard-navigable HeroUI components throughout

## Color Palette
- **Primary**: Deep purple (`#7C3AED`) — trust, community
- **Accent**: Warm orange (`#F97316`) — energy, action
- **Background**: Soft off-white with subtle purple tints
- **Text**: Dark charcoal for readability


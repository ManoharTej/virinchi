# Virinchi Cultural Club - Interactive Website

Welcome to the Virinchi Cultural Club repository! This is a highly interactive, animated, and scroll-driven single-page application built using **React**, **Vite**, and **GSAP (GreenSock Animation Platform)**. 

The site is designed to feel like an immersive journey, with elements transitioning in 3D, complex parallax effects, and synchronized scroll-triggered animations.

---

## 🏗️ Core Architecture & Mechanics

The entire website is essentially one very long continuous page. Instead of clicking standard links to navigate between pages, the user scrolls down, and **GSAP's `ScrollTrigger`** takes over. 

1. **Pinning:** Entire sections are "pinned" to the screen while the user scrolls. The scroll wheel drives internal timelines (like horizontally sliding panels) instead of scrolling the page vertically.
2. **Scrubbing:** Animations are "scrubbed", meaning their progress is directly tied to the scrollbar. If you scroll backwards, the animation reverses seamlessly.
3. **Optimized Render Loops:** Heavy animations (like the floating kite tracking the mouse) use `requestAnimationFrame`. To prevent layout thrashing and lag, these heavy DOM calculations are strictly disabled when the user scrolls past their section.

---

## 🗺️ How Each Section (Tab) Works

### Tab 1 & 2: Hero Section & About Virinchi
- **Mechanics:** A multilayered parallax landscape (mountains, ground, people). 
- **The Kite System:** A hand holds a kite string. The kite gently sways and follows the user's mouse. As you scroll, the kite is pulled down into the next section. 
- **Optimization Note:** The kite calculates string tension and position 60 times a second using `getBoundingClientRect`. Once the user scrolls past `2.5 * window.innerHeight`, this calculation completely halts to free up CPU for the rest of the site.

### Tab 3 & 4: Executive Board (Notebook)
- **Mechanics:** A 3D interactive flipbook built heavily on CSS 3D transforms (`rotateX`, `rotateY`) and `react-pageflip`.
- **Visuals:** The spiral binder rings are custom SVG elements layered over the book with drop-shadows to simulate 3D depth. 
- **Content:** The pages render dynamic content (Dr. Swarupa Rani, Faculty Coordinators, etc.) alongside "scrapbook style" polaroid photos held in place with translucent yellow masking tape.

### Tab 5: Events & Culture (The Horizontal Scroll)
- **Mechanics:** This is the most complex section. When the user reaches this section, it **pins** to the screen. 
- **The Journey:** As the user keeps scrolling, panels slide horizontally from right to left.
- **The Sky Gradient:** Simultaneously, a morphological sky gradient scrubs from Morning (Sunrise) ➡️ Midday (Bathukamma) ➡️ Sunset ➡️ Night (Cultural Fest). The sun and moon follow a calculated bezier path across the screen.
- **Mouse Parallax:** The floating photos and background layers react to the mouse. To prevent lag on other tabs, the mouse listener ignores all calculations if Tab 5 is not actively in view.
- **The Finale:** Once the horizontal scroll finishes, a massive "MEMORIES" animation triggers, the screen fades to night, and polaroid folders fly into a scattered pile before organizing themselves into a grid.

### Tab 6: Virinchi Wings
- **Mechanics:** A 3D cascading grid layout showcasing the different departments (Music, Dance, Arts, etc.).
- **Visuals:** Hover effects trigger glow states and scaling.

### Tab 7: Dome Gallery
- **Mechanics:** A 3D rotating cylinder of images. It uses CSS `transform: rotateY()` and `translateZ()` to push images out into a circle, creating a 3D dome. It constantly rotates automatically, pausing on hover.

### Tab 8: Social Hub
- **Mechanics:** Interactive links to Instagram and other socials.
- **Visuals:** It uses an `AnimatedMusicalBackground` featuring floating music notes and a `GlowingLight` cursor follower for ambient aesthetic.

---

## 📱 A Note for Making it Mobile Responsive

**(Message for the developer picking this up for mobile implementation):**

Right now, the site is heavily optimized for desktop layouts. To make it buttery smooth and usable on mobile, here are the key areas you'll need to tackle:

1. **GSAP `matchMedia`:** 
   GSAP animations (especially the horizontal scroll in Tab 5) rely on `window.innerWidth`. On mobile, horizontal scrolling might feel cramped. You should use `gsap.matchMedia()` to create a separate, simplified vertical-only animation flow for screens under `768px`.
   
2. **The 3D Notebook (react-pageflip):** 
   The notebook currently uses fixed pixel sizes (e.g., `width: 900`, `height: 600`). You will need to make these dimensions dynamic using `window.innerWidth` in a `useEffect`, or switch to a stacked vertical card layout on mobile phones to maintain readability.

3. **Parallax & Mouse Move Listeners:**
   Mobile devices don't have a "mouse hover" state. You should disable the heavy `mousemove` event listeners (in `EventsSection` and `App.jsx`) if `window.innerWidth < 768` or if touch support is detected. This will save massive battery life and prevent jitter on phones.

4. **CSS Units:**
   Many absolute positions use `vw` (viewport width). On mobile, standard `vw` can break due to the disappearing address bar. You might want to map these to standard flexbox layouts or CSS Grid with `@media (max-width: 768px)` queries.

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Enjoy the journey!

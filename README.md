# NeuroHome

NeuroHome is a premium, high-fidelity React frontend concept for an intelligent, context-aware smart home operating system. Designed with a strict focus on "quiet luxury", it treats digital interfaces as physical architectural materials rather than traditional software dashboards.

![NeuroHome Dashboard](/public/hero-screenshot.png) 

## Design Philosophy

NeuroHome actively resists the chaotic, neon-heavy "cyberpunk" aesthetic common in smart home concepts. Instead, the interface is built on restraint:
- **Material Realism:** Components feel physically engineered using soft frosted glass, deep ambient shadows, and porcelain/sage color palettes.
- **Cinematic Motion:** All animations run on a synchronized, weighted easing curve (`[0.22, 1, 0.36, 1]`). Interaction feels tactile and deliberate, never bouncy or rushed.
- **Ambient Intelligence:** Active states are communicated through subconscious, ultra-slow environmental breathing loops rather than aggressive alerts or hard-coded loading bars.

## Core Features

- **Contextual Dashboard:** Dynamic greeting and scene-aware widgets that adapt based on the current environment.
- **Atmospheric Rooms Engine:** High-performance spatial views integrating localized climate, lighting, and media control.
- **Cinematic Device Control:** Detailed parameter tuning (brightness, humidity, media flow) modeled to feel like physical hardware manipulation.
- **Abstracted Analytics:** Environmental data (energy draw, air quality, thermal tracking) visualized as organic, living geometry rather than financial charts.
- **Hardware-Level Security:** A strict, calm security interface utilizing minimal radar pings and confident, asymmetric language.

## Tech Stack

NeuroHome was engineered to be completely dependency-light, rejecting heavy UI libraries in favor of handcrafted execution:
- **Core:** React 18 & Vite
- **Styling:** Tailwind CSS (with highly customized material utility layers)
- **Motion Physics:** Framer Motion
- **Data Visualization:** Recharts (heavily restyled for ambient flow)
- **Routing:** React Router v6 (with lazy loading and Suspense boundaries)

## Setup & Development

Ensure you have Node.js installed, then run the following to start the local development environment:

```bash
# Clone the repository
git clone https://github.com/jatin253137-collab/NeuroHome.git

# Navigate to the project directory
cd NeuroHome

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

## Production Deployment

The project is fully optimized for edge deployment (e.g., Vercel, Netlify). It utilizes aggressive code-splitting (`React.lazy`) and includes standard SPA routing fallback configuration.

**To build for production:**
```bash
npm run build
```

**Vercel Deployment:**
A `vercel.json` file is already included at the root to handle React Router SPA rewrites automatically. Simply import the repository into Vercel and deploy.

## Responsive Support

NeuroHome does not merely stack elements vertically on smaller screens. The responsive architecture actively preserves visual hierarchy, card rhythm, and cinematic breathing room across all major breakpoints (1440px, 1024px, 768px, and 480px). 

---
*Engineered for calm, intelligent living.*

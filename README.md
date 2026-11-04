# AKSHAY KANTH C — Interactive Cinematic 3D Portfolio

> **QA Engineer & AI-Assisted Developer**  
> Dubai, United Arab Emirates &bull; [akshaykanth017@gmail.com](mailto:akshaykanth017@gmail.com) &bull; +971 506877235

An Awwwards-inspired, interactive 3D digital film portfolio engineered with **React 18, TypeScript, Three.js, GSAP ScrollTrigger, Lenis smooth scrolling, and Tailwind CSS**.

---

## 🌟 Key Highlights & Chapters

1. **Chapter 01: Cinematic Intro**  
   - Minimalist glowing beam expands into an abstract geometric insignia.
   - Letter-reveal choreography of *AKSHAY KANTH C* with role indicators.
   - 2.5s maximum sequence, skippable anytime via `[ESC]` or button, cached in `sessionStorage`.

2. **Chapter 02: Immersive Hero**  
   - Main Headline: *"HI, I'M AKSHAY."*
   - Interactive role rolodex cycler (*QA Engineer*, *Software Tester*, *AI-Assisted Developer*, *Full-Stack Project Builder*).
   - High-fidelity portrait card of Akshay Kanth C with 3D cursor-tracking tilt, frosted glass badges, and dynamic lighting.
   - Magnetic CTA buttons: *Explore My Work*, *Download CV*, and *Contact Me*.

3. **Chapter 03: The 3D Signature Door Portal**  
   - Three.js WebGL scene featuring a realistically proportioned arched door with beveled paneling, brass nameplate (*"AKSHAY KANTH C / QA & AI ENGINEERING"*), and metallic door handle.
   - GSAP ScrollTrigger coordinates scroll progress:
     - Approach door &rarr; handle rotates &rarr; door swings open on its hinge &rarr; volumetric warm/blue light spills forward &rarr; camera pushes through into the sanctuary.
     - Interactive manual toggle button (*"Step Through Door"*) for non-scrolling or mobile visitors.

4. **Chapter 04: Philosophy & Background**  
   - *"THE PERSON BEHIND THE CODE"* editorial layout.
   - Detailed breakdown of MCA background, mobile ecosystem QA (Android & iOS), defect lifecycle tracking in JIRA, and AI developer workflows.

5. **Chapter 05: Scroll-Driven Experience Timeline**  
   - Giant year transition watermark (*2025 – 2026*).
   - Full-time Test Engineer tenure at **SIDE, Bangalore**.
   - Point of Contact (POC) for 4 features, mobile device testing, Scrum reporting, and UAT validation.

6. **Chapter 06: Engineered Project Showcase**  
   - **HeartSync:** Full-Stack Real-Time Social Web Application (React 18, TypeScript, Node.js, Express, Prisma, PostgreSQL, Socket.IO, BullMQ, Redis, Firebase, Docker).
   - **AI Software Testing Agent:** Autonomous QA Test Generation & Execution System (Python, Playwright, Streamlit, OpenAI API, SQLite).
   - Interactive 3D phone & browser mockups with detailed modal architecture breakdowns.

7. **Chapter 07: Interactive Skills Constellation**  
   - Interactive node constellation mapped across Quality Assurance, Software Development, and AI Tooling.
   - Elastic mouse interaction, hovering node inspection, category filter pills, and accessible mobile cards.

8. **Chapter 08: Education & Honors**  
   - MCA (Nehru College of Management, Bharathiyar University).
   - B.Sc Computer Science (Calicut University).
   - Class XII (CBSE).
   - UAE 1 Million Prompters Initiative Certification, Quarterly R&R Award, and inter-college tech event leadership.

9. **Chapter 09: Cinematic Contact & Celebration**  
   - *"LET'S BUILD SOMETHING EXTRAORDINARY."*
   - Working mailto link, direct WhatsApp chat, telephone dialer, one-click clipboard copying, and resume download.
   - Interactive transmission form with celebratory confetti physics.

---

## 🛠️ Tech Stack Architecture

- **Framework:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Custom Glassmorphism, CSS 3D transforms
- **3D & WebGL:** Three.js, PCFSoftShadows, ACESFilmicToneMapping, volumetric cones
- **Motion Orchestration:** GSAP 3.12, ScrollTrigger, Lenis smooth scrolling, Framer Motion
- **Icons & Polish:** Lucide React, Canvas Confetti

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 📦 Production Build

```bash
# Build production bundle with code-split chunks
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option 1: Automatic Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: cinematic 3D portfolio for Akshay Kanth C"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** &rarr; Select your GitHub repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Click **Deploy**. Vercel will automatically build using `vercel.json` and publish your live site with an SSL certificate.

### Option 2: Deploy using Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts to deploy directly from your terminal.


/**
 * NOOR BIBI PORTFOLIO — ADVANCED MULTI-ANIMATION & SYSTEM ARCHITECTURE ENGINE
 * Coolors Palette: #C9CBA3, #FFE1A8, #E26D5C, #723D46, #472D30
 */

// Immediate Scroll Restoration & Position Reset (High Priority Bug Fix)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initAmbientGlow();
  initCustomCursor();
  initSpotlightTracking();
  initThreeJsHero();
  initIntegrationHub();
  initBlueprintVisualizer();
  initTerminal();
  initProjectModals();
  initResumeModal();
  initCounters();
  initScrollReveal();
  initAutomatedContactForm();
  initCopyButtons();
  initMobileMenu();
  initProjectCategoryFilters();
});

/* ==========================================================================
   1. AMBIENT GLOW & MOUSE TRACKING
   ========================================================================== */
function initAmbientGlow() {
  const glow = document.getElementById('ambient-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderGlow);
  }
  requestAnimationFrame(renderGlow);
}

/* ==========================================================================
   2. CUSTOM CURSOR & SPOTLIGHT TRACKING
   ========================================================================== */
function initSpotlightTracking() {
  const cards = document.querySelectorAll('.spotlight-card, .telemetry-widget, .showcase-project-card, .contact-card, .station-card, .integration-node-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor || !dot) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  const interactives = document.querySelectorAll('a, button, input, textarea, select, .chip, .showcase-project-card, .cmd-chip, .marquee-item, .blueprint-tab, .filter-pill, .integration-node-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   3. THREE.JS INTERACTIVE 3D NEURAL CANVAS (WARM LUXURY PALETTE)
   ========================================================================== */
let threeSceneState = {
  scene: null,
  camera: null,
  renderer: null,
  particles: null,
  coreMesh: null,
  targetColor: new THREE.Color(0xe0ddcf),
  particleMaterial: null,
  wireMaterial: null
};

function initThreeJsHero() {
  if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  threeSceneState.scene = scene;

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 35;
  threeSceneState.camera = camera;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeSceneState.renderer = renderer;

  // Particle Constellation in Linen & Ivory
  const particleCount = 220;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 85;
    positions[i + 1] = (Math.random() - 0.5) * 65;
    positions[i + 2] = (Math.random() - 0.5) * 65;
    scales[i / 3] = Math.random() * 2 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xe0ddcf,
    size: 0.85,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  threeSceneState.particleMaterial = particleMaterial;

  const particles = new THREE.Points(geometry, particleMaterial);
  scene.add(particles);
  threeSceneState.particles = particles;

  // 3D Geometric Torus Knot in Warm Linen
  const knotGeo = new THREE.TorusKnotGeometry(6.5, 1.6, 100, 16, 2, 3);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xf1f0ea,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });
  threeSceneState.wireMaterial = wireMaterial;

  const coreMesh = new THREE.Mesh(knotGeo, wireMaterial);
  coreMesh.position.set(24, -6, -14);
  scene.add(coreMesh);
  threeSceneState.coreMesh = coreMesh;

  // Mouse Interactivity
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  let clock = new THREE.Clock();
  let isHeroVisible = true;

  if ('IntersectionObserver' in window) {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isHeroVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroEl);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isHeroVisible) return;

    const elapsedTime = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    particles.rotation.y = elapsedTime * 0.04 + targetX * 3;
    particles.rotation.x = elapsedTime * 0.02 + targetY * 3;

    coreMesh.rotation.x = elapsedTime * 0.15 + targetY * 4;
    coreMesh.rotation.y = elapsedTime * 0.2 + targetX * 4;

    renderer.render(scene, camera);
  }
  animate();
}

/* ==========================================================================
   4. CONNECTED INTEGRATION HUB INTERACTION
   ========================================================================== */
function initIntegrationHub() {
  const nodes = document.querySelectorAll('.integration-node-item');
  const readoutText = document.getElementById('hub-live-text');

  if (!readoutText) return;

  const nodeTelemetries = {
    rag: "ChromaDB: Indexing dense clinical vector embeddings for semantic evidence retrieval in MedAssist.",
    fastapi: "FastAPI Backend: Handling asynchronous RESTful inference pipelines with high-throughput Pydantic model serialization.",
    flutter: "Flutter & Dart: Cross-platform client powering camera vision stream capture and palette rendering in Atelier.",
    pytorch: "Computer Vision: 12-season custom facial undertone classification model trained on portrait dataset.",
    docker: "Docker & Kubernetes: Automated GitHub Actions container packaging with vulnerability scanning pipelines.",
    postgres: "PostgreSQL Engine: ACID-compliant relational data modeling, query optimization, and structured user profile storage."
  };

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const type = node.getAttribute('data-integration');
      if (nodeTelemetries[type]) {
        readoutText.textContent = nodeTelemetries[type];
      }
    });

    node.addEventListener('click', () => {
      const type = node.getAttribute('data-integration');
      if (nodeTelemetries[type]) {
        readoutText.textContent = nodeTelemetries[type];
        triggerConfetti();
      }
    });
  });
}

/* ==========================================================================
   5. ARCHITECTURE BLUEPRINT VISUALIZER
   ========================================================================== */
const blueprintData = {
  rag: {
    tag: "INTELLIGENCE SUBSYSTEM",
    title: "Dual-Layer Clinical RAG Verification",
    desc: "Converts medical queries into dense semantic vector embeddings in ChromaDB, filters candidate literature by cosine similarity thresholds, and passes evidence chunks through an LLM validation filter with dual-layer hallucination mitigation.",
    specs: [
      { label: "Architecture", value: "FastAPI asynchronous inference pipeline" },
      { label: "Vector Index", value: "ChromaDB HNSW Dense Index" },
      { label: "Verification", value: "Dual-layer hallucination mitigation" }
    ],
    svg: `
      <svg viewBox="0 0 500 200" fill="none" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 100 H160 M220 100 H300 M360 100 H440" stroke="#534b52" stroke-width="2" stroke-dasharray="4 4"/>
        <rect x="20" y="70" width="60" height="60" rx="8" fill="#3b313c" stroke="#e0ddcf" stroke-width="1.5"/>
        <text x="35" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">QUERY</text>
        
        <rect x="160" y="65" width="70" height="70" rx="10" fill="#474448" stroke="#e0ddcf" stroke-width="2"/>
        <text x="172" y="104" fill="#f1f0ea" font-family="'Space Grotesk'" font-size="10" font-weight="bold">ChromaDB</text>
        
        <rect x="300" y="65" width="70" height="70" rx="10" fill="#3b313c" stroke="#e0ddcf" stroke-width="2"/>
        <text x="312" y="104" fill="#e0ddcf" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">FILTER</text>
        
        <rect x="430" y="70" width="60" height="60" rx="8" fill="#3b313c" stroke="#e0ddcf" stroke-width="1.5"/>
        <text x="442" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">OUTPUT</text>
      </svg>
    `
  },
  vision: {
    tag: "COMPUTER VISION SUBSYSTEM",
    title: "12-Season Facial Undertone ML Engine",
    desc: "Processes camera capture in Flutter, detects facial landmark keypoints, extracts undertone pigmentation histograms, and infers seasonal palette alignment using a trained classifier.",
    specs: [
      { label: "Framework", value: "Flutter Mobile + Python CV" },
      { label: "Classification", value: "12-Season chromatic color matrix" },
      { label: "Inference", value: "Flutter client & FastAPI backend" }
    ],
    svg: `
      <svg viewBox="0 0 500 200" fill="none" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 100 H160 M220 100 H300 M360 100 H440" stroke="#534b52" stroke-width="2" stroke-dasharray="4 4"/>
        <rect x="20" y="70" width="60" height="60" rx="8" fill="#3b313c" stroke="#e0ddcf" stroke-width="1.5"/>
        <text x="32" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">CAMERA</text>
        
        <rect x="160" y="65" width="70" height="70" rx="10" fill="#474448" stroke="#f1f0ea" stroke-width="2"/>
        <text x="175" y="104" fill="#f1f0ea" font-family="'Space Grotesk'" font-size="10" font-weight="bold">CV MODEL</text>
        
        <rect x="300" y="65" width="70" height="70" rx="10" fill="#3b313c" stroke="#e0ddcf" stroke-width="2"/>
        <text x="316" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">FASTAPI</text>
        
        <rect x="430" y="70" width="60" height="60" rx="8" fill="#3b313c" stroke="#e0ddcf" stroke-width="1.5"/>
        <text x="442" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">PALETTE</text>
      </svg>
    `
  },
  cloud: {
    tag: "INFRASTRUCTURE SUBSYSTEM",
    title: "Containerized Microservices & Automated CI/CD",
    desc: "Implements 3-tier microservice architecture with automated GitHub Actions testing, security vulnerability scanning, Docker containerization, and Kubernetes cluster orchestration.",
    specs: [
      { label: "Orchestration", value: "Docker & Kubernetes cluster" },
      { label: "CI/CD", value: "GitHub Actions automated pipelines" },
      { label: "Database", value: "Database: PostgreSQL" }
    ],
    svg: `
      <svg viewBox="0 0 500 200" fill="none" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 100 H160 M220 100 H300 M360 100 H440" stroke="#534b52" stroke-width="2" stroke-dasharray="4 4"/>
        <rect x="20" y="70" width="60" height="60" rx="8" fill="#3b313c" stroke="#e0ddcf" stroke-width="1.5"/>
        <text x="34" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">GIT CI</text>
        
        <rect x="160" y="65" width="70" height="70" rx="10" fill="#474448" stroke="#e0ddcf" stroke-width="2"/>
        <text x="175" y="104" fill="#f1f0ea" font-family="'Space Grotesk'" font-size="10" font-weight="bold">DOCKER</text>
        
        <rect x="300" y="65" width="70" height="70" rx="10" fill="#3b313c" stroke="#e0ddcf" stroke-width="2"/>
        <text x="318" y="104" fill="#e0ddcf" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">K8S</text>
        
        <rect x="430" y="70" width="60" height="60" rx="8" fill="#3b313c" stroke="#e0ddcf" stroke-width="1.5"/>
        <text x="440" y="104" fill="#f1f0ea" font-family="'JetBrains Mono'" font-size="9" font-weight="bold">DEPLOY</text>
      </svg>
    `
  }
};

function initBlueprintVisualizer() {
  const tabs = document.querySelectorAll('.blueprint-tab');
  const circuitBox = document.getElementById('blueprint-circuit');
  const tagEl = document.getElementById('drawer-tag');
  const titleEl = document.getElementById('drawer-title');
  const descEl = document.getElementById('drawer-desc');
  const specsEl = document.getElementById('drawer-specs');

  if (!circuitBox || !tabs.length) return;

  function loadSubsystem(key) {
    const data = blueprintData[key] || blueprintData.rag;

    tabs.forEach(t => {
      if (t.getAttribute('data-subsystem') === key) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    circuitBox.innerHTML = data.svg;
    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (specsEl) {
      specsEl.innerHTML = data.specs.map(s => `
        <div class="spec-row"><strong>${s.label}</strong>: ${s.value}</div>
      `).join('');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-subsystem');
      loadSubsystem(key);
    });
  });

  loadSubsystem('rag');
}

/* ==========================================================================
   6. SCROLL REVEAL OBSERVER (FADE IN / FADE OUT ON SCROLL)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .section-tight, .dual-marquee-container');

  const observerOptions = {
    threshold: 0.02,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      } else {
        // Smooth fade out when scrolled far away, so it animates back in on scroll
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          entry.target.classList.remove('is-revealed');
        }
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   7. PROJECT CATEGORY FILTER PILLS
   ========================================================================== */
function filterProjectsByCategory(catKey) {
  const cards = document.querySelectorAll('.showcase-project-card');
  const pills = document.querySelectorAll('.filter-pill');

  pills.forEach(pill => {
    if (pill.getAttribute('data-category') === catKey) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  cards.forEach(card => {
    const cardCats = card.getAttribute('data-category').split(' ');
    if (catKey === 'all' || cardCats.includes(catKey)) {
      card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}

function initProjectCategoryFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-category');
      filterProjectsByCategory(cat);
    });
  });
}

/* ==========================================================================
   8. DEVELOPER TERMINAL
   ========================================================================== */
function initTerminal() {
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  const quickChips = document.querySelectorAll('.cmd-chip');

  if (!form || !input || !body) return;

  const commandHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `
Available Commands:
  • <span class="text-highlight">skills</span>          : Display full tech stack & proficiency breakdown
  • <span class="text-highlight">projects</span>        : List architecture summaries for MedAssist, SmogSense, Atelier, DevOpsFlow
  • <span class="text-highlight">medassist</span>       : Direct link to live MedAssist Web App
  • <span class="text-highlight">smogsense</span>       : Direct link to live SmogSense Air Quality App
  • <span class="text-highlight">eval-rag</span>        : Run simulation of Noor's dual-layer RAG hallucination test (demo simulation)
  • <span class="text-highlight">experience</span>      : View professional roles & leadership journey
  • <span class="text-highlight">resume</span>          : Trigger the instant PDF Resume viewer modal
  • <span class="text-highlight">contact</span>         : Fetch direct email, phone, LinkedIn & GitHub details
  • <span class="text-highlight">clear</span>           : Clear the terminal console screen
    `,
    skills: () => `
<span class="text-highlight">⚡ Technical Competencies & Ecosystem:</span>
  • <strong>AI / ML:</strong> RAG, Large Language Models (LLMs), XGBoost, Computer Vision (12-season classifier), ChromaDB
  • <strong>Full Stack & Mobile:</strong> Python (FastAPI), Flutter, Dart, RESTful APIs, Node.js, Express.js, React.js, Next.js
  • <strong>Databases & Cloud:</strong> PostgreSQL, ChromaDB, SQLAlchemy, Vercel
  • <strong>DevOps & Tools:</strong> Docker, Kubernetes, GitHub Actions CI/CD, Git, JWT
    `,
    projects: () => `
<span class="text-highlight">🚀 Featured Engineering Systems:</span>
  1. <strong>MedAssist</strong> : RAG-Powered Clinical Assistant with dual-layer hallucination mitigation.
     • Live App: <a href="https://medassist-rag-two.vercel.app/" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://medassist-rag-two.vercel.app/</a>
     • GitHub  : <a href="https://github.com/noor-bibi-bi/medassist-rag" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://github.com/noor-bibi-bi/medassist-rag</a>
     • 25/25 on a 25-question eval set across five medical categories. Known limitation: can still overfit on some responses.
  2. <strong>SmogSense</strong> : AI Air Quality Forecasting for Lahore with FastAPI & XGBoost Dual Engine.
     • Live App: <a href="https://smog-sense.vercel.app/" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://smog-sense.vercel.app/</a>
     • GitHub  : <a href="https://github.com/noor-bibi-bi/SmogSense" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://github.com/noor-bibi-bi/SmogSense</a>
  3. <strong>Atelier</strong> : AI-Based Personal Styling App with Flutter & 12-season CV model (Proprietary).
  4. <strong>DevOpsFlow</strong> : Scalable 3-tier microservices platform with automated CI/CD container vulnerability scanning.
     • GitHub  : <a href="https://github.com/noor-bibi-bi/devopsflow-Project" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://github.com/noor-bibi-bi/devopsflow-Project</a>
    `,
    medassist: () => {
      window.open('https://medassist-rag-two.vercel.app/', '_blank');
      return `🚀 Opening MedAssist live demo web application (<a href="https://medassist-rag-two.vercel.app/" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://medassist-rag-two.vercel.app/</a>)...`;
    },
    "medassist-demo": () => {
      window.open('https://medassist-rag-two.vercel.app/', '_blank');
      return `🚀 Opening MedAssist live demo web application (<a href="https://medassist-rag-two.vercel.app/" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://medassist-rag-two.vercel.app/</a>)...`;
    },
    smogsense: () => {
      window.open('https://smog-sense.vercel.app/', '_blank');
      return `🚀 Opening SmogSense live air quality forecasting application (<a href="https://smog-sense.vercel.app/" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://smog-sense.vercel.app/</a>)...`;
    },
    "smogsense-demo": () => {
      window.open('https://smog-sense.vercel.app/', '_blank');
      return `🚀 Opening SmogSense live air quality forecasting application (<a href="https://smog-sense.vercel.app/" target="_blank" style="color: #e0ddcf; text-decoration: underline;">https://smog-sense.vercel.app/</a>)...`;
    },
    experience: () => `
<span class="text-highlight">💼 Experience & Leadership Highlights:</span>
  • <strong>Instructor</strong> @ RISE (Jul 2025 – Present) : Mentoring small cohorts of 11-15 students in core computer science, algorithmic logic, and web development.
  • <strong>President</strong> @ BNU SciTech Society (May 2025 – Jun 2026) : Led university-wide STEM symposiums, technical hackathons, and cross-departmental coding initiatives.
  • <strong>Teaching Assistant</strong> @ BNU (Sep 2024 – May 2025) : DBMS, ADBMS & AI tutorial instruction and lab mentoring for 60+ undergraduate engineers.
  • <strong>Frontend Developer</strong> @ Bytecode Technologies Pvt. Ltd. (2023 – 2024) : Frontend engineering & component systems.
  • <strong>Freelance Developer & Digital Specialist</strong> (Mar 2021 – Present) : Delivered frontend, full-stack, and Flutter client solutions via Fiverr, Upwork, and direct clients; maintained and troubleshot Shopify-based client store websites and managed client Instagram and Facebook accounts (content planning, posting, audience engagement).
  • <strong>BS in Computer Science</strong> @ Beaconhouse National University (Sep 2022 – Jun 2026).
    `,
    contact: () => `
<span class="text-highlight">📬 Direct Contact Coordinates:</span>
  • Primary Email   : <span style="color: #f1f0ea;">noorbibi803@gmail.com</span>
  • Phone / WhatsApp: <span style="color: #e0ddcf;">+92 328 4742501</span>
  • Location        : Lahore, Pakistan
  • LinkedIn        : https://www.linkedin.com/in/noor-bibi-a75263282
  • GitHub          : https://github.com/noor-bibi-bi
    `,
    resume: () => {
      openResumeModal();
      return `📄 Opening Noor Bibi's Resume CV (PDF) modal viewer...`;
    },
    clear: () => {
      body.innerHTML = '';
      return '';
    },
    "eval-rag": () => {
      runRagSimulation();
      return `⚡ Initializing Clinical RAG Dual-Layer Validation Benchmark (Demo Simulation)...`;
    }
  };

  function appendTerminalOutput(cmd, outputHtml) {
    if (cmd.toLowerCase() === 'clear') {
      body.innerHTML = '';
      return;
    }

    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = `
      <div class="terminal-line">
        <span class="terminal-prompt">guest@noor-portfolio:~$</span>
        <span class="terminal-cmd-echo">${escapeHtml(cmd)}</span>
      </div>
      <div class="terminal-output">${outputHtml}</div>
    `;
    body.appendChild(entry);
    body.scrollTop = body.scrollHeight;
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    if (terminalCommands[cmd]) {
      const result = terminalCommands[cmd]();
      if (result) appendTerminalOutput(rawCmd, result);
    } else {
      appendTerminalOutput(rawCmd, `Command not found: <span style="color: #e0ddcf;">${escapeHtml(cmd)}</span>. Type <span class="text-highlight">'help'</span>.`);
    }
  }

  function runRagSimulation() {
    const simEntry = document.createElement('div');
    simEntry.className = 'terminal-entry';
    simEntry.innerHTML = `
      <div class="terminal-line">
        <span class="terminal-prompt">guest@noor-portfolio:~$</span>
        <span class="terminal-cmd-echo">eval-rag</span>
      </div>
      <div class="terminal-output" id="rag-sim-output">
        <div style="color: #e0ddcf;">[1/4] Embedding 25 medical queries into vector space with ChromaDB...</div>
      </div>
    `;
    body.appendChild(simEntry);
    body.scrollTop = body.scrollHeight;

    const out = simEntry.querySelector('#rag-sim-output');

    setTimeout(() => {
      out.innerHTML += `<div style="color: #f1f0ea;">[2/4] Executing similarity search & evidence context retrieval...</div>`;
      body.scrollTop = body.scrollHeight;
    }, 600);

    setTimeout(() => {
      out.innerHTML += `<div style="color: #e0ddcf;">[3/4] Running dual-layer hallucination filtering and LLM relevance verification...</div>`;
      body.scrollTop = body.scrollHeight;
    }, 1200);

    setTimeout(() => {
      out.innerHTML += `
        <div style="color: #f1f0ea; font-weight: 700; margin-top: 6px;">
          [4/4] ✅ Demo Simulation Complete: 25/25 on a 25-question eval set across five medical categories. Dual-layer hallucination mitigation applied.
        </div>
      `;
      body.scrollTop = body.scrollHeight;
      triggerConfetti();
    }, 1800);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    executeCommand(val);
    input.value = '';
  });

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      input.focus();
    });
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   9. PROJECT MODALS
   ========================================================================== */
const projectDetails = {
  medassist: {
    title: "MedAssist – RAG Clinical Knowledge Assistant",
    subtitle: "AI / LLM Architecture • ChromaDB • FastAPI • Hallucination Filtering",
    content: `
      <div class="modal-project-deepdive">
        <div class="project-stat-strip">
          <div class="p-stat"><strong>Validation</strong>: 25/25 Clinical Eval Set</div>
          <div class="p-stat"><strong>Vector DB</strong>: ChromaDB</div>
          <div class="p-stat"><strong>Deployment</strong>: Vercel Live App</div>
        </div>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Live Interactive Demo</h4>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 14px;">
          Experience the clinical assistant in action directly:
          <a href="https://medassist-rag-two.vercel.app/" target="_blank" style="color: #e26d5c; font-weight: 600; text-decoration: underline;">https://medassist-rag-two.vercel.app/</a>
        </p>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Problem Statement</h4>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.65;">
          Standard Large Language Models frequently generate hallucinations when tasked with nuanced medical queries, posing severe risks in healthcare diagnostics and clinical evidence retrieval.
        </p>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Architecture & Engineering Solution</h4>
        <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
          <li>Constructed a robust Retrieval-Augmented Generation (RAG) pipeline ingesting clinical literature into ChromaDB vector embeddings.</li>
          <li>Engineered a dual-layer verification protocol: first filtering retrieved chunks by semantic threshold, followed by an LLM relevance validator.</li>
          <li>Exposed endpoints via FastAPI for seamless integration into clinical workflows.</li>
          <li><strong>Evaluation Benchmark:</strong> 25/25 on a 25-question eval set across five medical categories. Known limitation: can still overfit on some responses.</li>
        </ul>
        <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px;">
          <a href="https://medassist-rag-two.vercel.app/" target="_blank" class="btn btn-primary-sm">
            <i data-lucide="play-circle"></i> Launch Live Web App
          </a>
          <a href="https://github.com/noor-bibi-bi/medassist-rag" target="_blank" class="btn btn-glass-sm">
            <svg class="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg> View GitHub Repository
          </a>
        </div>
      </div>
    `
  },
  smogsense: {
    title: "SmogSense – AI Air Quality Forecasting for Lahore",
    subtitle: "FastAPI • XGBoost Dual Ensemble • OpenAQ API • Open-Meteo • Vercel",
    content: `
      <div class="modal-project-deepdive">
        <div class="project-stat-strip">
          <div class="p-stat"><strong>Model</strong>: XGBoost Dual Engine</div>
          <div class="p-stat"><strong>Forecasting</strong>: 7-Day Trend + Recess Advisory</div>
          <div class="p-stat"><strong>Deployment</strong>: Vercel Live App</div>
        </div>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Live Interactive Demo</h4>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 14px;">
          Explore air quality forecasts and school advisories for Lahore:
          <a href="https://smog-sense.vercel.app/" target="_blank" style="color: #e26d5c; font-weight: 600; text-decoration: underline;">https://smog-sense.vercel.app/</a>
        </p>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Problem Statement</h4>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.65;">
          Lahore endures severe hazardous winter smog spikes. Citizens and educational institutions need dependable, hyperlocal forecasts to safeguard children and make proactive outdoor activity decisions.
        </p>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Architecture & Engineering Solution</h4>
        <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
          <li>Engineered a dual XGBoost architecture: a classifier for school outdoor recess advisories and a regressor predicting 7-day PM2.5 trends.</li>
          <li>Integrated environmental sensor data from OpenAQ API (sensor 7466365) combined with meteorological inputs from Open-Meteo.</li>
          <li>Built an asynchronous FastAPI backend and responsive web interface deployed seamlessly on Vercel.</li>
        </ul>
        <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px;">
          <a href="https://smog-sense.vercel.app/" target="_blank" class="btn btn-primary-sm">
            <i data-lucide="play-circle"></i> Launch Live Web App
          </a>
          <a href="https://github.com/noor-bibi-bi/SmogSense" target="_blank" class="btn btn-glass-sm">
            <svg class="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg> View GitHub Repository
          </a>
        </div>
      </div>
    `
  },
  atelier: {
    title: "Atelier – AI-Based Personal Styling Application",
    subtitle: "Flutter Mobile • Computer Vision • FastAPI • Machine Learning",
    content: `
      <div class="modal-project-deepdive">
        <div class="project-stat-strip">
          <div class="p-stat"><strong>Model</strong>: 12-Season Color Classifier</div>
          <div class="p-stat"><strong>Mobile</strong>: Flutter & Dart</div>
          <div class="p-stat"><strong>Backend</strong>: FastAPI & Python</div>
        </div>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Problem Statement</h4>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.65;">
          Consumers struggle to identify flattering color palettes and build cohesive wardrobes that complement their unique undertones and seasonal palettes.
        </p>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Architecture & Engineering Solution</h4>
        <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
          <li>Trained a 12-season computer vision machine learning model to analyze facial undertones and lighting from user selfies.</li>
          <li>Designed a cross-platform Flutter application featuring intuitive camera capture, dynamic color palette generators, and wardrobe organization.</li>
          <li>Engineered a FastAPI backend providing wardrobe matching algorithms, outfit planning, and personalized recommendation feeds.</li>
        </ul>
      </div>
    `
  },
  devopsflow: {
    title: "DevOpsFlow – Containerized CI/CD Platform",
    subtitle: "Express • PostgreSQL • Docker • Kubernetes • GitHub Actions",
    content: `
      <div class="modal-project-deepdive">
        <div class="project-stat-strip">
          <div class="p-stat"><strong>Architecture</strong>: 3-Tier Microservices</div>
          <div class="p-stat"><strong>Containerization</strong>: Docker & Kubernetes</div>
          <div class="p-stat"><strong>CI/CD</strong>: GitHub Actions</div>
        </div>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Problem Statement</h4>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.65;">
          Modern cloud applications require automated deployment pipelines with built-in vulnerability scanning to accelerate release cycles safely.
        </p>
        <h4 style="margin: 18px 0 8px 0; color: var(--text-main);">Architecture & Engineering Solution</h4>
        <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
          <li>Architected a scalable three-tier microservices platform using Express and PostgreSQL.</li>
          <li>Constructed GitHub Actions workflows integrating unit testing, automated security scans, Docker container packaging, and Kubernetes deployment.</li>
          <li>Implemented secure container configurations and reverse proxy routing for resilient deployment reliability.</li>
        </ul>
        <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px;">
          <a href="https://github.com/noor-bibi-bi/devopsflow-Project" target="_blank" class="btn btn-primary-sm">
            <svg class="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg> View GitHub Repository
          </a>
        </div>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('project-modal-title');
  const subEl = document.getElementById('project-modal-subtitle');
  const contentEl = document.getElementById('project-modal-content');
  const closeBtn = document.getElementById('close-project-modal');
  const openBtns = document.querySelectorAll('.open-project-modal');

  if (!modal || !titleEl || !contentEl) return;

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    titleEl.textContent = data.title;
    subEl.textContent = data.subtitle;
    contentEl.innerHTML = data.content;

    if (window.lucide) window.lucide.createIcons();

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   10. RESUME PDF MODAL VIEWER (PDF.JS UNIVERSAL HTML5 CANVAS RENDERER)
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = [
    document.getElementById('open-resume-btn'),
    document.getElementById('mobile-resume-btn')
  ].filter(Boolean);
  const closeBtn = document.getElementById('close-resume-modal');

  if (!modal) return;

  let pdfRendered = false;

  function loadAndRenderPdf() {
    if (pdfRendered) return;
    const container = document.getElementById('pdf-pages-container');
    const spinner = document.getElementById('pdf-loading-spinner');
    if (!container) return;

    if (!window.pdfjsLib) {
      if (spinner) {
        spinner.innerHTML = `
          <p style="color: #f1f0ea; margin-bottom: 14px;">Curriculum Vitae — Noor Bibi</p>
          <a href="Noor_CV.pdf" target="_blank" download="Noor_Bibi_CV.pdf" class="btn btn-primary">
            Download / View PDF File
          </a>
        `;
      }
      return;
    }

    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      pdfjsLib.getDocument('Noor_CV.pdf').promise.then(pdf => {
        pdfRendered = true;
        if (spinner) spinner.style.display = 'none';
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf.getPage(pageNum).then(page => {
            const scale = window.innerWidth < 768 ? 1.0 : 1.45;
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            canvas.style.maxWidth = '100%';
            canvas.style.height = 'auto';
            canvas.style.borderRadius = '8px';
            canvas.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.7)';
            canvas.style.background = '#ffffff';
            canvas.style.display = 'block';

            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            container.appendChild(canvas);

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
        }
      }).catch(err => {
        console.error('PDF.js render error:', err);
        if (spinner) {
          spinner.innerHTML = `
            <p style="color: #f1f0ea; margin-bottom: 14px;">Curriculum Vitae — Noor Bibi (PDF)</p>
            <a href="Noor_CV.pdf" target="_blank" download="Noor_Bibi_CV.pdf" class="btn btn-primary">
              Download / View PDF Directly
            </a>
          `;
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  window.openResumeModal = function() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    triggerConfetti();
    loadAndRenderPdf();
  };

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openResumeModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   11. COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1200;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        runCounters();
        animated = true;
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('telemetry');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   12. AUTOMATED EMAIL DISPATCH
   ========================================================================== */
function initAutomatedContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-contact-btn');
  const submitText = document.getElementById('btn-submit-text');
  const openClientBtn = document.getElementById('open-client-btn');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  if (openClientBtn) {
    openClientBtn.addEventListener('click', () => {
      const name = document.getElementById('form-name').value.trim() || 'Visitor';
      const email = document.getElementById('form-email').value.trim() || 'Not specified';
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value.trim() || 'Hello Noor, reaching out from your portfolio website!';

      const mailtoLink = `mailto:noorbibi803@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoLink;
      showToast('Opening default email application for noorbibi803@gmail.com...');
      triggerConfetti();
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please fill out all required fields (Name, Email, Message).';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }
    if (submitText) submitText.textContent = 'Sending to noorbibi803@gmail.com...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/noorbibi803@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
          message: message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        form.reset();
        if (feedback) {
          feedback.className = 'form-feedback success';
          feedback.textContent = '✓ Message sent successfully to noorbibi803@gmail.com! Thank you for reaching out.';
        }
        showToast('✓ Message sent directly to noorbibi803@gmail.com!');
        triggerConfetti();
      } else {
        throw new Error('Delivery fallback');
      }
    } catch (err) {
      const mailtoFallback = `mailto:noorbibi803@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoFallback;

      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '✓ Opened email client for direct sending to noorbibi803@gmail.com.';
      }
      showToast('Opening email client for noorbibi803@gmail.com...');
      triggerConfetti();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
      if (submitText) submitText.textContent = 'Send Message';
    }
  });
}

function initCopyButtons() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          triggerConfetti();
        });
      } else {
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#e0ddcf', '#f1f0ea', '#534b52', '#474448', '#2d232e']
    });
  }
}

/* ==========================================================================
   13. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

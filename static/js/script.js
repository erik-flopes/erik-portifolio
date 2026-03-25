/* ─── MOCK API (standalone mode) ──────────────────
   Remove este bloco quando integrado com o backend Flask
─────────────────────────────────────────────────── */
const MOCK_DATA = {
  projects: {"count": 6, "projects": [{"category": "Full Stack", "demo": "https://demo.example.com", "description": "Plataforma de monitoramento de modelos de ML em tempo real com dashboards interativos, alertas automáticos e pipelines de dados.", "featured": true, "github": "https://github.com", "id": 1, "image": "project1", "metrics": {"forks": 67, "stars": 248}, "tags": ["Python", "FastAPI", "React", "PostgreSQL", "Redis"], "title": "NeuralHub Dashboard"}, {"category": "Backend", "demo": "https://demo.example.com", "description": "Gateway de pagamentos robusto com suporte a múltiplos métodos, webhooks em tempo real e relatórios financeiros automatizados.", "featured": true, "github": "https://github.com", "id": 2, "image": "project2", "metrics": {"forks": 41, "stars": 183}, "tags": ["Python", "Django", "Stripe", "Docker", "AWS"], "title": "SwiftPay API"}, {"category": "Mobile", "demo": "https://demo.example.com", "description": "App de sincronização de arquivos cross-platform com criptografia end-to-end, modo offline e colaboração em tempo real.", "featured": false, "github": "https://github.com", "id": 3, "image": "project3", "metrics": {"forks": 18, "stars": 92}, "tags": ["React Native", "Node.js", "Firebase", "TypeScript"], "title": "CloudSync Mobile"}, {"category": "DevOps", "demo": "https://demo.example.com", "description": "Sistema de orquestração de deploy automatizado com rollback inteligente, blue-green deployments e monitoramento de saúde.", "featured": true, "github": "https://github.com", "id": 4, "image": "project4", "metrics": {"forks": 89, "stars": 321}, "tags": ["Python", "Kubernetes", "Terraform", "CI/CD", "Go"], "title": "DevOps Orchestrator"}, {"category": "AI/ML", "demo": "https://demo.example.com", "description": "Motor de geração de conteúdo inteligente com RAG, fine-tuning personalizado e integração com múltiplos LLMs.", "featured": false, "github": "https://github.com", "id": 5, "image": "project5", "metrics": {"forks": 44, "stars": 156}, "tags": ["Python", "LangChain", "OpenAI", "FastAPI", "Redis"], "title": "AI Content Engine"}, {"category": "Full Stack", "demo": "https://demo.example.com", "description": "Plataforma de analytics em tempo real processando 10M+ eventos/dia com visualizações interativas e alertas configuráveis.", "featured": false, "github": "https://github.com", "id": 6, "image": "project6", "metrics": {"forks": 55, "stars": 207}, "tags": ["Python", "Kafka", "ClickHouse", "Vue.js", "WebSocket"], "title": "RealTime Analytics"}], "success": true},
  skills: {"skills": {"AI & Data": [{"level": 80, "name": "LangChain / LLMs"}, {"level": 85, "name": "Pandas / NumPy"}, {"level": 75, "name": "Apache Kafka"}, {"level": 72, "name": "ML Pipelines"}, {"level": 78, "name": "Data Engineering"}], "Backend": [{"level": 95, "name": "Python"}, {"level": 90, "name": "FastAPI / Django"}, {"level": 82, "name": "Node.js"}, {"level": 88, "name": "PostgreSQL"}, {"level": 80, "name": "Redis / MongoDB"}], "DevOps & Cloud": [{"level": 85, "name": "Docker / K8s"}, {"level": 80, "name": "AWS / GCP"}, {"level": 78, "name": "Terraform / IaC"}, {"level": 88, "name": "CI/CD Pipelines"}, {"level": 90, "name": "Linux / Bash"}], "Frontend": [{"level": 88, "name": "React / Next.js"}, {"level": 85, "name": "TypeScript"}, {"level": 75, "name": "Vue.js"}, {"level": 87, "name": "CSS / Tailwind"}, {"level": 78, "name": "React Native"}]}, "success": true},
  experience: {"experience": [{"company": "TechCore Labs", "description": "Liderança técnica de squad de 6 devs. Arquitetura de microsserviços em AWS. Redução de 40% no tempo de deployment via CI/CD.", "period": "2022 — Presente", "role": "Senior Software Engineer", "type": "fulltime"}, {"company": "StartupBridge", "description": "Desenvolvimento do produto do zero. Stack Python/React. Escalonamento de 1K para 200K usuários em 18 meses.", "period": "2020 — 2022", "role": "Full Stack Developer", "type": "fulltime"}, {"company": "Freelance & Consultoria", "description": "Mais de 30 projetos entregues para clientes no Brasil, EUA e Europa. Especialização em automação e APIs REST.", "period": "2018 — 2020", "role": "Software Consultant", "type": "freelance"}], "success": true},
  stats: {"stats": {"clients": 47, "github_stars": 1207, "messages_received": 0, "projects": 6, "years_experience": 7}, "success": true}
};

const originalFetch = window.fetch;
window.fetch = function(url, opts) {
  const path = url.replace(window.location.origin, '');
  
  if (path === '/api/stats') return Promise.resolve({ json: () => Promise.resolve(MOCK_DATA.stats) });
  if (path.startsWith('/api/projects') && !path.match(/\/api\/projects\/\d/)) {
    const urlObj = new URL(url, window.location.href);
    const cat = urlObj.searchParams.get('category');
    let projs = MOCK_DATA.projects.projects;
    if (cat && cat !== 'all') projs = projs.filter(p => p.category.toLowerCase() === cat.toLowerCase());
    return Promise.resolve({ json: () => Promise.resolve({ success: true, count: projs.length, projects: projs }) });
  }
  if (path === '/api/skills') return Promise.resolve({ json: () => Promise.resolve(MOCK_DATA.skills) });
  if (path === '/api/experience') return Promise.resolve({ json: () => Promise.resolve(MOCK_DATA.experience) });
  if (path === '/api/contact' && opts && opts.method === 'POST') {
    const body = JSON.parse(opts.body);
    if (!body.name || !body.email || !body.message) {
      return Promise.resolve({ json: () => Promise.resolve({ success: false, error: 'Nome, email e mensagem são obrigatórios' }) });
    }
    return Promise.resolve({ json: () => Promise.resolve({ success: true, message: 'Mensagem recebida! Entrarei em contato em breve, ' + body.name + '. 🚀' }) });
  }
  return originalFetch(url, opts);
};

/* ═══════════════════════════════════════════════
   BASE URL — muda para produção
═══════════════════════════════════════════════ */
const API_BASE = '';  // same origin

const PROJECT_ICONS = ['🧠','💳','☁️','⚙️','✨','📊'];
const PROJECT_COLORS = ['icon-blue','icon-green','icon-orange','icon-purple','icon-pink','icon-teal'];

/* ═══════════════════════════════════════════════
   FETCH HELPERS
═══════════════════════════════════════════════ */
async function api(endpoint) {
  const r = await fetch(API_BASE + endpoint);
  return r.json();
}

/* ═══════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════ */
async function loadStats() {
  try {
    const d = await api('/api/stats');
    if (d.success) {
      animateNum('stat-projects', d.stats.projects);
      animateNum('stat-clients', d.stats.clients);
      animateNum('stat-stars', d.stats.github_stars);
    }
  } catch(e) {}
}

function animateNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0;
  const step = target / 40;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.round(cur) + (target > 100 ? '' : '');
    if (cur >= target) clearInterval(t);
  }, 30);
}

/* ═══════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════ */
let allProjects = [];

async function loadProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '<div style="color:var(--text-3);font-size:14px;padding:20px;grid-column:1/-1">Carregando...</div>';

  try {
    const d = await api('/api/projects' + (filter !== 'all' ? '?category=' + encodeURIComponent(filter) : ''));
    if (d.success) {
      allProjects = d.projects;
      renderProjects(d.projects);
    }
  } catch(e) {
    grid.innerHTML = '<div style="color:var(--text-3);font-size:14px;padding:20px;grid-column:1/-1">Erro ao carregar projetos</div>';
  }
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!projects.length) {
    grid.innerHTML = '<div style="color:var(--text-3);font-size:14px;padding:20px;grid-column:1/-1">Nenhum projeto nesta categoria</div>';
    return;
  }
  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card" style="animation-delay:${i * 0.05}s">
      <div class="project-card-header">
        <div class="project-icon ${PROJECT_COLORS[i % 6]}">${PROJECT_ICONS[i % 6]}</div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" class="project-link" title="GitHub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="${p.demo}" target="_blank" class="project-link" title="Demo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-metrics">
        <span class="metric">⭐ ${p.metrics.stars}</span>
        <span class="metric">🍴 ${p.metrics.forks}</span>
        <span class="metric" style="margin-left:auto;font-size:11px;color:var(--blue)">${p.category}</span>
      </div>
    </div>
  `).join('');
}

/* Filter tabs */
document.getElementById('filter-tabs').addEventListener('click', e => {
  const btn = e.target.closest('.filter-tab');
  if (!btn) return;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadProjects(btn.dataset.filter);
});

/* ═══════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════ */
const CAT_ICONS = {'Backend':'🔧','Frontend':'🎨','DevOps & Cloud':'☁️','AI & Data':'🤖'};

async function loadSkills() {
  try {
    const d = await api('/api/skills');
    if (!d.success) return;
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = Object.entries(d.skills).map(([cat, skills]) => `
      <div class="skill-category reveal">
        <div class="skill-cat-title">
          <span class="skill-cat-icon">${CAT_ICONS[cat] || '⚡'}</span>
          ${cat}
        </div>
        ${skills.map(s => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-fill" data-level="${s.level / 100}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');

    // Observe for animation
    document.querySelectorAll('.skill-fill').forEach(fill => {
      skillObserver.observe(fill);
    });
    // Re-observe reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } catch(e) {}
}

/* ═══════════════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════════════ */
async function loadExperience() {
  try {
    const d = await api('/api/experience');
    if (!d.success) return;
    const list = document.getElementById('experience-list');
    list.innerHTML = d.experience.map(e => `
      <div class="exp-card reveal">
        <div class="exp-indicator"></div>
        <div>
          <div class="exp-company">${e.company}</div>
          <div class="exp-role">${e.role}</div>
          <div class="exp-period">${e.period}</div>
          <div class="exp-desc">${e.description}</div>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } catch(e) {}
}

/* ═══════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════ */
async function sendContact() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const message = document.getElementById('f-message').value.trim();

  if (!name || !email || !message) {
    showToast('Por favor preencha nome, email e mensagem', 'error');
    return;
  }

  const btn = document.getElementById('contact-btn');
  const spinner = document.getElementById('btn-spinner');
  const text = document.getElementById('btn-text');
  const arrow = document.getElementById('btn-arrow');

  btn.disabled = true;
  spinner.style.display = 'block';
  text.textContent = 'Enviando...';
  arrow.style.display = 'none';

  try {
    const r = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    const d = await r.json();

    if (d.success) {
      showToast(d.message, 'success');
      document.getElementById('f-name').value = '';
      document.getElementById('f-email').value = '';
      document.getElementById('f-subject').value = '';
      document.getElementById('f-message').value = '';
    } else {
      showToast(d.error || 'Erro ao enviar mensagem', 'error');
    }
  } catch(e) {
    showToast('Erro de conexão com o servidor', 'error');
  } finally {
    btn.disabled = false;
    spinner.style.display = 'none';
    text.textContent = 'Enviar Mensagem';
    arrow.style.display = 'inline';
  }
}

/* ═══════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════ */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.className = 'toast ' + type;
  toast.innerHTML = (type === 'success' ? '✅ ' : '❌ ') + msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ═══════════════════════════════════════════════
   INTERSECTION OBSERVERS
═══════════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target;
      fill.style.transform = `scaleX(${fill.dataset.level})`;
      fill.classList.add('animated');
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
loadStats();
loadProjects();
loadSkills();
loadExperience();

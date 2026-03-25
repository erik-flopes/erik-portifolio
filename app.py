"""
Portfolio Backend - Flask API
Fullstack Developer Portfolio
"""

from flask import Flask, request, jsonify, render_template
import json
import os
import smtplib
import re
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Initialize Flask app
# __file__ is the path to this script
# dirname gets the folder containing this script
# Setting static_url_path and static_folder to serve CSS/JS files
app = Flask(__name__, static_folder='static', static_url_path='/static', template_folder='templates')
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'

# ─── Data Store (In production: use PostgreSQL/MongoDB) ─────────────────────

PROJECTS = [
    {
        "id": 1,
        "title": "NeuralHub Dashboard",
        "category": "Full Stack",
        "tags": ["Python", "FastAPI", "React", "PostgreSQL", "Redis"],
        "description": "Plataforma de monitoramento de modelos de ML em tempo real com dashboards interativos, alertas automáticos e pipelines de dados.",
        "image": "project1",
        "github": "https://github.com",
        "demo": "https://demo.example.com",
        "featured": True,
        "metrics": {"stars": 248, "forks": 67}
    },
    {
        "id": 2,
        "title": "SwiftPay API",
        "category": "Backend",
        "tags": ["Python", "Django", "Stripe", "Docker", "AWS"],
        "description": "Gateway de pagamentos robusto com suporte a múltiplos métodos, webhooks em tempo real e relatórios financeiros automatizados.",
        "image": "project2",
        "github": "https://github.com",
        "demo": "https://demo.example.com",
        "featured": True,
        "metrics": {"stars": 183, "forks": 41}
    },
    {
        "id": 3,
        "title": "CloudSync Mobile",
        "category": "Mobile",
        "tags": ["React Native", "Node.js", "Firebase", "TypeScript"],
        "description": "App de sincronização de arquivos cross-platform com criptografia end-to-end, modo offline e colaboração em tempo real.",
        "image": "project3",
        "github": "https://github.com",
        "demo": "https://demo.example.com",
        "featured": False,
        "metrics": {"stars": 92, "forks": 18}
    },
    {
        "id": 4,
        "title": "DevOps Orchestrator",
        "category": "DevOps",
        "tags": ["Python", "Kubernetes", "Terraform", "CI/CD", "Go"],
        "description": "Sistema de orquestração de deploy automatizado com rollback inteligente, blue-green deployments e monitoramento de saúde.",
        "image": "project4",
        "github": "https://github.com",
        "demo": "https://demo.example.com",
        "featured": True,
        "metrics": {"stars": 321, "forks": 89}
    },
    {
        "id": 5,
        "title": "AI Content Engine",
        "category": "AI/ML",
        "tags": ["Python", "LangChain", "OpenAI", "FastAPI", "Redis"],
        "description": "Motor de geração de conteúdo inteligente com RAG, fine-tuning personalizado e integração com múltiplos LLMs.",
        "image": "project5",
        "github": "https://github.com",
        "demo": "https://demo.example.com",
        "featured": False,
        "metrics": {"stars": 156, "forks": 44}
    },
    {
        "id": 6,
        "title": "RealTime Analytics",
        "category": "Full Stack",
        "tags": ["Python", "Kafka", "ClickHouse", "Vue.js", "WebSocket"],
        "description": "Plataforma de analytics em tempo real processando 10M+ eventos/dia com visualizações interativas e alertas configuráveis.",
        "image": "project6",
        "github": "https://github.com",
        "demo": "https://demo.example.com",
        "featured": False,
        "metrics": {"stars": 207, "forks": 55}
    }
]

SKILLS = {
    "Backend": [
        {"name": "Python", "level": 95},
        {"name": "FastAPI / Django", "level": 90},
        {"name": "Node.js", "level": 82},
        {"name": "PostgreSQL", "level": 88},
        {"name": "Redis / MongoDB", "level": 80},
    ],
    "Frontend": [
        {"name": "React / Next.js", "level": 88},
        {"name": "TypeScript", "level": 85},
        {"name": "Vue.js", "level": 75},
        {"name": "CSS / Tailwind", "level": 87},
        {"name": "React Native", "level": 78},
    ],
    "DevOps & Cloud": [
        {"name": "Docker / K8s", "level": 85},
        {"name": "AWS / GCP", "level": 80},
        {"name": "Terraform / IaC", "level": 78},
        {"name": "CI/CD Pipelines", "level": 88},
        {"name": "Linux / Bash", "level": 90},
    ],
    "AI & Data": [
        {"name": "LangChain / LLMs", "level": 80},
        {"name": "Pandas / NumPy", "level": 85},
        {"name": "Apache Kafka", "level": 75},
        {"name": "ML Pipelines", "level": 72},
        {"name": "Data Engineering", "level": 78},
    ]
}

EXPERIENCES = [
    {
        "company": "TechCore Labs",
        "role": "Senior Software Engineer",
        "period": "2022 — Presente",
        "description": "Liderança técnica de squad de 6 devs. Arquitetura de microsserviços em AWS. Redução de 40% no tempo de deployment via CI/CD.",
        "type": "fulltime"
    },
    {
        "company": "StartupBridge",
        "role": "Full Stack Developer",
        "period": "2020 — 2022",
        "description": "Desenvolvimento do produto do zero. Stack Python/React. Escalonamento de 1K para 200K usuários em 18 meses.",
        "type": "fulltime"
    },
    {
        "company": "Freelance & Consultoria",
        "role": "Software Consultant",
        "period": "2018 — 2020",
        "description": "Mais de 30 projetos entregues para clientes no Brasil, EUA e Europa. Especialização em automação e APIs REST.",
        "type": "freelance"
    }
]

messages_store = []

# ─── Routes ─────────────────────────────────────────────────────────────────

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Return all projects, optionally filtered by category"""
    category = request.args.get('category', '').strip()
    featured = request.args.get('featured', '').lower()

    projects = PROJECTS
    if category and category != 'all':
        projects = [p for p in projects if p['category'].lower() == category.lower()]
    if featured == 'true':
        projects = [p for p in projects if p['featured']]

    return jsonify({
        "success": True,
        "count": len(projects),
        "projects": projects
    })

@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Return a single project by ID"""
    project = next((p for p in PROJECTS if p['id'] == project_id), None)
    if not project:
        return jsonify({"success": False, "error": "Project not found"}), 404
    return jsonify({"success": True, "project": project})

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Return all skills grouped by category"""
    return jsonify({
        "success": True,
        "skills": SKILLS
    })

@app.route('/api/experience', methods=['GET'])
def get_experience():
    """Return professional experience"""
    return jsonify({
        "success": True,
        "experience": EXPERIENCES
    })

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "Invalid JSON"}), 400

        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        # Validations
        if not all([name, email, message]):
            return jsonify({"success": False, "error": "Nome, email e mensagem são obrigatórios"}), 400

        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
            return jsonify({"success": False, "error": "Email inválido"}), 400

        if len(message) < 10:
            return jsonify({"success": False, "error": "Mensagem muito curta (mínimo 10 caracteres)"}), 400

        # Store message
        msg_entry = {
            "id": len(messages_store) + 1,
            "name": name,
            "email": email,
            "subject": subject or "Contato via Portfolio",
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "read": False
        }
        messages_store.append(msg_entry)

        return jsonify({
            "success": True,
            "message": f"Mensagem recebida! Entrarei em contato em breve, {name}. 🚀"
        })

    except Exception as e:
        return jsonify({"success": False, "error": "Erro interno do servidor"}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Return portfolio stats"""
    return jsonify({
        "success": True,
        "stats": {
            "projects": len(PROJECTS),
            "years_experience": 7,
            "clients": 47,
            "github_stars": sum(p['metrics']['stars'] for p in PROJECTS),
            "messages_received": len(messages_store)
        }
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})

# ─── Error Handlers ─────────────────────────────────────────────────────────

@app.errorhandler(404)
def not_found(e):
    return jsonify({"success": False, "error": "Endpoint não encontrado"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"success": False, "error": "Erro interno do servidor"}), 500

if __name__ == '__main__':
    print("🚀 Portfolio Backend running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)

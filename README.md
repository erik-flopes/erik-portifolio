# 🚀 Dev Portfolio — Fullstack Engineer

Landing page profissional com design estilo iOS, backend Python/Flask e todas as interfaces funcionais.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Python 3.11 + Flask |
| Frontend | HTML5 + CSS3 + Vanilla JS |
| Deploy | Gunicorn + Nginx (produção) |

## 📁 Estrutura do Projeto

```
Erik_Portifólios/
├── app.py                      # Backend Flask (API REST)
├── requirements.txt            # Dependências Python
├── README.md                   # Este arquivo
│
├── templates/
│   └── index.html             # HTML principal (template Jinja2)
│
└── static/
    ├── css/
    │   └── style.css          # Todos os estilos CSS
    └── js/
        └── script.js          # JavaScript e lógica de interação
```

## ✨ Características

- **Frontend Modular**: CSS e JavaScript separados em arquivos estáticos
- **API RESTful**: Backend Flask com endpoints para dados dinâmicos
- **Design Responsivo**: Interface iOS-inspired, otimizada para mobile
- **Animações Suaves**: Transições e efeitos de entrada elegantes
- **Mock API**: Funciona sem backend (dados no JS para desenvolvimento)

## 🚀 Como Executar

### Pré-requisitos
- Python 3.8+
- pip (gerenciador de pacotes Python)

### Instalação

1. **Abra o projeto**
```bash
cd Erik_Portifólios
```

2. **Instale as dependências**
```bash
pip install -r requirements.txt
```

3. **Execute o servidor**
```bash
python app.py
```

4. **Acesse no navegador**
```
http://localhost:5000
```

## 📚 Organização de Arquivos

### `app.py` - Backend Flask
- Rota principal `/` - Serve o `index.html`
- `/api/stats` - Estatísticas (projetos, experiência, etc)
- `/api/projects` - Lista de projetos (com filtro por categoria)
- `/api/skills` - Habilidades técnicas agrupadas
- `/api/experience` - Experiência profissional
- `/api/contact` - Recebe mensagens de contato

### `templates/index.html` - Frontend HTML
- Estrutura semântica e acessível
- Referencia CSS e JavaScript via `url_for()` do Flask
- Seções: Hero, Projetos, Skills, Experiência, Contato

### `static/css/style.css` - Estilos
- Design tokens (cores, tipografia, espaçamento)
- Componentes: Nav, Hero, Cards, Formulários
- Animações e transições
- Media queries para responsividade

### `static/js/script.js` - Lógica Frontend
- Mock API para desenvolvimento
- Carregamento dinâmico de dados via fetch
- Filtros de projetos interativos
- Validação de formulário de contato
- Animações de scroll (Intersection Observer)
- Toast notifications

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/projects` | Lista todos os projetos |
| GET | `/api/projects?category=Backend` | Filtra por categoria |
| GET | `/api/projects/:id` | Projeto por ID |
| GET | `/api/skills` | Habilidades técnicas |
| GET | `/api/experience` | Experiência profissional |
| GET | `/api/stats` | Estatísticas do portfolio |
| POST | `/api/contact` | Enviar mensagem de contato |
| GET | `/api/health` | Health check |

## 🔄 Fluxo de Dados

```
┌─────────────────┐
│   index.html    │  ← Carrega via GET /
├─────────────────┤
│  style.css      │  ← Referenciado no HEAD
│  script.js      │  ← Carregado no final do BODY
└─────────────────┘
         ↓
   ┌──────────────┐
   │    Fetch     │
   │   API calls  │
   └──────────────┘
         ↓
┌──────────────────────────────┐
│  Flask Backend (app.py)      │
├──────────────────────────────┤
│  /api/projects               │
│  /api/skills                 │
│  /api/experience             │
│  /api/stats                  │
│  /api/contact                │
└──────────────────────────────┘
```

## 🛠️ Desenvolvimento

### Editar Estilos
Modifique `static/css/style.css`. As mudanças aparecem ao atualizar o navegador (F5).

### Editar Conteúdo HTML
Modifique `templates/index.html`. Aqui você define a estrutura da página.

### Editar Lógica JavaScript
Modifique `static/js/script.js`. As funções `loadProjects()`, `loadSkills()`, etc. fazem fetch dos dados da API.

### Adicionar Novos Dados
Edite as listas em `app.py`:
- `PROJECTS` - Projetos a exibir
- `SKILLS` - Habilidades técnicas
- `EXPERIENCES` - Histórico profissional

## 📦 Dependências

- **Flask** >= 3.0.0 - Framework web Python

## 📝 Licença

Projeto pessoal - Erik Ferreira © 2026

## Deploy em produção

```bash
# Com Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Com Docker
docker build -t portfolio .
docker run -p 5000:5000 portfolio
```

## Personalização

Edite os dados em `app.py`:
- `PROJECTS` — Seus projetos
- `SKILLS` — Suas habilidades e nível
- `EXPERIENCES` — Sua trajetória profissional

Edite o `templates/index.html` para:
- Mudar nome, bio e avatar
- Ajustar cores (variáveis CSS no `:root`)
- Adicionar/remover seções

## Configurar Email (Contato)

Para receber emails reais das mensagens do formulário, adicione no `app.py`:

```python
# Configuração SMTP
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "seu@email.com"
SMTP_PASS = "sua-senha-de-app"
```

---
Desenvolvido com Python 🐍 + muito ☕




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

const express = require("express");

const server = express();

server.use(express.json());

let requests = 0;

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found!" });
  }

  return next();
}

function logResquest(req, res, next) {
  requests++;

  console.log(`Number of requests: ${requests}`);
  return next();
}

// "NOVIDADE"

server.use(logResquest);

/* PROJECTS */

// GET /projects: Rota que lista todos projetos e suas tarefas;

server.get("/projects", (req, res) => {
  return res.json(projects);
});

// POST /projects: A rota deve receber id e title dentro corpo de cadastrar um
// novo projeto dentro de um array no seguinte
// formato: { id: "1", title: 'Novo projeto', tasks: [] };
// Certifique-se de enviar tanto o ID quanto o título do projeto
// no formato string com àspas duplas.

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const projetc = {
    id,
    title,
    tasks: []
  };

  projects.push(projetc);

  return res.json(projetc);
});

// PUT /projects/:id: A rota deve alterar apenas o título do projeto
// com o id presente nos parâmetros da rota;

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETE /projects/:id: A rota deve deletar o projeto com o id presente
// nos parâmetros da rota;

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.slice(projectIndex, 1);

  return res.send();
});

// POST /projects/:id/tasks: A rota deve receber um campo title
// e armazenar uma nova tarefa no array de tarefas de um projeto
// específico escolhido através do id presente nos parâmetros da rota;

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3333);

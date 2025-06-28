const { Router } = require("express");
const routes = Router();
const PacienteController = require("./controllers/PacienteController");
const ProfissionalController = require("./controllers/ProfissionalController");
const EspecialidadeController = require("./controllers/EspecialidadeController");
const AtendimentoController = require("./controllers/AtendimentoController");

// --------- PACIENTES ----------
routes.get("/pacientes", PacienteController.index);
routes.get("/pacientes/cpf/:cpf", PacienteController.showByCpf);
routes.get("/pacientes/:id", PacienteController.show);
routes.post("/pacientes", PacienteController.store);
routes.put("/pacientes/cpf/:cpf", PacienteController.updateByCpf);
routes.put("/pacientes/:id", PacienteController.update);
routes.delete("/pacientes/cpf/:cpf", PacienteController.destroyByCPF);
routes.delete("/pacientes/:id", PacienteController.destroy);

// --------- PROFISSIONAIS ----------


// --------- ESPECIALIDADES ----------


// --------- ATENDIMENTOS ----------
routes.get("/atendimentos", AtendimentoController.index);
routes.get("/atendimentos/:id", AtendimentoController.show);
routes.post("/atendimentos", AtendimentoController.store);
routes.put("/atendimentos/:id", AtendimentoController.update);
routes.delete("/atendimentos/:id", AtendimentoController.destroy);

module.exports = routes;
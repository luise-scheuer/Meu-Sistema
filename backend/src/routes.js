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
routes.get("/profissionais", ProfissionalController.index);
routes.get('/profissionais/nome/:nome', ProfissionalController.showByNome);
routes.get("/profissionais/:id", ProfissionalController.show);
routes.post("/profissionais", ProfissionalController.store);
routes.put("/profissionais/:id", ProfissionalController.update);
routes.delete("/profissionais/:id", ProfissionalController.destroy);
routes.get('/profissionais/especialidade/:idEspecialidade', ProfissionalController.listarPorEspecialidade);


// --------- ESPECIALIDADES ----------
routes.get("/especialidades", EspecialidadeController.index);
routes.get("/especialidades/nome/:nome", EspecialidadeController.showByNome);
routes.get("/especialidades/:id", EspecialidadeController.show);
routes.post("/especialidades", EspecialidadeController.store);
routes.put("/especialidades/:id", EspecialidadeController.update);
routes.delete("/especialidades/:id", EspecialidadeController.destroy);

// --------- ATENDIMENTOS ----------
routes.get("/atendimentos", AtendimentoController.index);
routes.get("/atendimentos/:id", AtendimentoController.show);
routes.post("/atendimentos", AtendimentoController.store);
routes.put("/atendimentos/:id", AtendimentoController.update);
routes.delete("/atendimentos/:id", AtendimentoController.destroy);

module.exports = routes;
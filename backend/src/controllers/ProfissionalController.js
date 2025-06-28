const mongoose = require('mongoose');
const ProfissionalRepository = require("../repositories/ProfissonalRepository");

class ProfissionalController {
    //Busca todos
    async index(req, res) {
        const profissional = await PacienteRepository.findAll();

        if (!profissional) {
            return res.status(404).json({ error: "Pacientes não encontrados!" });
        }
        res.json(profissional);
    }

    //Busca específico por ID -> criado por padrão, não será implementado no front-end
    async show(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {//valida para não entrar na rota errada
            return res.status(400).json({ error: "ID Invalido" });
        }

        const profissional = await ProfissionalRepository.findById(id);
        if (!profissional) {
            return res.status(404).json({ message: "Paciente com esse ID não encontrado" });
        }
        res.json(profissional);
    }
    //Busca específico por CRM -> será implementado no front-end

    async showByCrm(req, res) {
        const { crm } = req.params;
        const profissional = await ProfissionalRepository.findByCrm(crm);

        if (!profissional) {
            return res.status(404).json({ message: "Profissional com esse CRM não encontrado" });
        }

        res.json(profissional);
    }

    //Criar um cadastro
    async store(req, res) {
        const { nome, crm, especialidade } = req.body;

        if (!nome) {
            return response.status(400).json({ error: "Nome é obrigatório" });
        }
        if (!crm) {
            return response.status(400).json({ error: "CRM é obrigatório" });
        }

        if (!especialidade) {
            return response.status(400).json({ error: "Especialidade é obrigatório" })
        }

        if (crm) {
            const profissionalCrm = await ProfissionalRepository.findByCrm(crm);

            if (profissionalCrm) {
                return response.status(400).json({ error: "Esse CRM já está cadastrado" });
            }
        }

        const profissional = await ProfissionalRepository.create({
            nome, crm, especialidade
        })
        res.status(201).json(profissional);
    }
    //Atualizar por ID -> criado por padrão, não será implementado no front-end
    async update(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID Inválido" });
        }
        const { nome, crm, especialidade } = req.body;
        const profissional = await ProfissionalRepository.findById(id);
        if (!profissional) {
            return res.status(404).json({ error: "Paciente não encontrado!!!" });
        }
        if (crm) {
            const profissionalCrm = await ProfissionalRepository.findByCrm(crm);
            if (profissionalCrm) {
                return res.status(400).json({ error: "Esse CRM já está cadastrado em outro Profissional" });
            }
        }
        const profissionalAtualizado = await ProfissionalRepository.update(id, {
            nome: nome ?? profissional.nome,
            crm: crm ?? profissional.crm,
            especialidade: especialidade ?? profissional.especialidade
        });

        res.status(200).json(profissionalAtualizado);
    }

    // Deletar por ID -> criado por padrão, não será implementado no front-end
    async destroy(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        if (!id) {
            return res.status(400).json({ error: "ID de Paciente Inválido" });

        }
        await ProfissionalRepository.delete(id);
        res.sendStatus(204);
    }
}

module.exports = new ProfissionalController();
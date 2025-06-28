const mongoose = require('mongoose');
const EspecialidadeRepository = require("../repositories/EspecialidadeRepository");

class EspecialidadeController {
    //Busca todos
    async index(req, res) {
        const especialidades = await EspecialidadeRepository.findAll();

        if (!especialidades) {
            return res.status(400).json({ error: "Especialidades não encontradas!!!" });
        }
        res.json(especialidades);
    }
    
    //Busca por ID
    async show(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID Inválido!!!" })
        }

        const especialidade = await EspecialidadeRepository.findById(id);
        if (!especialidade) {
            return res.status(404).json({ message: "Especialidade com esse ID não encontrada!!!" });
        }

        res.json(especialidade);
    }

    //Criar um cadastro
    async store(req, res) {
        const { area } = req.body;
        if (!area) {
            return res.status(400).json({ error: "Preencha o campo!!!" });
        }
        const especialidade = await EspecialidadeRepository.create({
            area
        })
        res.status(201).json(especialidade);
    }

    //Atualizar por ID
    async update(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        const { area } = req.body;
        const especialidade = await EspecialidadeRepository.findById(id);
        if (!especialidade) {
            return res.status(404).json({ error: "Especialidade não encontrada!!!" })
        }

        if (area) {
            const especialidadeArea = await EspecialidadeRepository.findByCpf(area);

            if (especialidadeArea) {
                return res.status(400).json({ error: "Essa AREA já está cadastrada!!!" });
            }
        }
    }
    
    // Deletar por ID
    async destroy(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        if (!id) {
            return res.status(400).json({ error: "ID de Paciente inválido!!!" });
        }

        await EspecialidadeRepository.delete(id);
        res.sendStatus(204);
    }
}

module.exports = new EspecialidadeController();
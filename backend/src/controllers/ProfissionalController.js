const mongoose = require('mongoose');
const ProfissionalRepository = require("../repositories/ProfissionalRepository");

class ProfissionalController {
    //Busca todos
    async index(req, res) {
        const profissional = await ProfissionalRepository.findAll();

        if (!profissional) {
            return res.status(404).json({ error: "Profissionais não encontrados!" });
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
            return res.status(404).json({ message: "Profissional com esse ID não encontrado" });
        }
        res.json(profissional);
    }

    // Buscar por nome parcial (primeiro nome, parte do nome etc.)
    async showByNome(req, res) {
        const { nome } = req.params;

        if (!nome || nome.trim() === "") {
            return res.status(400).json({ error: "Nome para busca é obrigatório" });
        }

        try {
            // Expressão regular que ignora maiúsculas/minúsculas e busca no começo ou meio
            const regex = new RegExp(`^${nome}`, 'i'); // começa com o nome digitado
            const profissionais = await ProfissionalRepository.findByNome(regex);

            if (profissionais.length === 0) {
                return res.status(404).json({ error: "Nenhum profissional encontrado com esse nome" });
            }

            res.json(profissionais);
        } catch (err) {
            console.error("Erro ao buscar profissional por nome:", err);
            res.status(500).json({ error: "Erro interno no servidor" });
        }
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



    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, crm, especialidade } = req.body;

            console.log('UPDATE PROFISSIONAL:');
            console.log('ID:', id);
            console.log('Dados recebidos:', req.body);

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID inválido!!!" });
            }

            const profissional = await ProfissionalRepository.findById(id);
            if (!profissional) {
                return res.status(404).json({ error: "Profissional não encontrado!!!" });
            }


            if (crm) {
                const profissionalCrm = await ProfissionalRepository.findByCrm(crm);
                console.log('Profissional com mesmo CRM encontrado:', profissionalCrm ? profissionalCrm._id.toString() : null);

                if (profissionalCrm && profissionalCrm._id.toString() !== id) {
                    return res.status(400).json({ error: "Esse CRM já está cadastrado em outro profissional!!!" });
                }
            }

            const profissionalAtualizado = await ProfissionalRepository.update(id, {
                nome: nome ?? profissional.nome,
                crm: crm ?? profissional.crm,
                especialidade: especialidade ?? profissional.especialidade
            });

            res.status(200).json(profissionalAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar profissional:', error);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    }


    // Deletar por ID -> criado por padrão, não será implementado no front-end
    async destroy(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        if (!id) {
            return res.status(400).json({ error: "ID de Profissional Inválido" });

        }
        await ProfissionalRepository.delete(id);
        res.sendStatus(204);
    }

    async listarPorEspecialidade(req, res) {
        try {
            const idEspecialidade = req.params.idEspecialidade;
            const profissionais = await ProfissionalRepository.findByEspecialidade(idEspecialidade);
            return res.json(profissionais);
        } catch (error) {
            console.error('Erro ao buscar profissionais por especialidade:', error);
            return res.status(500).json({ error: 'Erro ao buscar profissionais.' });
        }
    }


}

module.exports = new ProfissionalController();
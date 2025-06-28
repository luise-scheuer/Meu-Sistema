const mongoose = require('mongoose');
const AtendimentoRepository = require("../repositories/AtendimentoRepository");

class AtendimentoController {
    async index(req, res) {
        const atendimentos = await AtendimentoRepository.findAll();

        if (!atendimentos) {
            return res.status(404).json({ error: "Atendimentos não encontrados!!!" });
        }

        res.json(atendimentos);
    }

    async show(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) { //valida para não entrar na rota errada
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        const atendimento = await AtendimentoRepository.findById(id);
        if (!atendimento) {
            return res.status(404).json({ message: "Atendimento com esse ID não encontrado!!!" });
        }

        res.json(atendimento);
    }

    async store(req, res) {
        const { paciente, profissional, especialidade, dataAtendimento, horaAtendimento } = req.body;

        if (!paciente || !profissional || !especialidade || !dataAtendimento || !horaAtendimento) {
            return res.status(400).json({ error: "Preencha todos os campos!!!" });
        }

        //fazer validação de conflito de horários

        const atendimento = await AtendimentoRepository.create({
            paciente, profissional, especialidade, dataAtendimento, horaAtendimento
        });

        res.status(201).json(atendimento);
    }

    async update(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        const { paciente, profissional, especialidade, dataAtendimento, horaAtendimento } = req.body;
        const atendimento = await AtendimentoRepository.findById(id);
        if (!atendimento) {
            return res.status(404).json({ error: "Atendimento não encontrado!!!" })
        }

        //fazer validações necessárias
        const atendimentoAtualizado = await AtendimentoRepository.update({
            paciente: paciente ?? atendimento.paciente,
            profissional: profissional ?? atendimento.profissional,
            especialidade: especialidade ?? atendimento.especialidade,
            dataAtendimento: dataAtendimento ?? atendimento.dataAtendimento,
            horaAtendimento: horaAtendimento ?? atendimento.horaAtendimento
        });

        res.status(200).json(atendimentoAtualizado);
    }

    async destroy(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        if (!id) {
            return res.status(400).json({ error: "ID de Atendimento inválido!!!" });
        }

        await AtendimentoRepository.delete(id);
        res.sendStatus(204);
    }
}

module.exports = new AtendimentoController();
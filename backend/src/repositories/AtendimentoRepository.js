const Atendimento = require('../models/Atendimento');

class AtendimentoRepository {
    
    async findAll() {
        const atendimento = await Atendimento.find();
        return atendimento;
    }

    async findById(id) {
        const atendimento = await Atendimento.findById(id);
        return atendimento;
    }

    async create({ paciente, profissional, especialidade, dataAtendimento, horaAtendimento }) {
        const novoAtendimento = new Atendimento({
            paciente, profissional, especialidade, dataAtendimento, horaAtendimento
        });
        
        await novoAtendimento.save();
        return novoAtendimento;
    }

    async update(id, { paciente, profissional, especialidade, dataAtendimento, horaAtendimento }) {
        const atendimentoAtualizado = await Atendimento.findByIdAndUpdate(
            id,
            { paciente, profissional, especialidade, dataAtendimento, horaAtendimento },
            { new: true }
        );
        return atendimentoAtualizado;
    }

    async delete(id) {
        const atendimento = await Atendimento.findByIdAndDelete(id);
        return atendimento;
    }
}

module.exports = new AtendimentoRepository();
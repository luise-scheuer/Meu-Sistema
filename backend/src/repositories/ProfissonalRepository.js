const Profissional = require('../models/Profissional');

class ProfissionalRepository {

    async findAll() {
        const profissional = await Profissional.find();
        return profissional;
    }

    async findById(id) {
        const profissional = await Profissional.findById(id);
        return profissional;
    }

    async create({ nome, crm, especialidade }) {
        const profissional = new Profissional({
            nome, crm, especialidade
        });
        await profissional.save();
        return profissional;

    }

    async update(id, { nome, crm, especialidade }) {
        const profissionalAtualizado = await Profissional.findByIdAndUpdate(
            id,
            { nome, crm, especialidade },
            { new: true }
        );
        return profissionalAtualizado;
    }

    async delete(id) {
        const resultado = await Profissional.findByIdAndDelete(id);
        return resultado;
    }
}

module.exports = new ProfissionalRepository();
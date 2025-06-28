const Especialidade = require('../models/Especialidade');

class EspecialidadeRepository {

    async findAll() {
        const especialidade = await Especialidade.find();
        return especialidade;
    }

    async findById(id) {
        const especialidade = await Especialidade.findById(id);
        return especialidade;
    }

    async create({ area }) {
        const novaEspecialidade = new Especialidade({ area });
        await novaEspecialidade.save();
        return novaEspecialidade;
    }

    async update(id, area) {
        const especialidadeAtualizada = await Especialidade.findByIdAndUpdate(
            id, { area }, { new: true }
        )
        return especialidadeAtualizada;
    }

    async delete(id) {
        const especialidade = await Especialidade.findByIdAndDelete(id);
        return especialidade;
    }
}

module.exports = new EspecialidadeRepository();
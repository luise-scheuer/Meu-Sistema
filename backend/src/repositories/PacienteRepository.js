const Paciente = require('../models/Paciente');

class PacienteRepository {
    
    async findAll() {
        const pacientes = await Paciente.find();
        return pacientes;
    }

    async findById(id) {
        const paciente = await Paciente.findById(id);
        return paciente;
    }

    async findByCpf(cpf) {
        const paciente = await Paciente.findOne({ cpf });
        return paciente;
    }

    async create({ nome, cpf, dataNascimento, endereco, telefone }) {
        const paciente = new Paciente({
            nome, cpf, dataNascimento, endereco, telefone
        });

        await paciente.save();
        return paciente;
    }

    async update(id, { nome, cpf, dataNascimento, endereco, telefone }) {
        const pacienteAtualizado = await Paciente.findByIdAndUpdate(
            id,
            { nome, cpf, dataNascimento, endereco, telefone },
            { new: true }  // Retorna o paciente já atualizado
        );
        return pacienteAtualizado;
    }

    async delete(id) {
        const resultado = await Paciente.findByIdAndDelete(id);
        return resultado;
    }

    async deleteByCpf(cpf){
        const paciente = await Paciente.findOne({ cpf });
        const resultado = await Paciente.findByIdAndDelete(paciente._id);
        
        return resultado;
    }
}

module.exports = new PacienteRepository();
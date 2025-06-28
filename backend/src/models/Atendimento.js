const mongoose = require('mongoose');

const atendimentoSchema = new mongoose.Schema(
    {
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Paciente'
        },
        profissional: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profissional'
        },
        especialidade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Especialidade'
        },
        dataAtendimento: Date,
        horaAtendimento: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Atendimento', atendimentoSchema);
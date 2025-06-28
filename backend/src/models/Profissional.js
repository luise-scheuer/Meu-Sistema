const mongoose = require('mongoose');

const profissionalSchema = new mongoose.Schema(
    {
        nome: String,
        crm: String,
        especialidade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Especialidade'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Profissional', profissionalSchema);
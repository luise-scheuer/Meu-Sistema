const mongoose = require('mongoose');

const especialidadeSchema = new mongoose.Schema(
    {
        area: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Especialidade', especialidadeSchema);
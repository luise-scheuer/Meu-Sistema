const mongoose = require('mongoose');
const PacienteRepository = require("../repositories/PacienteRepository");

class PacienteController {
    //Busca todos
    async index(req, res) {
        const pacientes = await PacienteRepository.findAll();

        if (!pacientes) {
            return res.status(404).json({ error: "Pacientes não encontrados!!!" });
        }

        res.json(pacientes);
    }

    //Busca específico por ID -> criado por padrão, não será implementado no front-end
    async show(req, res) {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){ //valida para não entrar na rota errada
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        const paciente = await PacienteRepository.findById(id);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente com esse ID não encontrado!!!" });
        }

        res.json(paciente);
    }

    //Busca específico por CPF -> será implementado no front-end
    async showByCpf(req, res) {
        const { cpf } = req.params;
        const paciente = await PacienteRepository.findByCpf(cpf);

        if (!paciente) {
            return res.status(404).json({ message: "Paciente com esse CPF não encontrado!!!" });
        }

        res.json(paciente);
    }

    //Criar um cadastro
    async store(req, res) {
        const { nome, cpf, dataNascimento, endereco, telefone } = req.body;

        if(!nome || !cpf || !dataNascimento || !endereco || !telefone){
            return res.status(400).json({ error: "Preencha todos os campos!!!" });
        }

        if(cpf) {
            const pacienteCpf = await PacienteRepository.findByCpf(cpf);

            if(pacienteCpf) {
                return res.status(400).json({ error: "Esse CPF já está cadastrado!!!" });
            }
        }

        const paciente = await PacienteRepository.create({
            nome, cpf, dataNascimento, endereco, telefone
        });

        res.status(201).json(paciente);
    }

    //Atualizar por ID -> criado por padrão, não será implementado no front-end
    async update(req, res) {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        const { nome, cpf, dataNascimento, endereco, telefone } = req.body;
        const paciente = await PacienteRepository.findById(id);
        if(!paciente) {
            return res.status(404).json({ error: "Paciente não encontrado!!!"})
        }

        if(cpf) {
            const pacienteCpf = await PacienteRepository.findByCpf(cpf);

            if(pacienteCpf) {
                return res.status(400).json({ error: "Esse CPF já está cadastrado em outro paciente!!!" });
            }
        }

        const pacienteAtualizado = await PacienteRepository.update(id, {
            nome: nome ?? paciente.nome,
            cpf: cpf ?? paciente.cpf,
            dataNascimento: dataNascimento ?? paciente.dataNascimento,
            endereco: endereco ?? paciente.endereco,
            telefone: telefone ?? paciente.telefone
        });

        res.status(200).json(pacienteAtualizado);
    }
    
    //Atualizar por CPF -> será implementado no front-end
    async updateByCpf(req, res) {
        const { cpf } = req.params;
        const { nome, novoCpf, dataNascimento, endereco, telefone } = req.body;

        const paciente = await PacienteRepository.findByCpf(cpf);
        if(!paciente) {
            return res.status(404).json({ error: "Paciente não encontrado!!!"})
        }

        if(novoCpf && novoCpf !== paciente.cpf) {
            const pacienteCpf = await PacienteRepository.findByCpf(novoCpf);

            if(pacienteCpf) {
                return res.status(400).json({ error: "Esse CPF já está cadastrado em outro paciente!!!" });
            }
        }

        const pacienteAtualizado = await PacienteRepository.update(paciente._id, {
            nome: nome ?? paciente.nome,
            cpf: novoCpf ?? paciente.cpf,
            dataNascimento: dataNascimento ?? paciente.dataNascimento,
            endereco: endereco ?? paciente.endereco,
            telefone: telefone ?? paciente.telefone
        });

        res.status(200).json(pacienteAtualizado);
    }
    
    // Deletar por ID -> criado por padrão, não será implementado no front-end
    async destroy(req, res) {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: "ID inválido!!!" });
        }

        if(!id){
            return res.status(400).json({ error: "ID de Paciente inválido!!!"});
        }

        await PacienteRepository.delete(id);
        res.sendStatus(204);
    }
    
    // Deletar por CPF -> será implementado no front-end
    async destroyByCPF(req, res) {
        const { cpf } = req.params;

        if(!cpf){
            return res.status(400).json({ error: "CPF de Paciente inválido!!!"});
        }

        const paciente = await PacienteRepository.findByCpf(cpf)
        if(!paciente){
            return res.status(404).json({ error: "Paciente não encontrado!!!" });
        }

        await PacienteRepository.deleteByCpf(cpf);
        res.sendStatus(204);
    }
}

module.exports = new PacienteController();
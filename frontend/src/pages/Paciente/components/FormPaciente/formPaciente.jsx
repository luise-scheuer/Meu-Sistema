import { useState } from "react";

import "../../paciente.css";

export default function FormPaciente({onSubmit}) {

    const [pacienteNome, setPacienteNome] = useState("");
    const [pacienteCPF, setPacienteCPF] = useState("");
    const [pacienteNascimento, setPacienteNascimento] = useState("");
    const [pacienteEndereco, setPacienteEndereco] = useState("");
    const [pacienteTelefone, setPacienteTelefone] = useState("");
    const isFormValid = pacienteNome.trim() && pacienteCPF.trim() && pacienteNascimento.trim();

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            nome: pacienteNome,
            cpf: pacienteCPF,
            dataNascimento: Date(pacienteNascimento),
            endereco: pacienteEndereco,
            telefone: pacienteTelefone
        });

        //Limpar os campos após o envio do formulário
        setPacienteNome("");
        setPacienteCPF("");
        setPacienteNascimento("");
        setPacienteEndereco("");
        setPacienteTelefone("");
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="informacoes">
                    <label htmlFor="paciente-nome"> Nome do Paciente: </label>
                    <input type="text" name="paciente-nome" id="paciente-nome"
                           value={pacienteNome} onChange={(e) => {setPacienteNome(e.target.value)}}
                    />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-cpf"> CPF: </label>
                    <input type="text" name="paciente-cpf" id="paciente-cpf" 
                           value={pacienteCPF} onChange={(e) => {setPacienteCPF(e.target.value)}}
                    />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-nascimento"> Data de Nascimento: </label>
                    <input type="date" name="paciente-nascimento" id="paciente-nascimento" 
                           value={pacienteNascimento} onChange={(e) => {setPacienteNascimento(e.target.value)}}

                    />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-endereco"> Endereço: </label>
                    <input type="text" name="paciente-endereco" id="paciente-endereco"
                           value={pacienteEndereco} onChange={(e) => {setPacienteEndereco(e.target.value)}}
                    />
                </div>

                <div className="informacoes">
                    <label htmlFor="paciente-telefone"> Telefone: </label>
                    <input type="text" name="paciente-telefone" id="paciente-telefone"
                           value={pacienteTelefone} onChange={(e) => {setPacienteTelefone(e.target.value)}}
                    />
                </div>

                <button id="enviar" type="submit" disabled={!isFormValid}>Enviar</button>

            </form>
        </div>
    );
}
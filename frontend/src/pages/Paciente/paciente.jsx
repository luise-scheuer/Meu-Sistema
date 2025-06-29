import { useState, useEffect } from "react";
import api from "../../services/api";

import FormPaciente from "./components/FormPaciente/formPaciente";
import ItemPaciente from "./components/ItemPaciente/itemPaciente";
import BuscaCPF from "./components/BuscaCPF/buscaCpf";
import EditarPaciente from "./components/EditarPaciente/editarPaciente";

import "./paciente.css";

export default function Paciente() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [listaPacientes, setListaPacientes] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const [pacienteEditando, setPacienteEditando] = useState(null);

    async function fetchPacientes() {
        try {
            const response = await api.get("/pacientes");
            setListaPacientes(response.data);
        } catch (error) {
            console.log("Erro ao buscar pacientes: ", error);
        }
    }

    useEffect(() => {
        fetchPacientes();
    }, [pacientes]);

    async function handleAddPaciente(data) {
        try {
            const response = await api.post("/pacientes", data);
            setPacientes([...pacientes, response.data]);
        } catch (error) {
            console.log("Erro ao adicionar paciente: ", error);
        }
    }

    async function buscarPacientePorCPF(cpf) {
        try {
            const response = await api.get(`/pacientes/cpf/${cpf}`);
            const resultado = Array.isArray(response.data) ? response.data : [response.data];
            setListaPacientes(resultado);
        } catch (error) {
            console.log("Erro ao buscar CPF:", error);
            setListaPacientes([]);
        }
    }

    function limparBusca() {
        fetchPacientes();
    }

    function handleEditarPaciente(paciente) {
        setPacienteEditando(paciente);
    }

    function handleCancelarEdicao() {
        setPacienteEditando(null);
    }

    async function handleUpdatePaciente(data) {
        try {
            await api.put(`/pacientes/${data._id}`, data);
            setPacienteEditando(null);
            fetchPacientes(); // atualiza a tabela
        } catch (error) {
            console.log("Erro ao atualizar paciente:", error);
        }
    }


    return (
        <>
            <div className="container-paciente">
                <h1 className="titulo"> Paciente </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => { setOpcaoSelecionada("cadastrar"); setPacienteEditando(null); }}>Cadastrar</button>
                    <button className="opcoes" onClick={() => { setOpcaoSelecionada("buscar"); setPacienteEditando(null); }}>Buscar</button>
                </div>

                {pacienteEditando ? (
                    <EditarPaciente
                        paciente={pacienteEditando}
                        onSubmit={handleUpdatePaciente}
                        onCancel={handleCancelarEdicao}
                    />
                ) : (
                    <>
                        {opcaoSelecionada === "cadastrar" && <FormPaciente onSubmit={handleAddPaciente} />}
                        {opcaoSelecionada === "buscar" && (
                            <div className="container">
                                <div className="busca">
                                     <BuscaCPF onBuscar={buscarPacientePorCPF} onLimpar={limparBusca} />
                                </div>

                                <table className="tabela-pacientes">
                                    <thead>
                                        <tr>
                                            <th className="th-nome">NOME</th>
                                            <th className="th-cpf">CPF</th>
                                            <th className="th-opcoes">OPÇÕES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPacientes.length === 0 ? (
                                            <tr><th colSpan="3"> Nenhum paciente encontrado </th></tr>
                                        ) : (
                                            listaPacientes.map((paciente) => (
                                                <ItemPaciente key={paciente._id} paciente={paciente} onEdit={handleEditarPaciente} />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>

        </>
    )
}
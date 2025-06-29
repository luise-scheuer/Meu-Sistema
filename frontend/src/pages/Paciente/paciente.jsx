import { useState, useEffect } from "react";
import { MdManageSearch, MdCleaningServices } from "react-icons/md";
import api from "../../services/api";
import FormPaciente from "./components/FormPaciente/formPaciente";
import ItemPaciente from "./components/ItemPaciente/itemPaciente";
import "./paciente.css";

export default function Paciente() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [listaPacientes, setListaPacientes] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const [buscaCPF, setBuscaCPF] = useState("");


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

    async function handleBuscarCPF() {
        try {
            const response = await api.get(`/pacientes/cpf/${buscaCPF.trim()}`);
            const resultado = Array.isArray(response.data) ? response.data : [response.data];
            setListaPacientes(resultado);
        } catch (error) {
            console.log("Erro ao buscar CPf: ", error);
            setListaPacientes([]); //Limpa a tabela caso não encontre
        }
    }

    return (
        <>
            <div className="container-paciente">
                <h1 className="titulo"> Paciente </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("cadastrar")}>Cadastrar</button>
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("buscar")}>Buscar</button>
                </div>


                {opcaoSelecionada === "cadastrar" && <FormPaciente onSubmit={handleAddPaciente} />}
                {opcaoSelecionada === "buscar" && <div className="container">
                    <div className="busca">
                        <label htmlFor="busca-cpf"> CPF: </label>
                        <input type="text" name="busca-cpf" id="busca-cpf"
                            value={buscaCPF} onChange={(e) => { setBuscaCPF(e.target.value) }}
                            placeholder="Insira o CPF cadastrado a ser buscado"
                        />
                        <button className="botoes" onClick={handleBuscarCPF}>
                            <MdManageSearch id="icon-buscar" />
                        </button>
                        <button className="botoes" onClick={() => { setBuscaCPF(""); fetchPacientes() }}>
                            <MdCleaningServices id="icon-limpar" />
                        </button>
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
                                <tr>
                                    <th colSpan="3"> Nenhum paciente encontrado </th>
                                </tr>
                            ) :
                            (
                                listaPacientes.map((paciente) => (
                                    <ItemPaciente key={paciente.id} paciente={paciente} />
                                ))

                            )}

                        </tbody>
                    </table>
                </div>}
            </div>

        </>
    )
}
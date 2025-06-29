import { useState, useEffect } from "react";
import { MdManageSearch, MdCleaningServices } from "react-icons/md";
import api from "../../services/api";
import FormProfissional from "./components/FormProfissional/formProfissional";
import ItemProfissional from "./components/ItemProfissional/itemProfissional";
import "./profissional.css";

export default function Profissional() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [listaProfissional, setListaProfissional] = useState([]);
    const [profissional, setProfissional] = useState([]);

    const [buscaNome, setBuscaNome] = useState("");


    async function fetchProfissional() {
        try {
            const response = await api.get("/profissional");
            setListaProfissional(response.data);
        } catch (error) {
            console.log("Erro ao buscar profissional: ", error);
        }
    }

    useEffect(() => {
        fetchProfissional();
    }, [profissional]);

    async function handleAddProfissional(data) {
        try {
            const response = await api.post("/profissional", data);
            setProfissional([...profissional, response.data]);
        } catch (error) {
            console.log("Erro ao adicionar profissional: ", error);
        }
    }

    async function handleBuscarNome() {
        try {
            const response = await api.get(`/profissional/nome/${buscaNome.trim()}`);
            const resultado = Array.isArray(response.data) ? response.data : [response.data];
            setListaProfissional(resultado);
        } catch (error) {
            console.log("Erro ao buscar Nome: ", error);
            setListaProfissional([]); //Limpa a tabela caso não encontre
        }
    }

    return (
        <>
            <div className="container-profissional">
                <h1 className="titulo"> Profissional </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("cadastrar")}>Cadastrar</button>
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("buscar")}>Buscar</button>
                </div>


                {opcaoSelecionada === "cadastrar" && <FormProfissional onSubmit={handleAddProfissional} />}
                {opcaoSelecionada === "buscar" && <div className="container">
                    <div className="busca">
                        <label htmlFor="busca-nome"> NOME: </label>
                        <input type="text" name="busca-nome" id="busca-nome"
                            value={buscaNome} onChange={(e) => { setBuscaNome(e.target.value) }}
                            placeholder="Insira o nome cadastrado a ser buscado"
                        />
                        <button className="botoes" onClick={handleBuscarNome}>
                            <MdManageSearch id="icon-buscar" />
                        </button>
                        <button className="botoes" onClick={() => { setBuscaNome(""); fetchProfissional() }}>
                            <MdCleaningServices id="icon-limpar" />
                        </button>
                    </div>

                    <table className="tabela-profissional">
                        <thead>
                            <tr>
                                <th className="th-nome">NOME</th>
                                <th className="th-cpf">CRM</th>
                                <th className="th-opcoes">OPÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProfissional.length === 0 ? (
                                <tr>
                                    <th colSpan="3"> Nenhum Profissional encontrado </th>
                                </tr>
                            ) :
                                (
                                    listaProfissional.map((profissional) => (
                                        <ItemProfissional key={profissional.id} profissional={profissional} />
                                    ))

                                )}

                        </tbody>
                    </table>
                </div>}
            </div>

        </>
    )
}
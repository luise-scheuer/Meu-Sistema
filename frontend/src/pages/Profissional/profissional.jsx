import { useState, useEffect } from "react";
import api from "../../services/api";

import FormProfissional from "./components/FormProfissional/formProfissional";
import ItemProfissional from "./components/ItemProfissional/itemProfissional";
import EditarProfissional from "./components/EditarProfissional/editarProfissional";
import BuscarNome from "./components/BuscarNome/buscarNome";

import ConfirmarDelete from "../../components/ConfirmarDelete/confirmarDelete";
import SucessoModal from "../../components/SucessoModal/sucessoModal";

import "./profissional.css";
import "../index.css";

export default function Profissional() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [listaProfissional, setListaProfissional] = useState([]);
    const [profissionais, setProfissionais] = useState([]);

    const [profissionalEditando, setProfissionalEditando] = useState(null);

    //Modal
    //const [modalDeleteVisivel, setModalDeleteVisivel] = useState(false);
    const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState("");


    async function fetchProfissional() {
        try {
            const response = await api.get("/profissional");
            setListaProfissional(response.data);
        } catch (error) {
            console.log("Erro ao buscar profissionais: ", error);
        }
    }

    useEffect(() => {
        fetchProfissional();
    }, [profissionais]);

    async function handleAddProfissional(data) {
        try {
            const response = await api.post("/profissional", data);
            setProfissionais([...profissionais, response.data]);
            setMensagemSucesso("Profissional cadastrado com sucesso!");
            setModalSucessoVisivel(true);
        } catch (error) {
            console.log("Erro ao adicionar profissional: ", error);
        }
    }

    async function buscarProfissionalNome(nome) {
        try {
            const response = await api.get(`/profissional/nome/${nome.trim()}`);
            const resultado = Array.isArray(response.data) ? response.data : [response.data];
            setListaProfissional(resultado);
        } catch (error) {
            console.log("Erro ao buscar Nome: ", error);
            setListaProfissional([]); //Limpa a tabela caso não encontre
        }
    }

    function limparBusca() {
        fetchProfissional();
    }

    function handleEditarProfissional(profissional) {
        setProfissionalEditando(profissional);
    }

    function handleCancelarEdicao() {
        setProfissionalEditando(null);
    }

    async function handleUpdateProfissional(data) {
        try {
            await api.put(`/profissional/${data._id}`, data);
            setProfissionalEditando(null);
            fetchProfissional(); // atualiza a tabela
            setMensagemSucesso("Profissional atualizado com sucesso!");
            setModalSucessoVisivel(true);
        } catch (error) {
            console.log("Erro ao atualizar profissional:", error);
        }
    }

    return (
        <>
            <div className="container-principal">
                <h1 className="titulo"> Profissional </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("cadastrar")}>Cadastrar</button>
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("buscar")}>Buscar</button>
                </div>


                <SucessoModal
                    visible={modalSucessoVisivel}
                    message={mensagemSucesso}
                    onClose={() => setModalSucessoVisivel(false)}
                />

                {profissionalEditando ? (
                    <EditarProfissional
                        profissional={profissionalEditando}
                        onSubmit={handleUpdateProfissional}
                        onCancel={handleCancelarEdicao}
                    />

                ) : (
                    <>
                        {opcaoSelecionada === "cadastrar" && <FormProfissional onSubmit={handleAddProfissional} />}
                        {opcaoSelecionada === "buscar" && <div className="container">
                            <div className="busca">
                                <BuscarNome onBuscar={buscarProfissionalNome} onLimpar={limparBusca} />
                            </div>

                            <table className="tabela-todos">
                                <thead>
                                    <tr>
                                        <th className="th-nome">NOME</th>
                                        <th className="th-crm">CRM</th>
                                        <th className="th-area">ÁREA</th>
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
                                                <ItemProfissional key={profissional.id} profissional={profissional}
                                                    onEdit={handleEditarProfissional}
                                                />
                                            ))

                                        )}

                                </tbody>
                            </table>
                        </div>}
                    </>
                )
                }

            </div>

        </>
    )
}
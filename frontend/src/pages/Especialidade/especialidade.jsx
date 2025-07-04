import { useState, useEffect } from "react";
import api from "../../services/api";

import FormEspecialidade from "./components/FormEspecialidade/formEspecialidade";
import ItemEspecialidade from "./components/ItemEspecialidade/itemEspecialidade";
import EditarEspecialidade from "./components/EditarEspecialidade/editarEspecialidade";
import BuscarEspecialidade from "./components/BuscarEspecialidade/buscarEspecialidade";

import ConfirmarDelete from "../../components/ConfirmarDelete/confirmarDelete";
import SucessoModal from "../../components/SucessoModal/sucessoModal";

//import "./especialidade.css";
import "../index.css";


export default function Especialidade() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const [especialidadeEditando, setEspecialidadeEditando] = useState(null);

    const [modalDeleteVisivel, setModalDeleteVisivel] = useState(false);
    const [especialidadeParaDeletar, setEspecialidadeParaDeletar] = useState(null);

    const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    async function fecthEspecialidades() {
        try {
            const response = await api.get("especialidades");
            setListaEspecialidades(response.data);
        } catch (error) {
            console.log("Erro ao buscar especialidades: ", error);
        }
    }

    useEffect(() => {
        fecthEspecialidades();
    }, [especialidades]);

    async function handleAddEspecialidade(data) {
        try {
            const response = await api.post("/especialidades", data);
            setEspecialidades([...especialidades, response.data]);
            setMensagemSucesso("Especialidade cadastrada com sucesso!");
            setModalSucessoVisivel(true);
        } catch (error) {
            console.log("Erro ao adicionar especialidade: ", error);
        }
    }

    async function buscarEspecialidadeNome(nome) {
        try {
            const response = await api.get(`/especialidades/nome/${nome.trim()}`);
            const resultado = Array.isArray(response.data) ? response.data : [response.data];
            setListaEspecialidades(resultado);
        } catch (error) {
            console.log("Erro ao buscar especialidade por nome:", error);
            setListaEspecialidades([]);
        }
    }

    function limparBusca() {
        fecthEspecialidades();
    }

    function handleEditarEspecialidade(especialidade) {
        setEspecialidadeEditando(especialidade);
    }

    function handleCancelarEdicao() {
        setEspecialidadeEditando(null);
    }

    async function handleUpdateEspecialidade(data) {
        try {
            await api.put(`/especialidades/${data._id}`, data);
            setEspecialidadeEditando(null);
            fecthEspecialidades(); // atualiza a tabela
            setMensagemSucesso("Especialidade atualizada com sucesso!");
            setModalSucessoVisivel(true);
        } catch (error) {
            console.log("Erro ao atualizar especialidade:", error);
        }
    }

    // Função chamada ao clicar no ícone de deletar
    function abrirModalDeletar(especialidade) {
        setEspecialidadeParaDeletar(especialidade);
        setModalDeleteVisivel(true);
    }

    // Confirmar exclusão
    async function confirmarDeletar() {
        if (!especialidadeParaDeletar) return;

        try {
            await api.delete(`/especialidades/${especialidadeParaDeletar._id}`);
            setModalDeleteVisivel(false);
            setEspecialidadeParaDeletar(null);
            fecthEspecialidades();
        } catch (error) {
            console.log("Erro ao deletar especialidade:", error);
        }
    }

    // Cancelar exclusão
    function cancelarDeletar() {
        setModalDeleteVisivel(false);
        setEspecialidadeParaDeletar(null);
    }


    return (
        <>
            <div className="container-principal">
                <h1 className="titulo"> Especialidade </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("cadastrar")}>Cadastrar</button>
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("buscar")}>Buscar</button>
                </div>

                <ConfirmarDelete
                    visible={modalDeleteVisivel}
                    message={`Deseja realmente deletar a especialidade "${especialidadeParaDeletar?.area}"?`}
                    onConfirm={confirmarDeletar}
                    onCancel={cancelarDeletar}
                />

                <SucessoModal
                    visible={modalSucessoVisivel}
                    message={mensagemSucesso}
                    onClose={() => setModalSucessoVisivel(false)}
                />

                {especialidadeEditando ? (
                    <EditarEspecialidade
                        especialidade={especialidadeEditando}
                        onSubmit={handleUpdateEspecialidade}
                        onCancel={handleCancelarEdicao}
                    />

                ) : (
                    <>
                        {opcaoSelecionada === "cadastrar" && <FormEspecialidade onSubmit={handleAddEspecialidade} />}
                        {opcaoSelecionada === "buscar" && <div className="container">
                            <div className="busca">
                                <BuscarEspecialidade onBuscar={buscarEspecialidadeNome} onLimpar={limparBusca} />
                            </div>

                            <table className="tabela-todos">
                                <thead>
                                    <tr>
                                        <th className="th-nome">NOME DA ESPECIALIDADE</th>
                                        <th className="th-opcoes">OPÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaEspecialidades.length === 0 ? (
                                        <tr>
                                            <th colSpan="2"> Nenhuma Especialidade Encontrada </th>
                                        </tr>
                                    ) :
                                        (
                                            listaEspecialidades.map((especialidade) => (
                                                <ItemEspecialidade key={especialidade.id} especialidade={especialidade}
                                                    onEdit={handleEditarEspecialidade} onDelete={() => abrirModalDeletar(especialidade)}
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
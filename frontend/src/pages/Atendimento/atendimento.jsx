import { useState, useEffect } from "react";
import api from "../../services/api";

import FormAtendimento from "./components/FormAtendimento/formAtendimento";
import EditarAtendimento from "./components/EditarAtendimento/editarAtendimento";
import BuscaCPFAtendimento from "./components/BuscaCPF/buscaCPFAtendimento";
import ItemAtendimento from "./components/ItemAtendimento/itemAtendimento";
import SucessoModal from "../../components/SucessoModal/sucessoModal";
import ConfirmarDelete from "../../components/ConfirmarDelete/confirmarDelete";

import "../index.css";
//import "./atendimento.css";

export default function Atendimento() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [todosAtendimentos, setTodosAtendimentos] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);

  const [atendimentoEditando, setAtendimentoEditando] = useState(null);
  const [atendimentoParaDeletar, setAtendimentoParaDeletar] = useState(null);
  const [modalDeleteVisivel, setModalDeleteVisivel] = useState(false);

  const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  async function fetchAtendimentos() {
    try {
      const response = await api.get("/atendimentos");
      setTodosAtendimentos(response.data);
      setListaFiltrada(response.data);
    } catch (error) {
      console.log("Erro ao buscar atendimentos: ", error);
    }
  }

  useEffect(() => {
    if (opcaoSelecionada === "buscar") {
      fetchAtendimentos();
    }
  }, [opcaoSelecionada]);

  async function handleAddAtendimento(data) {
    try {
      await api.post("/atendimentos", data);
      setMensagemSucesso("Atendimento cadastrado com sucesso!");
      setModalSucessoVisivel(true);
    } catch (error) {
      console.log("Erro ao adicionar atendimento: ", error);
    }
  }

  async function handleUpdateAtendimento(data) {
    try {
      await api.put(`/atendimentos/${data._id}`, data);
      setAtendimentoEditando(null);
      setMensagemSucesso("Atendimento atualizado com sucesso!");
      setModalSucessoVisivel(true);
      fetchAtendimentos();
    } catch (error) {
      console.log("Erro ao atualizar atendimento:", error);
    }
  }

  function buscarAtendimentoPorCPF(cpfDigitado) {
    const resultado = todosAtendimentos.filter((at) =>
      at.paciente?.cpf?.replace(/\D/g, "").includes(cpfDigitado.replace(/\D/g, ""))
    );
    setListaFiltrada(resultado);
  }

  function limparBusca() {
    setListaFiltrada(todosAtendimentos);
  }

  function abrirModalDeletar(atendimento) {
    setAtendimentoParaDeletar(atendimento);
    setModalDeleteVisivel(true);
  }

  async function confirmarDeletar() {
    if (!atendimentoParaDeletar) return;
    try {
      await api.delete(`/atendimentos/${atendimentoParaDeletar._id}`);
      setModalDeleteVisivel(false);
      setAtendimentoParaDeletar(null);
      fetchAtendimentos();
    } catch (error) {
      console.log("Erro ao deletar atendimento:", error);
    }
  }

  function cancelarDeletar() {
    setModalDeleteVisivel(false);
    setAtendimentoParaDeletar(null);
  }

  function handleEditar(atendimento) {
    setAtendimentoEditando(atendimento);
  }

  function handleCancelarEdicao() {
    setAtendimentoEditando(null);
  }

  return (
    <div className="container-principal">
      <h1 className="titulo"> Atendimento </h1>

      <div className="container-opcoes">
        <button className="opcoes" onClick={() => { setOpcaoSelecionada("cadastrar"); setAtendimentoEditando(null); }}>Cadastrar</button>
        <button className="opcoes" onClick={() => { setOpcaoSelecionada("buscar"); setAtendimentoEditando(null); }}>Buscar</button>
      </div>

      <SucessoModal
        visible={modalSucessoVisivel}
        message={mensagemSucesso}
        onClose={() => setModalSucessoVisivel(false)}
      />

      <ConfirmarDelete
        visible={modalDeleteVisivel}
        message={`Deseja realmente deletar este atendimento?`}
        onConfirm={confirmarDeletar}
        onCancel={cancelarDeletar}
      />

      {atendimentoEditando ? (
        <EditarAtendimento
          atendimento={atendimentoEditando}
          onSubmit={handleUpdateAtendimento}
          onCancel={handleCancelarEdicao}
        />
      ) : (
        <>
          {opcaoSelecionada === "cadastrar" && <FormAtendimento onSubmit={handleAddAtendimento} />}

          {opcaoSelecionada === "buscar" && (
            <div className="container">
              <div className="busca">
                <BuscaCPFAtendimento onBuscar={buscarAtendimentoPorCPF} onLimpar={limparBusca} />
              </div>

              <table className="tabela-todos">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>CPF</th>
                    <th>Especialidade</th>
                    <th>Profissional</th>
                    <th>Data</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {listaFiltrada.length === 0 ? (
                    <tr><td colSpan="6">Nenhum atendimento encontrado</td></tr>
                  ) : (
                    listaFiltrada.map((atendimento) => (
                      <ItemAtendimento
                        key={atendimento._id}
                        atendimento={atendimento}
                        onEdit={() => handleEditar(atendimento)}
                        onDelete={() => abrirModalDeletar(atendimento)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
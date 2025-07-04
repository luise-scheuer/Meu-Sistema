import { useState, useEffect } from "react";
import api from "../../../../services/api";

export default function FormAtendimento({ onSubmit }) {
  const [pacienteCPF, setPacienteCPF] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const [listaEspecialidades, setListaEspecialidades] = useState([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");

  const [profissionais, setProfissionais] = useState([]);
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");

  useEffect(() => {
    async function fetchProfissionais() {
      const response = await api.get("/profissionais");
      setProfissionais(response.data);
    }
    fetchProfissionais();
  }, []);

  useEffect(() => {
    async function fetchEspecialidades() {
      const response = await api.get("/especialidades");
      setListaEspecialidades(response.data);
    }
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    const filtrados = profissionais.filter(
      (p) => p.especialidade?._id === especialidadeSelecionada
    );
    setProfissionaisFiltrados(filtrados);
  }, [especialidadeSelecionada, profissionais]);

  const buscarPaciente = async () => {
    try {
      const response = await api.get(`/pacientes/cpf/${pacienteCPF}`);
      setPacienteSelecionado(response.data);
    } catch {
      setPacienteSelecionado(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pacienteSelecionado || !especialidadeSelecionada || !profissionalSelecionado) return;

    await onSubmit({
      paciente: pacienteSelecionado._id,
      especialidade: especialidadeSelecionada,
      profissional: profissionalSelecionado,
    });

    setPacienteCPF("");
    setPacienteSelecionado(null);
    setEspecialidadeSelecionada("");
    setProfissionalSelecionado("");
  };

  function formatarData(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="informacoes">
          <label htmlFor="paciente-cpf">CPF do Paciente:</label>
          <input
            type="text"
            value={pacienteCPF}
            onChange={(e) => setPacienteCPF(e.target.value)}
          />
          <button type="button" onClick={buscarPaciente}>Buscar</button>
        </div>

        {pacienteSelecionado && (
          <div>
            <p>Nome: {pacienteSelecionado.nome}</p>
            <p>Data de nascimento: {formatarData(pacienteSelecionado.dataNascimento)}</p>
            <p>Telefone: {pacienteSelecionado.telefone}</p>
          </div>
        )}

        <div className="informacoes">
          <label>Especialidade:</label>
          <select
            value={especialidadeSelecionada}
            onChange={(e) => setEspecialidadeSelecionada(e.target.value)}
          >
            <option value="">Selecione</option>
            {listaEspecialidades.map((esp) => (
              <option key={esp._id} value={esp._id}>{esp.area}</option>
            ))}
          </select>
        </div>

        <div className="informacoes">
          <label>Profissional:</label>
          <select
            value={profissionalSelecionado}
            onChange={(e) => setProfissionalSelecionado(e.target.value)}
          >
            <option value="">Selecione</option>
            {profissionaisFiltrados.map((p) => (
              <option key={p._id} value={p._id}>{p.nome}</option>
            ))}
          </select>
        </div>

        <button className="botoes" type="submit">Cadastrar Atendimento</button>
      </form>
    </div>
  );
}
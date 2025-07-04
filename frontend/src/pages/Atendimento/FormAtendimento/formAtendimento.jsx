import { useState, useEffect } from "react";
import api from "../../services/api";

export default function FormAtendimento({ onSubmit }) {
  const [pacienteCPF, setPacienteCPF] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");

  const [profissionais, setProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");

  // Buscar especialidades ao carregar
  useEffect(() => {
    api.get("/especialidades").then(res => setEspecialidades(res.data));
  }, []);

  // Buscar profissionais ao selecionar especialidade
  useEffect(() => {
    if (especialidadeSelecionada) {
      api.get(`/profissionais/especialidade/${especialidadeSelecionada}`).then(res => {
        setProfissionais(res.data);
        setProfissionalSelecionado(""); // reset
      });
    } else {
      setProfissionais([]);
    }
  }, [especialidadeSelecionada]);

  const buscarPacientePorCPF = async () => {
    try {
      const response = await api.get(`/pacientes/cpf/${pacienteCPF}`);
      setPacienteSelecionado(response.data);
    } catch (error) {
      console.error("Paciente não encontrado:", error);
      setPacienteSelecionado(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pacienteSelecionado || !especialidadeSelecionada || !profissionalSelecionado) {
      alert("Preencha todos os campos.");
      return;
    }

    onSubmit({
      paciente: pacienteSelecionado._id,
      especialidade: especialidadeSelecionada,
      profissional: profissionalSelecionado,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>CPF do Paciente:</label>
        <input
          type="text"
          value={pacienteCPF}
          onChange={(e) => setPacienteCPF(e.target.value)}
        />
        <button type="button" onClick={buscarPacientePorCPF}>Buscar</button>
        {pacienteSelecionado && <p>Paciente: {pacienteSelecionado.nome}</p>}
      </div>

      <div>
        <label>Especialidade:</label>
        <select
          value={especialidadeSelecionada}
          onChange={(e) => setEspecialidadeSelecionada(e.target.value)}
        >
          <option value="">Selecione</option>
          {especialidades.map((esp) => (
            <option key={esp._id} value={esp._id}>{esp.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Profissional:</label>
        <select
          value={profissionalSelecionado}
          onChange={(e) => setProfissionalSelecionado(e.target.value)}
        >
          <option value="">Selecione</option>
          {profissionais.map((prof) => (
            <option key={prof._id} value={prof._id}>{prof.nome}</option>
          ))}
        </select>
      </div>

      <button type="submit">Cadastrar Atendimento</button>
    </form>
  );
}

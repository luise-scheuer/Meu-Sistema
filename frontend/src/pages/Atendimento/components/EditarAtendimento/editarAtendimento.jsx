import { useState, useEffect } from "react";
import api from "../../../../services/api";

export default function EditarAtendimento({ atendimento, onSubmit, onCancel }) {
  const [listaEspecialidades, setListaEspecialidades] = useState([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [profissionais, setProfissionais] = useState([]);
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");

  useEffect(() => {
    async function carregar() {
      const espRes = await api.get("/especialidades");
      const profRes = await api.get("/profissionais");
      setListaEspecialidades(espRes.data);
      setProfissionais(profRes.data);
    }
    carregar();
  }, []);

  useEffect(() => {
    if (atendimento) {
      setEspecialidadeSelecionada(atendimento.especialidade?._id || "");
      setProfissionalSelecionado(atendimento.profissional?._id || "");
    }
  }, [atendimento]);

  useEffect(() => {
    const filtrados = profissionais.filter(
      (p) => p.especialidade?._id === especialidadeSelecionada
    );
    setProfissionaisFiltrados(filtrados);
  }, [especialidadeSelecionada, profissionais]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      _id: atendimento._id,
      paciente: atendimento.paciente._id,
      especialidade: especialidadeSelecionada,
      profissional: profissionalSelecionado,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Editar Atendimento</h2>
      <div className="informacoes">
        <label>Paciente:</label>
        <p>{atendimento.paciente?.nome}</p>
      </div>

      <div className="informacoes">
        <label>Especialidade:</label>
        <select value={especialidadeSelecionada} onChange={(e) => setEspecialidadeSelecionada(e.target.value)}>
          <option value="">Selecione</option>
          {listaEspecialidades.map((esp) => (
            <option key={esp._id} value={esp._id}>{esp.area}</option>
          ))}
        </select>
      </div>

      <div className="informacoes">
        <label>Profissional:</label>
        <select value={profissionalSelecionado} onChange={(e) => setProfissionalSelecionado(e.target.value)}>
          <option value="">Selecione</option>
          {profissionaisFiltrados.map((p) => (
            <option key={p._id} value={p._id}>{p.nome}</option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit">Atualizar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

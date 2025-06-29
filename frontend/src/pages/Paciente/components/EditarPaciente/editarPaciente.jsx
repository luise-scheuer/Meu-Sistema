import { useState, useEffect } from "react";
import "../../paciente.css";

export default function EditarPaciente({ paciente, onSubmit, onCancel }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (paciente) {
      setNome(paciente.nome || "");
      setCpf(paciente.cpf || "");
      setDataNascimento(paciente.dataNascimento?.slice(0, 10) || "");
      setEndereco(paciente.endereco || "");
      setTelefone(paciente.telefone || "");
    }
  }, [paciente]);

  function handleSubmit(e) {
    e.preventDefault();
    const dadosAtualizados = {
      _id: paciente._id,
      nome,
      cpf,
      dataNascimento: new Date(dataNascimento),
      endereco,
      telefone,
    };
    onSubmit(dadosAtualizados);
  }

  return (
    <div className="container">
      <h2 id="titulo-editar">Editar Paciente</h2>

      <form onSubmit={handleSubmit}>
        <div className="informacoes">
          <label>Nome:</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="informacoes">
          <label>CPF:</label>
          <input value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>

        <div className="informacoes">
          <label>Data de Nascimento:</label>
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </div>

        <div className="informacoes">
          <label>Endereço:</label>
          <input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>

        <div className="informacoes">
          <label>Telefone:</label>
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>

        <div className="buttons">
          <button id="button-update" type="submit">Atualizar</button>
          <button id="button-cancelar" type="button" onClick={onCancel}>Cancelar</button>
        </div>

      </form>

    </div>

  );
}

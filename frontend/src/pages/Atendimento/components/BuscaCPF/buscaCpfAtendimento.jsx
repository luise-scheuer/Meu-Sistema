import { useState } from "react";
import { MdManageSearch, MdCleaningServices } from "react-icons/md";
//import "../../../paciente.css";

export default function BuscaCPFAtendimento({ onBuscar, onLimpar }) {
  const [cpf, setCpf] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const handleBuscar = () => {
    const cpfLimpo = cpf.trim();
    if (!cpfLimpo) {
      setMensagemErro("Insira um CPF para buscar!");
      setTimeout(() => setMensagemErro(""), 2500);
      return;
    }
    onBuscar(cpfLimpo);
    setMensagemErro("");
  };

  const handleLimpar = () => {
    setCpf("");
    setMensagemErro("");
    onLimpar();
  };

  return (
    <div className="busca">
      <label htmlFor="busca-cpf"> CPF: </label>
      {mensagemErro && <div className="mensagem-popup">{mensagemErro}</div>}
      <input
        type="text"
        id="busca-cpf"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Insira o CPF para buscar atendimentos"
      />
      <button className="botoes" onClick={handleBuscar}><MdManageSearch /></button>
      <button className="botoes" onClick={handleLimpar}><MdCleaningServices /></button>
    </div>
  );
}

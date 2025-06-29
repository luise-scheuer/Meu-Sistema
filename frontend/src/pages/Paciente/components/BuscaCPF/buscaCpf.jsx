import { useState } from "react";
import { MdManageSearch, MdCleaningServices } from "react-icons/md";
import "../../paciente.css"; // se quiser separar estilo

export default function BuscaCpf({ onBuscar, onLimpar }) {
    const [cpf, setCpf] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const handleBuscar = () => {
        const cpfLimpo = cpf.trim();
        if (!cpfLimpo) {
            setMensagemErro("Insira um CPF para buscar!");
            setTimeout(() => setMensagemErro(""), 2500);
            return;
        }

        onBuscar(cpfLimpo); // Passa o CPF para o componente pai
        setMensagemErro("");
    };

    const handleLimpar = () => {
        setCpf("");
        setMensagemErro("");
        onLimpar(); // atualiza a lista completa
    };

    return (
        <div className="busca">
            <label htmlFor="busca-cpf"> CPF: </label>

            {mensagemErro && (
                <div className="mensagem-popup">{mensagemErro}</div>
            )}

            <input
                type="text"
                id="busca-cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Insira o CPF cadastrado a ser buscado"
            />
            <button className="botoes" onClick={handleBuscar}>
                <MdManageSearch id="icon-buscar" />
            </button>
            <button className="botoes" onClick={handleLimpar}>
                <MdCleaningServices id="icon-limpar" />
            </button>
        </div>
    );
}

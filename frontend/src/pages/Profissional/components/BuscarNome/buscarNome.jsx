import { useState } from "react";
import { MdManageSearch, MdCleaningServices } from "react-icons/md";
import "../../profissional.css"; // se quiser separar estilo

export default function BuscarNome({ onBuscar, onLimpar }) {
    const [nome, setNome] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const handleBuscar = () => {
        const nomeLimpo = nome.trim();
        if (!nomeLimpo) {
            setMensagemErro("Insira um nome para buscar!");
            setTimeout(() => setMensagemErro(""), 2500);
            return;
        }

        onBuscar(nomeLimpo); // Passa o NOME para o componente pai
        setMensagemErro("");
    };

    const handleLimpar = () => {
        setNome("");
        setMensagemErro("");
        onLimpar(); // atualiza a lista completa
    };

    return (
        <div className="busca">
            <label htmlFor="busca-nome"> NOME: </label>

            {mensagemErro && (
                <div className="mensagem-popup">{mensagemErro}</div>
            )}

            <input
                type="text"
                id="busca-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Insira o nome cadastrado a ser buscado"
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

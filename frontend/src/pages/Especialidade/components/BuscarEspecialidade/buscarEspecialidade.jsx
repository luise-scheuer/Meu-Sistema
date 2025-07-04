import { useState } from "react";
import { MdManageSearch, MdCleaningServices } from "react-icons/md";
//import "../../especialidade.css";

export default function BuscarEspecialidade({ onBuscar, onLimpar }) {
    const [area, setArea] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const handleBuscar = () => {
        const areaLimpa = area.trim();
        if (!areaLimpa) {
            setMensagemErro("Insira uma especialidade para buscar!");
            setTimeout(() => setMensagemErro(""), 2500);
            return;
        }

        onBuscar(areaLimpa);
        setMensagemErro("");
    };

    const handleLimpar = () => {
        setArea("");
        setMensagemErro("");
        onLimpar(); // atualiza a lista completa
    };

    return (
        <div className="busca">
            <label htmlFor="busca-area"> NOME: </label>

            {mensagemErro && (
                <div className="mensagem-popup">{mensagemErro}</div>
            )}

            <input
                type="text"
                id="busca-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Insira o nome da especialidade cadastrada a ser buscada"
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

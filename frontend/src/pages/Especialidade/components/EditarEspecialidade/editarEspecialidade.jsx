import { useState, useEffect } from "react";
//import "../../especialidade.css";

export default function EditarEspecialidade({ especialidade, onSubmit, onCancel }) {
    const [area, setArea] = useState("");

    useEffect(() => {
        if (especialidade) {
            setArea(especialidade.area || "");
        }
    }, [especialidade]);

    function handleSubmit(e) {
        e.preventDefault();
        const dadosAtualizados = {
            _id: especialidade._id,
            area
        };
        onSubmit(dadosAtualizados);
    }

    return (
        <div className="container">
            <h2 id="titulo-editar">Editar Especialidade</h2>

            <form onSubmit={handleSubmit}>
                <div className="informacoes">
                    <label>Nome da Especialidade:</label>
                    <input value={area} onChange={(e) => setArea(e.target.value)} />
                </div>

                <div className="buttons">
                    <button id="button-update" type="submit">Atualizar</button>
                    <button id="button-cancelar" type="button" onClick={onCancel}>Cancelar</button>
                </div>

            </form>

        </div>

    );
}

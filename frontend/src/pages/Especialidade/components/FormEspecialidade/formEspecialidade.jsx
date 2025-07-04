import { useState } from "react";

//import "../../especialidade.css";

export default function FormEspecialidade({ onSubmit }) {
    const [especialidadeNome, setEspecialidadeNome] = useState("");
    const isFormValid = especialidadeNome.trim();

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            area: especialidadeNome
        });

        //Limpar os campos após o envio do formulário
        setEspecialidadeNome("");
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="informacoes">
                    <label htmlFor="profissional-nome"> Área da Especialidade: </label>
                    <input type="text" name="profissional-nome" id="profissional-nome"
                        value={especialidadeNome} onChange={(e) => { setEspecialidadeNome(e.target.value) }}
                    />
                </div>

                <button id="enviar" type="submit" disabled={!isFormValid}>Enviar</button>

            </form>
        </div>
    );
}
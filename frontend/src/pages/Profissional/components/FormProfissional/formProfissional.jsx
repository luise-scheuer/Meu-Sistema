import { useEffect, useState } from "react";
import api from "../../../../services/api";

import "../../profissional.css";

export default function FormProfissional({ onSubmit }) {

    const [profissionalNome, setProfissionalNome] = useState("");
    const [profissionalCRM, setProfissionalCRM] = useState("");
    const [profissionalEspecialidade, setProfissionalEspecialidade] = useState("");
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const isFormValid = profissionalNome.trim() && profissionalCRM.trim() && profissionalEspecialidade.trim();

    useEffect(() => {
        async function fetchEspecialidades() {
            try {
                const response = await api.get("/especialidades");
                setListaEspecialidades(response.data);
            } catch (error) {
                console.error("Erro ao buscar especialidades:", error);
            }
        }

        fetchEspecialidades();
    }, [listaEspecialidades]);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            nome: profissionalNome,
            crm: profissionalCRM,
            especialidade: profissionalEspecialidade
        });

        //Limpar os campos após o envio do formulário
        setProfissionalNome("");
        setProfissionalCRM("");
        setProfissionalEspecialidade("");
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="informacoes">
                    <label htmlFor="profissional-nome"> Nome do Profissional: </label>
                    <input type="text" name="profissional-nome" id="profissional-nome"
                        value={profissionalNome} onChange={(e) => { setProfissionalNome(e.target.value) }}
                    />
                </div>

                <div className="informacoes">
                    <label htmlFor="profissional-crm"> CRM: </label>
                    <input type="text" name="profissional-crm" id="profissional-crm"
                        value={profissionalCRM} onChange={(e) => { setProfissionalCRM(e.target.value) }}
                    />
                </div>

                <div className="informacoes">
                    <label htmlFor="profissional-especialidade"> Especialidade: </label>
                    <select id="profissional-especialidade"
                        value={profissionalEspecialidade}
                        onChange={(e) => setProfissionalEspecialidade(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma especialidade</option>
                        {listaEspecialidades.map((esp) => (
                            <option key={esp._id} value={esp._id}>
                                {esp.area}
                            </option>
                        ))}
                    </select>
                </div>

                <button id="enviar" type="submit" disabled={!isFormValid}>Enviar</button>

            </form>
        </div>
    );
}
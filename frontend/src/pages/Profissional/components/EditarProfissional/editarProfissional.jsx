import { useState, useEffect } from "react";
import api from "../../../../services/api";
import "../../profissional.css";

export default function EditarProfissional({ profissional, onSubmit, onCancel }) {
    const [nome, setNome] = useState("");
    const [crm, setCrm] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [listaEspecialidades, setListaEspecialidades] = useState([]);

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
    }, []);

    useEffect(() => {
        if (profissional) {
            setNome(profissional.nome || "");
            setCrm(profissional.crm || "");
            setEspecialidade( profissional.especialidade?._id || profissional.especialidade || "" );
        }
    }, [profissional]);

    function handleSubmit(e) {
        e.preventDefault();
        const dadosAtualizados = {
            _id: profissional._id,
            nome,
            crm,
            especialidade,
        };
        onSubmit(dadosAtualizados);
    }

    return (
        <div className="container">
            <h2 id="titulo-editar">Editar Profissional</h2>

            <form onSubmit={handleSubmit}>
                <div className="informacoes">
                    <label>Nome:</label>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div className="informacoes">
                    <label>CRM:</label>
                    <input value={crm} onChange={(e) => setCrm(e.target.value)} />
                </div>

                <div className="informacoes">
                    <label>Especialidade:</label>
                    <select
                        value={especialidade}
                        onChange={(e) => setEspecialidade(e.target.value)}
                    >
                        {listaEspecialidades.map((esp) => (
                            <option key={esp._id} value={esp._id}>
                                {esp.area}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="buttons">
                    <button id="button-update" type="submit">Atualizar</button>
                    <button id="button-cancelar" type="button" onClick={onCancel}>Cancelar</button>
                </div>

            </form>

        </div>

    );
}

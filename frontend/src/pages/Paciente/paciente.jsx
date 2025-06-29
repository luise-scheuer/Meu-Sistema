import { useState, useEffect } from "react";
import api from "../../services/api";
import FormPaciente from "./components/FormPaciente/formPaciente";
import ItemPaciente from "./components/ItemPaciente/itemPaciente";
import "./paciente.css";

export default function Paciente() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [listaPacientes, setListaPacientes] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    

    useEffect(() => {
        async function fetchPacientes() {
            try {
                const response = await api.get("/pacientes");
                setListaPacientes(response.data);
            } catch (error) {
                console.log("Erro ao buscar pacientes: ", error);
            }
        }

        fetchPacientes();
    }, [pacientes]);

    async function handleAddPaciente(data){
        try {
            const response = await api.post("/pacientes", data);
            setListaPacientes([...pacientes, response.data]);
        } catch (error){
            console.log("Erro ao adicionar paciente: ", error);
        }
    }

    return (
        <>
            <div className="container-paciente">
                <h1 className="titulo"> Paciente </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("cadastrar")}>Cadastrar</button>
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("buscar")}>Buscar</button>
                </div>


                {opcaoSelecionada === "cadastrar" && <FormPaciente onSubmit={handleAddPaciente} />}
                {opcaoSelecionada === "buscar" && <ItemPaciente />}
            </div>

        </>
    )
}
import { useState } from "react";
import FormPaciente from "./components/FormPaciente/formPaciente";
import ItemPaciente from "./components/ItemPaciente/itemPaciente";
import "./paciente.css";

export default function Paciente() {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");


    return (
        <>
            <div className="container-paciente">
                <h1 className="titulo"> Paciente </h1>

                <div className="container-opcoes">
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("cadastrar")}>Cadastrar</button>
                    <button className="opcoes" onClick={() => setOpcaoSelecionada("buscar")}>Buscar</button>
                </div>


                {opcaoSelecionada === "cadastrar" && <FormPaciente />}
                {opcaoSelecionada === "buscar" && <ItemPaciente />}
            </div>

        </>
    )
}
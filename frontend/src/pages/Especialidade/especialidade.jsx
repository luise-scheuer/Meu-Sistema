import { useState, useEffect } from "react";
import api from "../../services/api";

import "../index.css";


export default function Especialidade() {

    return (
        <>
            <div className="container-principal">
                <h1 className="titulo"> Especialidade </h1>

                <div className="container-opcoes">
                    <button className="opcoes">Cadastrar</button>
                    <button className="opcoes">Buscar</button>
                </div>


            </div>

        </>
    )
}
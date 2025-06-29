import { MdCreate, MdDeleteForever } from "react-icons/md";
import "../../paciente.css";

export default function ItemPaciente() {
    return (
        <div className="container">
            <table className="tabela-pacientes">
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CPF</th>
                        <th>OPÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>NOME DO PACIENTE</th>
                        <th>CPF DO PACIENTE</th>
                        <th className="acoes">
                            <MdCreate fontSize="30px" color="#4d6477" />
                            <MdDeleteForever fontSize="30px" color="#d64859" />
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
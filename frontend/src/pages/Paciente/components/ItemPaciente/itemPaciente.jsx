import { MdCreate, MdDeleteForever } from "react-icons/md";

export default function ItemPaciente() {
    return (
        <tr>
            <th>NOME DO PACIENTE</th>
            <th>CPF DO PACIENTE</th>
            <th class="acoes">
                <MdCreate fontSize="30px" color="#4d6477" />
                <MdDeleteForever fontSize="30px" color="#d64859" />
            </th>
        </tr>
    );
}
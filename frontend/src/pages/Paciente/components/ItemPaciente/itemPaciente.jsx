import { MdCreate, MdDeleteForever } from "react-icons/md";
import "../../paciente.css";

export default function ItemPaciente({ paciente }) {
    return (
        <tr>
            <th>{paciente.nome}</th>
            <th>{paciente.cpf}</th>
            <th className="acoes">
                <MdCreate className="icon-opcoes" id="icon-atualizar" />
                <MdDeleteForever className="icon-opcoes" id="icon-deletar"/>
            </th>
        </tr>
    );
}
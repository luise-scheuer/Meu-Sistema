import { MdCreate, MdDeleteForever } from "react-icons/md";
import "../../../index.css";

export default function ItemEspecialidade({ especialidade, onEdit, onDelete }) {
    return (
        <tr>
            <th>{especialidade.area}</th>
            <th className="acoes">
                <MdCreate className="icon-opcoes" id="icon-atualizar" onClick={() => onEdit && onEdit(especialidade)} />
                <MdDeleteForever className="icon-opcoes" id="icon-deletar" onClick={() => onDelete && onDelete()}/>
            </th>
        </tr>
    );
}
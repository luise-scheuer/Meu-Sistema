import { MdCreate, MdDeleteForever } from "react-icons/md";
import "../../profissional.css";

export default function ItemProfissional({ profissional, onEdit, onDelete }) {
    return (
        <tr>
            <th>{profissional.nome}</th>
            <th>{profissional.crm}</th>
            <th>{profissional.especialidade?.area}</th>
            <th className="acoes">
                <MdCreate className="icon-opcoes" id="icon-atualizar" onClick={() => onEdit && onEdit(profissional)} />
                <MdDeleteForever className="icon-opcoes" id="icon-deletar" onClick={() => onDelete && onDelete()}/>
            </th>
        </tr>
    );
}
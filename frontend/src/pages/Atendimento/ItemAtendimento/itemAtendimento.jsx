import { MdCreate, MdDeleteForever } from "react-icons/md";

export default function ItemAtendimento({ atendimento, onEdit, onDelete }) {
    return (
        <tr>
            <th>{atendimento.paciente}</th>
            <th>{atendimento.profissional}</th>
            <th>{atendimento.especialidade}</th>
            <th>{atendimento.dataAtendimento}</th>
            <th>{atendimento.horaAtendimento}</th>
            <th className="acoes">
                <MdCreate className="icon-opcoes" id="icon-atualizar" onClick={() => onEdit && onEdit(atendimento)} />
                <MdDeleteForever className="icon-opcoes" id="icon-deletar" onClick={() => onDelete && onDelete()}/>
            </th>
        </tr>
    );
}
import { MdCreate, MdDeleteForever } from "react-icons/md";
//import "../../../paciente.css";

export default function ItemAtendimento({ atendimento, onEdit, onDelete }) {
  function formatarData(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
  }

  return (
    <tr>
      <td>{atendimento.paciente?.nome}</td>
      <td>{atendimento.paciente?.cpf}</td>
      <td>{atendimento.especialidade?.area}</td>
      <td>{atendimento.profissional?.nome}</td>
      <td>{formatarData(atendimento.createdAt)}</td>
      <td className="acoes">
        <MdCreate className="icon-opcoes" onClick={onEdit} />
        <MdDeleteForever className="icon-opcoes" onClick={onDelete} />
      </td>
    </tr>
  );
}

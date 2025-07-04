import { MdCreate, MdDeleteForever } from "react-icons/md";
import "../index.css";

export default function ItemEspecialidade() {
    return (
        <tr>
            <th>a</th>
            <th>a</th>
            <th className="acoes">
                <MdCreate className="icon-opcoes" id="icon-atualizar"  />
                <MdDeleteForever className="icon-opcoes" id="icon-deletar"  />
            </th>
        </tr>
    );
}
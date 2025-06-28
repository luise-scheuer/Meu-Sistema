import { Link } from "react-router-dom";
import "./navBar.css"
export default function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/">HOME imagem logo?</Link>
            <div id="campos"> 
                <Link to="/">Profissional</Link>
                <Link to="/paciente">Paciente</Link>
                <Link to="/">Especialidade</Link>
                <Link to="/">Atendimento</Link>
            </div>
        </nav>
        
       
    )
}
import { Link } from "react-router-dom";
import "./navBar.css"
import logo from './logo.png';
export default function NavBar() {
    return (
        <nav className="navbar">
            <div id="logo">
                <img src={logo} alt="" />
            </div>
            <div id="campos">
                <Link to="/profissional">Profissional</Link>
                <Link to="/paciente">Paciente</Link>
                <Link to="/especialidade">Especialidade</Link>
                <Link to="/">Atendimento</Link>
            </div>
        </nav>


    )
}
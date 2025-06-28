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
                <Link to="/">Profissional</Link>
                <Link to="/paciente">Paciente</Link>
                <Link to="/">Especialidade</Link>
                <Link to="/">Atendimento</Link>
            </div>
        </nav>


    )
}
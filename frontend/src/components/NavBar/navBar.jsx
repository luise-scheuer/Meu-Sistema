import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <nav className="navbar">
            <Link to="/">HOME</Link>
            <Link to="/">CADASTRO</Link>
        </nav>
    )
}
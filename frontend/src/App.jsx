import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/footer";
import NavBar from "./components/NavBar/navBar";
import Home from "./pages/Home/home";
import Paciente from "./pages/Paciente/paciente";
import Profissional from "./pages/Profissional/profissional";
import Especialidade from "./pages/Especialidade/especialidade";
import Atendimento from "./pages/Atendimento/atendimento";

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/profissional" element={<Profissional />} />
        <Route path="/especialidade" element={<Especialidade />} />
        <Route path="/atendimento" element={<Atendimento />} />
      </Routes>
      <Footer></Footer>
    </>
  )
};

export default App;

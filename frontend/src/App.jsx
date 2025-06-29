import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/footer";
import NavBar from "./components/NavBar/navBar";
import Home from "./pages/Home/home";
import Paciente from "./pages/Paciente/paciente";


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/profissional" element={<Profissional />} />
      </Routes>
      <Footer></Footer>
    </>
  )
};

export default App;

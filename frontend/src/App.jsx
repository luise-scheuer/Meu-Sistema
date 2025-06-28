import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/navBar";
import Home from "./pages/Home/home";
import Paciente from "./pages/Paciente/paciente";


function App() {

  return (
    <>
      <NavBar />
      <Home></Home>
      <Routes>
        <Route path="/paciente" element={<Paciente />}/>
      </Routes>
    </> 
  )
};

export default App;

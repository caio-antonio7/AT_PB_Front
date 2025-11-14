import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Tratamentos from "./pages/Tratamentos";
import Contato from "./pages/Contato";
import { TratamentosProvider } from "./context/TratamentosContext";
import "./App.css"; 

export default function App() {
  return (
    <TratamentosProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tratamentos" element={<Tratamentos />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>
    </TratamentosProvider>
  );
}

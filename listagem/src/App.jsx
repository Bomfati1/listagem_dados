import Home from "./components/Home";
import Alunos from "./components/Alunos";
import Sobre from "./components/Sobre";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AlunosListPage from "./pages/AlunosListPage"; // Supondo que você renomeou

function App() {
  return (
    <div className="App">
      <h1>Aplicação</h1>
      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">
            Página Inicial
          </Nav.Link>
          <Nav.Link as={Link} to="/add">
            Cadastro de alunos
          </Nav.Link>
          <Nav.Link as={Link} to="/sobre">
            Sobre
          </Nav.Link>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/alunos" element={<Alunos />}></Route>
          <Route path="/edit" element={<AlunosListPage />}></Route>
          <Route path="/add" element={<AlunosListPage />}></Route>
          <Route path="/sobre" element={<Sobre />}></Route>
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

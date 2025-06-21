// src/App.jsx

import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import AlunosListPage from "./pages/AlunosListPage";
import Sobre from "./components/Sobre";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="main-navbar">
          <Container>
            <Navbar.Brand as={NavLink} to="/">
              Aplicação Alunos
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {" "}
                <Nav.Link as={NavLink} to="/">
                  Página Inicial
                </Nav.Link>
                <Nav.Link as={NavLink} to="/list">
                  Alunos
                </Nav.Link>
                <Nav.Link as={NavLink} to="/sobre">
                  Sobre
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<AlunosListPage />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;

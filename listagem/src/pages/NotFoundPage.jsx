// src/pages/NotFoundPage.jsx

import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1 fw-bold">404</h1>
      <h2>Página Não Encontrada</h2>
      <p className="lead text-muted">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}

export default NotFoundPage;

// src/pages/AddItemPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlunoForm from "../components/AlunoForm"; // Supondo que o formulário está em /components
import { createAluno } from "../services/alunoService";

function AddItemPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = async (alunoData) => {
    try {
      setError(null);
      setIsSubmitting(true);
      await createAluno(alunoData);
      // Opcional: Adicionar um feedback de sucesso (toast, alert)
      navigate("/"); // Redireciona para a lista após o sucesso
    } catch (err) {
      setError(err.message || "Falha ao adicionar aluno.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Adicionar Novo Aluno</h1>
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <AlunoForm
        onSubmit={handleAddItem}
        isSubmitting={isSubmitting}
        buttonText="Cadastrar Aluno"
      />
    </div>
  );
}

export default AddItemPage;

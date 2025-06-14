// src/components/AlunoForm.jsx

import React, { useState, useEffect } from "react";

function AlunoForm({
  onSubmit,
  initialData,
  isSubmitting,
  buttonText = "Salvar",
}) {
  // Define a estrutura padrão de um aluno vazio
  const defaultFormState = {
    nome: "",
    email: "",
    matricula: "",
    curso: "",
    ativo: true,
  };

  // O estado do formulário começa com os valores padrão
  const [aluno, setAluno] = useState(defaultFormState);

  // MUDANÇA PRINCIPAL AQUI:
  // Este useEffect agora só vai preencher o formulário se receber
  // dados iniciais com um ID (ou seja, no modo de edição).
  // Ele não vai mais interferir no formulário de adição.
  useEffect(() => {
    if (initialData && initialData.id) {
      setAluno(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAluno((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(aluno);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome Completo
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
          value={aluno.nome || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={aluno.email || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="matricula" className="form-label">
          Matrícula
        </label>
        <input
          type="text"
          className="form-control"
          id="matricula"
          name="matricula"
          value={aluno.matricula || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="curso" className="form-label">
          Curso
        </label>
        <input
          type="text"
          className="form-control"
          id="curso"
          name="curso"
          value={aluno.curso || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nascimento" className="form-label">
          Data de nascimento
        </label>
        <input
          type="date"
          className="form-control"
          id="dataNascimento"
          name="dataNascimento"
          value={aluno.dataNascimento || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="ativo"
          name="ativo"
          checked={aluno.ativo || false}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="ativo">
          Aluno Ativo
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : buttonText}
      </button>
    </form>
  );
}

export default AlunoForm;

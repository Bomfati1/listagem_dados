// src/components/AlunoForm.jsx
import React from "react";

// O formulário agora recebe os dados (formData) e a função para alterá-los (onFormChange) como props.
function AlunoForm({
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
  buttonText = "Salvar",
}) {
  // O formulário não gerencia mais seu próprio estado.

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          value={formData.nome || ""}
          onChange={onFormChange} // Usa a função do componente pai
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
          value={formData.email || ""}
          onChange={onFormChange} // Usa a função do componente pai
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
          value={formData.matricula || ""}
          onChange={onFormChange} // Usa a função do componente pai
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
          value={formData.curso || ""}
          onChange={onFormChange} // Usa a função do componente pai
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dataNascimento" className="form-label">
          Data de Nascimento
        </label>
        <input
          type="date" // <<< Usando o tipo 'date'
          className="form-control"
          id="dataNascimento"
          name="dataNascimento" // O 'name' deve ser igual ao campo no seu db.json
          value={formData.dataNascimento || ""}
          onChange={onFormChange}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="ativo"
          name="ativo"
          checked={formData.ativo || false}
          onChange={onFormChange} // Usa a função do componente pai
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

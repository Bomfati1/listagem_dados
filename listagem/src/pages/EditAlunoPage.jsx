// src/pages/EditAlunoPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlunoForm from "../components/AlunoForm";
import { getAlunoById, updateAluno } from "../services/alunoService";

function EditAlunoPage() {
  const { alunoId } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const data = await getAlunoById(alunoId);
        setAluno(data);
      } catch (err) {
        setError("Não foi possível carregar os dados do aluno.");
      } finally {
        setLoading(false);
      }
    };
    fetchAluno();
  }, [alunoId]);

  const handleUpdate = async (alunoData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateAluno(alunoId, alunoData);
      navigate("/"); // Redireciona para a lista após sucesso
    } catch (err) {
      setError("Falha ao atualizar o aluno.");
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Carregando formulário...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div>
      <h1>Editar Aluno</h1>
      {aluno && (
        <AlunoForm
          onSubmit={handleUpdate}
          initialData={aluno}
          isSubmitting={isSubmitting}
          buttonText="Salvar Alterações"
        />
      )}
    </div>
  );
}

export default EditAlunoPage;

// seu arquivo AlunosListPage.jsx (versão completa e atualizada)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <<< NOVO: Para o botão de editar
import { getAlunos, deleteAluno } from "../services/alunoService"; // <<< NOVO: Importa deleteAluno

function AlunosListPage() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <<< NOVO: Para tratar erros

  // Função para carregar os alunos
  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await getAlunos();
      setAlunos(data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      setError("Não foi possível carregar a lista de alunos.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect para carregar os dados na montagem do componente
  useEffect(() => {
    fetchAlunos();
  }, []);

  // --- LÓGICA DE EXCLUSÃO ---
  const handleDelete = async (alunoId) => {
    // Pede confirmação antes de excluir
    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir este aluno?"
    );
    if (isConfirmed) {
      try {
        await deleteAluno(alunoId);
        // Atualiza a lista de alunos no estado local, removendo o que foi excluído.
        // Isso dá um feedback visual imediato para o usuário.
        setAlunos(alunos.filter((aluno) => aluno.id !== alunoId));
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
        setError("Não foi possível excluir o aluno.");
      }
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Alunos</h1>
      {/* Você pode adicionar um link para a página de criação aqui */}
      <Link to="/add" className="btn btn-primary mb-3">
        Adicionar Aluno
      </Link>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Status</th>
            <th>Ações</th> {/* <<< NOVO: Coluna para os botões */}
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>
                <span
                  className={`badge ${
                    aluno.ativo ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {aluno.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td>
                {" "}
                {/* <<< NOVO: Célula com os botões */}
                <Link
                  to={`/edit/${aluno.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(aluno.id)}
                  className="btn btn-danger btn-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlunosListPage;

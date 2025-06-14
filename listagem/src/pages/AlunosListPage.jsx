// src/pages/AlunosListPage.jsx

import React, { useState, useEffect } from "react";
import {
  getAlunos,
  deleteAluno,
  createAluno,
  updateAluno,
} from "../services/alunoService";

// Importando componentes do react-bootstrap
import { Button, Modal, Spinner } from "react-bootstrap";
import AlunoForm from "../components/AlunoForm"; // Nosso formulário reutilizável

function AlunosListPage() {
  // Estados da lista principal
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar os modais
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add', 'edit', 'delete'
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carrega os alunos da API
  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await getAlunos();
      setAlunos(data);
    } catch (err) {
      setError("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // Funções para abrir os modais
  const handleShowAddModal = () => {
    setSelectedAluno(null); // Limpa seleção anterior
    setModalType("add");
    setShowModal(true);
  };

  const handleShowEditModal = (aluno) => {
    setSelectedAluno(aluno);
    setModalType("edit");
    setShowModal(true);
  };

  const handleShowDeleteModal = (aluno) => {
    setSelectedAluno(aluno);
    setModalType("delete");
    setShowModal(true);
  };

  // Função para fechar qualquer modal
  const handleCloseModal = () => {
    setShowModal(false);
    setError(null); // Limpa erros ao fechar o modal
  };

  // Lógica para Deletar
  const handleDelete = async () => {
    if (!selectedAluno) return;
    setIsSubmitting(true);
    try {
      await deleteAluno(selectedAluno.id);
      // Remove o aluno da lista local para atualização instantânea da UI
      setAlunos(alunos.filter((a) => a.id !== selectedAluno.id));
      handleCloseModal();
    } catch (err) {
      setError("Falha ao excluir o aluno.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lógica para Adicionar e Editar
  const handleSave = async (alunoData) => {
    // Validação de matrícula repetida para NOVOS alunos
    if (!alunoData.id) {
      // Só valida se for um novo aluno (sem ID)
      const matriculaExists = alunos.some(
        (a) => a.matricula === alunoData.matricula
      );
      if (matriculaExists) {
        setError("Esta matrícula já está em uso. Por favor, insira outra.");
        return; // Interrompe a submissão
      }
    }

    // Confirmação antes de salvar
    const isConfirmed = window.confirm(
      "Deseja mesmo salvar estas informações?"
    );
    if (!isConfirmed) return;

    setIsSubmitting(true);
    try {
      if (alunoData.id) {
        // Se tem ID, é uma atualização
        await updateAluno(alunoData.id, alunoData);
      } else {
        // Se não tem ID, é uma criação
        await createAluno(alunoData);
      }
      handleCloseModal();
      fetchAlunos(); // Recarrega a lista para mostrar as alterações
    } catch (err) {
      setError("Falha ao salvar os dados do aluno.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error && !showModal) return <p className="alert alert-danger">{error}</p>;

  // --- JSX PRINCIPAL ---
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Lista de Alunos</h1>
        <Button variant="primary" onClick={handleShowAddModal}>
          Adicionar Novo Aluno
        </Button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Status</th>
            <th>Ações</th>
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
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowEditModal(aluno)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteModal(aluno)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MODAIS --- */}

      {/* Modal para Adicionar e Editar Aluno */}
      <Modal
        show={modalType === "add" || modalType === "edit"}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "edit" ? "Editar Aluno" : "Adicionar Aluno"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="alert alert-danger">{error}</p>}
          <AlunoForm
            onSubmit={handleSave}
            initialData={selectedAluno}
            isSubmitting={isSubmitting}
            buttonText="Salvar"
          />
        </Modal.Body>
      </Modal>

      {/* Modal para Confirmação de Exclusão */}
      <Modal show={modalType === "delete"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar o aluno **{selectedAluno?.nome}**? Esta
          ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Confirmar Exclusão"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AlunosListPage;

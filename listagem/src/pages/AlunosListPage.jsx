// src/pages/AlunosListPage.jsx

import React, { useState, useEffect } from "react";
import {
  getAlunos,
  deleteAluno,
  createAluno,
  updateAluno,
} from "../services/alunoService";
import { Button, Modal, Spinner } from "react-bootstrap";
import AlunoForm from "../components/AlunoForm";

function AlunosListPage() {
  // Estados da lista principal
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de controle dos modais
  const [modalType, setModalType] = useState("");
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({});

  const defaultFormState = {
    nome: "",
    email: "",
    matricula: "",
    curso: "",
    ativo: true,
  };

  // LÓGICA PARA BUSCAR OS ALUNOS (ESTAVA FALTANDO A IMPLEMENTAÇÃO)
  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await getAlunos();
      setAlunos(data);
      setError(null);
    } catch (err) {
      setError("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // Funções para ABRIR os modais
  const handleShowAddModal = () => {
    setFormData(defaultFormState);
    setModalType("list");
  };

  const handleShowEditModal = (aluno) => {
    setFormData(aluno);
    setModalType("edit");
  };

  const handleShowDeleteModal = (aluno) => {
    setSelectedAluno(aluno);
    setModalType("delete");
  };

  const handleCloseModal = () => {
    setModalType("");
    setError(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDelete = async () => {
    if (!selectedAluno) return;
    setIsSubmitting(true);
    try {
      await deleteAluno(selectedAluno.id);
      setAlunos(alunos.filter((a) => a.id !== selectedAluno.id));
      handleCloseModal();
    } catch (err) {
      setError("Falha ao excluir o aluno.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (dataToSave) => {
    if (!dataToSave.id) {
      const matriculaExists = alunos.some(
        (a) => a.matricula === dataToSave.matricula
      );
      if (matriculaExists) {
        setError("Esta matrícula já está em uso.");
        return;
      }
    }

    const isConfirmed = window.confirm(
      "Deseja mesmo salvar estas informações?"
    );
    if (!isConfirmed) return;

    setIsSubmitting(true);
    try {
      if (dataToSave.id) {
        await updateAluno(dataToSave.id, dataToSave);
      } else {
        await createAluno(dataToSave);
      }
      handleCloseModal();
      fetchAlunos();
    } catch (err) {
      setError("Falha ao salvar os dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  if (error && !modalType) return <p className="alert alert-danger">{error}</p>;

  // --- JSX PRINCIPAL E COMPLETO ---
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
        {/* CORPO DA TABELA ONDE A LISTA É RENDERIZADA (ESTAVA FALTANDO) */}
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

      {/* Modal para Adicionar e Editar Aluno */}
      <Modal
        show={modalType === "list" || modalType === "edit"}
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
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={() => handleSave(formData)}
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

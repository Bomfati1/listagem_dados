import axios from "axios";

const API_URL = "http://localhost:3001/alunos";

const apiClient = axios.create({
  baseURL: API_URL,
});

export const getAlunos = async () => {
  const response = await apiClient.get("http://localhost:3001/alunos");
  return response.data;
};

export const createAluno = async (alunoData) => {
  const response = await apiClient.post("/", alunoData);
  return response.data;
};

export const getAlunoById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar aluno com id ${id}:`, error);
    throw error;
  }
};

export const updateAluno = async (id, alunoData) => {
  try {
    const response = await apiClient.put(`/${id}`, alunoData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar aluno com id ${id}:`, error);
    throw error;
  }
};

export const deleteAluno = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar aluno com id ${id}:`, error);
    throw error;
  }
};

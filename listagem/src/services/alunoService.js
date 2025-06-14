// Exemplo: src/services/alunoService.js
import axios from "axios";

// A URL da sua mock API
const API_URL = "http://localhost:3001/alunos";

const apiClient = axios.create({
  baseURL: API_URL,
});

export const getAlunos = async () => {
  // Pede para a API ordenar os resultados pelo campo 'id' em ordem ascendente ('asc')
  const response = await apiClient.get("http://localhost:3001/alunos"); // <<<---- MUDANÇA AQUI
  return response.data;
};

export const createAluno = async (alunoData) => {
  const response = await apiClient.post("/", alunoData);
  return response.data;
};

// Você pode adicionar as funções de update e delete aqui também.
// O json-server automaticamente entende PUT, PATCH e DELETE.
// Ex: apiClient.put(`/${id}`, data), apiClient.delete(`/${id}`)

// --- FUNÇÕES NOVAS ---

/**
 * Busca um único aluno pelo seu ID.
 */
export const getAlunoById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar aluno com id ${id}:`, error);
    throw error;
  }
};

/**
 * Atualiza os dados de um aluno.
 */
export const updateAluno = async (id, alunoData) => {
  try {
    const response = await apiClient.put(`/${id}`, alunoData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar aluno com id ${id}:`, error);
    throw error;
  }
};

/**
 * Deleta um aluno.
 */
export const deleteAluno = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar aluno com id ${id}:`, error);
    throw error;
  }
};

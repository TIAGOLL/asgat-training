import api from './api';

export const criarTreino = async (treino) => {
  const response = await api.post('/criarTreino', treino);
  return response.data;
};

export const buscarTreinos = async () => {
  const response = await api.get('/buscarTreinos');
  return response.data;
};

export const buscarTreino = async (treinoId) => {
  const response = await api.get('/buscarTreino', treinoId);
  return response.data;
};

export const atualizarTreino = async (aluno) => {
  const response = await api.post('/atualizarTreino', aluno);
  return response.data;
};

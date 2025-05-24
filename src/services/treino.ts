import api from './api';

export const criarTreino = async (treino) => {
  const response = await api.post('/criarTreino', treino);
  console.log(response.data);
  return response.data;
};

export const buscarTreinos = async () => {
  const response = await api.get('/buscarTreinos');
  console.log(response.data);
  return response.data;
};

export const buscarTreino = async (treinoId) => {
  const response = await api.get('/buscarTreino', treinoId);
  console.log(response.data);
  return response.data;
};

export const atualizarTreino = async (aluno) => {
  const response = await api.post('/atualizarTreino', aluno);
  console.log(response.data);
  return response.data;
};

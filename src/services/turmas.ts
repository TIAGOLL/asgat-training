import api from './api';

export const criarTurma = async (turma) => {
  const response = await api.post('/criarTurma', turma);
  return response.data;
};

export const buscarTurmas = async () => {
  const response = await api.get('/buscarTurmas');
  return response.data;
};

export const buscarTurma = async (turmaId) => {
  const response = await api.get('/buscarTurma', turmaId);
  return response.data;
};

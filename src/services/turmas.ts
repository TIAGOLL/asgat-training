import api from './api';

export const criarTurma = async (turma) => {
  const response = await api.post('/criarTurma', turma);
  return response.data;
};

export const buscarTurmas = async () => {
  const response = await api.get('/buscarTurmas');
  return response.data;
};

export const buscarTurma = async (turma_id) => {
  const response = await api.get('/buscarTurma?turma_id=' + turma_id);
  return response.data;
};

export const atualizarTurma = async (turma) => {
 const response = await api.post('/atualizarTurma', turma);
};

import api from './api';

export const criarAula = async (aula) => {
  const response = await api.post('/criarAula', aula);
  return response.data;
};

export const finalizarAula = async (aula) => {
  const response = await api.post('/finalizarAula', aula);
  return response.data;
};

export const buscarAulas = async (mes) => {
  const response = await api.get('/buscarAulas?mes=' + mes);
  return response.data;
};

export const buscarAula = async (id) => {
  const response = await api.get('/buscarAula?aula_id=' + id);
  return response.data;
};

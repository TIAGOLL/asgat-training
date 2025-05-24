import api from './api';

export const criarAula = async (aula) => {
  const response = await api.post('/criarAula', aula);

  const token = response.data;
  console.log('\n \n token: ' + token + '\n \n');
  localStorage.setItem('token', token);

  return response.data;
};

export const finalizarAula = async (aula) => {
  const response = await api.post('/finalizarAula', aula);

  const token = response.data;
  console.log('\n \n token: ' + token + '\n \n');
  localStorage.setItem('token', token);

  return response.data;
};

export const buscarAulas = async (mes) => {
  const response = await api.get('/buscarAulas?mes=' + mes);
  console.log(response.data);
  return response.data;
};

export const buscarAula = async (id) => {
  const response = await api.get('/buscarAula?aula_id=' + id);
  console.log(response.data);
  return response.data;
};

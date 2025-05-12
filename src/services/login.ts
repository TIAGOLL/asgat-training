import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/loginToken', credentials);

  const token = response.data;
  console.log('\n \n token: ' + token + '\n \n');
  localStorage.setItem('token', token);

  return response.data;
};

export const getUsuario = async () => {
  const response = await api.get('/user');
  return response.data;
};

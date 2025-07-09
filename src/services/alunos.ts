import api from './api';

export const criarAluno = async (aluno) => {
  const response = await api.post('/criarAlunos', aluno);
  return response.data;
};

export const atualizarAluno = async (aluno) => {
  const response = await api.post('/atualizarAluno', { aluno });
  return response.data;
};

export const buscarAlunos = async () => {
  const response = await api.get('/buscarAlunos');
  return response.data;
};

export const buscarAluno = async (alunoId) => {
  const response = await api.get('/buscarAluno', alunoId);
  return response.data;
};

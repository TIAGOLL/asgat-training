import api from './api';

export const criarAluno =  async (aluno) => {
    const response = await api.post('/criarAlunos', aluno);
    console.log(response.data);
    return response.data;
}


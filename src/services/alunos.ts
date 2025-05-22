import api from './api';

export const criarAluno = async (aluno) => {
    const response = await api.post('/criarAlunos', aluno);
    console.log(response.data);
    return response.data;
}

export const atualizarAluno = async (aluno) => {
    const response = await api.post('/atualizarAluno', aluno);
    console.log(response.data);
    return response.data;
}

export const buscarAlunos = async () => {
    const response = await api.get('/buscarAlunos');
    console.log(response.data);
    return response.data;
}

export const buscarAluno = async (alunoId) => {
    const response = await api.get('/buscarAluno',alunoId);
    console.log(response.data);
    return response.data;
}


import api from './api';

export const criarTurma = async (turma) => {
    const response = await api.post('/criarTurma', turma);
    console.log(response.data);
    return response.data;
}

export const buscarTurmas = async () => {
    const response = await api.get('/buscarTurmas');
    console.log(response.data);
    return response.data;
}

export const buscarTurma = async (turmaId) => {
    const response = await api.get('/buscarTurma',turmaId);
    console.log(response.data);
    return response.data;
}

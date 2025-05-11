import api from './api';

export const login = async (credentials) => {
    const response = await api.post('/api/loginToken',credentials);

    const {token} = response.data;
    console.log(token);
    localStorage.setItem('token',token);
    
    return response.data;
}

export const getUsuario = async () => {
    const response = await api.get('/api/user');
    return response.data;
}
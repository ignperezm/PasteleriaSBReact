import axios from 'axios';

const API_URL = "http://localhost:8011";

const apiClient = axios.create({
    baseURL: API_URL
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// --- AUTH & USUARIOS ---
export const login = async (credentials) => {
    const response = await apiClient.post(`/auth/login`, credentials);
    return response.data;
};
export const register = async (userData) => {
    const response = await apiClient.post(`/auth/register`, userData);
    return response.data;
};
export const getUsuarios = async () => {
    const response = await apiClient.get(`/usuarios/all`);
    return response.data;
}
export const deleteUsuario = async (id) => {
    const response = await apiClient.delete(`/usuarios/delete/${id}`);
    return response.data;
}
export const updateUsuario = async (id, userData) => {
    const response = await apiClient.put(`/usuarios/update/${id}`, userData);
    return response.data;
}

// --- PRODUCTOS ---
export const getProductos = async () => {
    const response = await apiClient.get(`/productos/all`);
    return response.data;
};
export const getProductoById = async (id) => {
    const response = await apiClient.get(`/productos/${id}`);
    return response.data;
};
export const saveProducto = async (producto) => {
    const response = await apiClient.post(`/productos/save`, producto);
    return response.data;
};
export const deleteProducto = async (id) => {
    const response = await apiClient.delete(`/productos/delete/${id}`);
    return response.data;
};
export const updateProducto = async (id, producto) => {
    const response = await apiClient.put(`/productos/update/${id}`, producto);
    return response.data;
};

// --- COMPRA ---
export const guardarBoleta = async (boleta) => {
    const response = await apiClient.post('/boletas/save', boleta);
    return response.data;
};
export const guardarDetalleBoleta = async (detalle) => {
    //la ruta correcta es /detalles-boletas/save
    const response = await apiClient.post('/detalles-boletas/save', detalle);
    return response.data;
};

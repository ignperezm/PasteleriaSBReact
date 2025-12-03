import axios from 'axios';

const API_URL = "http://localhost:8011";

const apiClient = axios.create({
    baseURL: API_URL
});

//envia el token en cada peticion
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const login = async (credentials) => {
    const response = await apiClient.post(`/auth/login`, credentials);
    return response.data;
};

export const getProductos = async () => {
    const response = await apiClient.get(`/productos/all`);
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

import axios from 'axios'

const API_URL = "http://localhost:8011"


export const getProductos = async () => {
    const response = await axios.get(`${API_URL}/productos/all`)
    return response.data
}

export const saveProducto = async (producto) => {
    const response = await axios.post(`${API_URL}/productos/save`, producto)
    return response.data
}

export const deleteProducto = async (id) => {
    const response = await axios.delete(`${API_URL}/productos/delete/${id}`)
    return response.data
}

export const updateProducto = async (id, producto) => {
    const response = await axios.put(`${API_URL}/productos/update/${id}`, producto)
    return response.data
}
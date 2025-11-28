import axios from 'axios'

const API_URL="http://localhost:8011/api"

// definir las funciones a utilizar
export const getPersonas = async()=>{
    const response = await axios.get(`${API_URL}/personas/all`)
    return response.data
}

export const savePersona = async (persona)=>{
    const response = await axios.post(`${API_URL}/personas/save`,persona)
    return response.data
}

export const deletePersona = async (id)=>{
    const response = await axios.delete(`${API_URL}/personas/delete/${id}`)
    return response.data
}

export const updatePersona = async (id,persona)=>{
    const response = await axios.put(`${API_URL}/personas/update/${id}`,persona)
    return response.data
}
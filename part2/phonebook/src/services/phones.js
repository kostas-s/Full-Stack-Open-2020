import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

export const createPerson = (newEntry) => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(request => request.data)
}

export const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(request => request.data)
}

export const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(request => request.data)
}

export const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(request => request.data)
}
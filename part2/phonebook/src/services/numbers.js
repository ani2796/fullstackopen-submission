import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const add = (newObject) => {
    const request = axios.post(`${baseUrl}`, newObject);
    return request.then(response => response.data);
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    console.log("Deleted person's response");
    return request;
}

const exportedObject = { getAll, add, remove }

export default exportedObject;
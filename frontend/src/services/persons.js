import axios from "axios";
//const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.status);
};

const updatePerson = (id, newData) => {
    const request = axios.put(`${baseUrl}/${id}`, newData)
    return request.then(response => response.data)
  }
  

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson
};
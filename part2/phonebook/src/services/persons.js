import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (id) => {
  return axios.delete(baseUrl.concat("/", id));
};

const changeNumber = (id, changedPerson) => {
  return axios.put(baseUrl.concat("/", id), changedPerson);
};

export default { getAll, addPerson, deletePerson, changeNumber };

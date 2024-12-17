import axios from "axios";
// const baseUrl = "/api/persons";
const baseUrl = "http://localhost:3001/api/persons";

const processError = (error) => {
  return {
    name: error.response?.data?.name || "UnknownError",
    message:
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred",
    id: error.response?.data?.existingPersonID || null,
  };
};

const getPersons = () => {
  return axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((error) => {
      throw processError(error);
    });
};

const addPerson = (personObj) => {
  return axios
    .post(baseUrl, personObj)
    .then((res) => res.data)
    .catch((error) => {
      throw processError(error);
    });
};

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => res)
    .catch((error) => {
      throw processError(error);
    });
};

const updatePerson = (id, personObj) => {
  console.log(personObj);
  return axios
    .put(`${baseUrl}/${id}`, personObj)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      throw processError(error);
    });
};

export default {
  getPersons,
  addPerson,
  deletePerson,
  updatePerson,
};

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getPersons = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

const addPerson = async (personObj) => {
  try {
    const response = await axios.post(baseUrl, personObj);
    return response.data;
  } catch (error) {
    console.log("Error adding data", error);
  }
};

const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Person has already deleted", error);
  }
};

const updatePerson = async (id, personObj) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, personObj);
    return response.data;
  } catch (error) {
    console.log("Error updating data", error);
  }
};

export default {
  getPersons,
  addPerson,
  deletePerson,
  updatePerson,
};

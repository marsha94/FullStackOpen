import axios from "axios";
const baseUrl = "https://phonebook-backend-yhcz.onrender.com/api/persons";

const getPersons = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};

const addPerson = async (personObj) => {
  try {
    const response = await axios.post(baseUrl, personObj);
    return response.data;
  } catch (error) {
    console.log("Error adding person", error);
    throw error;
  }
};

const deletePerson = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.log("Error deleting person", error);
    throw error;
  }
};

const updatePerson = async (id, personObj) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, personObj);
    return response.data;
  } catch (error) {
    console.log("Error updating person", error);
    throw error;
  }
};

export default {
  getPersons,
  addPerson,
  deletePerson,
  updatePerson,
};

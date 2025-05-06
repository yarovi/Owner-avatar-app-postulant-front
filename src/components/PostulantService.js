import axios from "axios";

const API_URL = "http://localhost:8080/api/postulants";

export const getAllPostulants = () => axios.get(API_URL);
export const getPostulant = (id) => axios.get(`${API_URL}/${id}`);
export const createPostulant = (data) => axios.post(API_URL, data);
export const updatePostulant = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deletePostulant = (id) => axios.delete(`${API_URL}/${id}`);

import axios from "axios";

const API_URL = "http://localhost:8082/api/reading";

const readingService = {
  getAll: () => axios.get(`${API_URL}/list`, { withCredentials: true }),
  getById: (id) => axios.get(`${API_URL}/${id}`, { withCredentials: true }),
  create: (formData) =>
    axios.post(`${API_URL}/upload`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    axios.put(`${API_URL}/update/${id}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) =>
    axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true }),
};

export default readingService;

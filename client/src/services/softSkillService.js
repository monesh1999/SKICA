// softSkillService.js
import axios from "axios";

const API_URL = "http://localhost:8082/api/softskills";

const softSkillService = {
  getAll: () => axios.get(API_URL, { withCredentials: true }),
  getById: (id) => axios.get(`${API_URL}/${id}`, { withCredentials: true }),
  create: (formData) =>
    axios.post(API_URL, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }),
  update: (id, formData) =>
    axios.put(`${API_URL}/${id}`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }),
  remove: (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true }),
};

export default softSkillService;

import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const getMoms = () => {
  return axios.get(`${baseURL}/moms`);
};

export const deleteMom = (id) => {
  return axios.delete(`${baseURL}/moms/${id}`);
};

export const getMomById = (id) => {
  return axios.get(`${baseURL}/moms/${id}`);
};

export const createOrUpdateMom = (data) => {
  if (data.id) {
    return axios.put(`${baseURL}/moms/${data.id}`, data);
  } else {
    return axios.post(`${baseURL}/moms`, data);
  }
};

export const getBabies = () => {
  return axios.get(`${baseURL}/babies`);
};

export const deleteBaby = (id) => {
  return axios.delete(`${baseURL}/babies/${id}`);
};

export const getMomsList = () => {
  return axios.get(`${baseURL}/moms`);
};

export const getBabyById = (id) => {
  return axios.get(`${baseURL}/babies/${id}`);
};

export const createOrUpdateBaby = (data) => {
  if (data.id) {
    return axios.put(`${baseURL}/babies/${data.id}`, data);
  } else {
    return axios.post(`${baseURL}/babies`, data);
  }
};

export const getAnalysisData = (year, month) => {
  return axios.get(`${baseURL}/analysis?year=${year}&month=${month}`);
};

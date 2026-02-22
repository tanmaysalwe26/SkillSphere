import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstant";
import { getToken } from "./TokenService";

function authHeader() {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function getAdminStats() {
  return axios.get(`${API_BASE_URL}/admin/stats`, authHeader());
}

export function getAllUsers() {
  return axios.get(`${API_BASE_URL}/admin/users`, authHeader());
}

export function getAllCoursesAdmin() {
  return axios.get(`${API_BASE_URL}/admin/courses`, authHeader());
}

export function getAllUserEnrollments(){
    return axios.get(`${API_BASE_URL}/admin/enrollments`, authHeader());
}

export function deleteUser(id) {
  return axios.delete(`${API_BASE_URL}/admin/user/${id}`, authHeader());
}

export function deleteCourse(id) {
  return axios.delete(`${API_BASE_URL}/admin/course/${id}`, authHeader());
}



import { API_BASE_URL } from '../constants/APIConstant';
import { getToken } from './TokenService';
import axios from 'axios';

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function getCourses() {
    return axios.get(`${API_BASE_URL}/courses`,getAuthHeader());
}

export async function addcourse(formData) {
    return axios.post(`${API_BASE_URL}/addcourse`,formData,getAuthHeader());
}

export async function updateCourse(id, formData) {
    return axios.put(`${API_BASE_URL}/course/${id}`,formData,getAuthHeader());
}

export async function getCoursebyID(id) {
    return axios.get(`${API_BASE_URL}/course/${id}`,getAuthHeader());
}

export async function getCourseByInstructor() {
    return axios.get(`${API_BASE_URL}/instructor`,getAuthHeader());
}

export async function deleteCourse(id) {
    return axios.delete(`${API_BASE_URL}/course/instructor/${id}`,getAuthHeader());
}


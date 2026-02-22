import axios from "axios"
import { API_BASE_URL } from "../constants/APIConstant";
import { getAuthHeader } from "./courseService";

export const enrollCourse = async (courseId) =>{
    return  axios.get(`${API_BASE_URL}/enroll/${courseId}`,getAuthHeader());
}

export const unenrollCourse = async (courseId) =>{
    return axios.delete(`${API_BASE_URL}/enroll/${courseId}`,getAuthHeader());
}

export const getMyEnrollments = async () =>{
    return axios.get(`${API_BASE_URL}/enrollments`,getAuthHeader());
}
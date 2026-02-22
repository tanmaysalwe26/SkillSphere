import axios from 'axios';
import { API_BASE_URL } from '../constants/APIConstant';

export function login(formData){
    return axios.post(`${API_BASE_URL}/login`,formData)
}

export function register(formData){
    return axios.post(`${API_BASE_URL}/register`,formData)
}

export function storeUser(userValue){
    localStorage.setItem("user",userValue);
}

export function getUser(){
    return localStorage.getItem("user");
}

export function removeUser(){
    localStorage.removeUser("user");
}
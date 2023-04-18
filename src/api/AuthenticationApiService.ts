import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
    // baseURL: 'http://taskplanner-env-1.eba-2rk7cppb.us-east-1.elasticbeanstalk.com'
})

export const loginApiService = 
    (email:string, password: string) => apiClient.post(`/api/v1/auth/authenticate`,{email, password});

export const signUpApiService = 
    (firstName: string,lastName:string, email:string, password: string) => apiClient.post(`/api/v1/auth/register`,
    {firstName, lastName, email, password});

export const logoutApiService = 
    () => apiClient.get(`/api/v1/auth/logout`);
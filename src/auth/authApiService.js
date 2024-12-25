import { apiClient } from "../api/apiClient"

//회원가입 o
export const createAccount = (data) => {
    return apiClient.post(`/auth/signup`, data)
}

//아이디 중복검사 o
export const checkDupId = (userId)=> {
    return apiClient.get(`/auth/signup/check/${userId}`
)}
 
//로그인 
export const onLogin = (data) => {
    return apiClient.post(`/auth/login`, data)
}

//로그아웃
export const onLogout = () => {
    return apiClient.post(`/auth/logout`)
}

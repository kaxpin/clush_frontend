import axios from "axios"

const url = 'http://localhost:8080'; 
// const url = 'http://localhost:8081';

export const apiClient = axios.create(
    {
        baseURL: url
    }
)
const username = '123';
const password = '123';

apiClient.interceptors.request.use(
    (config) => {
        const basicToken = btoa(`${username}:${password}`) 
        console.log('interception and adding a token')
        config.headers.Authorization = `Basic ${basicToken}`
        console.log(`Basic ${basicToken}`);
        return config
})


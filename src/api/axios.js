import axios from "axios";

const instance = axios.create({
    baseURL: 'https://toolbox-sigma-black.vercel.app/api',
    withCredentials: true 
})

export default instance;
// https://toolbox-sigma-black.vercel.app/api
// http://localhost:4000/api
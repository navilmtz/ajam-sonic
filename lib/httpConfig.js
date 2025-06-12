import axios from "axios";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    header : {'ContentType': 'application/json'}
})

export default http;

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


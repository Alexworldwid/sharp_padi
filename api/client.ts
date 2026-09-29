import { getToken } from "./auth";

const BASE_URL = "http://192.168.0.163:3000";


export const api = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "content-type": "application/json",
            ...(token && { 
                Authorization: `Bearer ${token}` 
            }),
            ...options.headers
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
    }

    return data;
}
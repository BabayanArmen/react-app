import axios from "axios";

export function getRequest(url: string, params: any) {
    return axios.get(url, {params})
} 
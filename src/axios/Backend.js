import axios from "axios";

const BASEURL = 'http://api.alphaorderly.com:8080/api/'

export default axios.create({
    baseURL: BASEURL,
    headers: {
        "Content-Type": "application/json",
    }
})


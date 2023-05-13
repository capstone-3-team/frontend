import axios from "axios";

const BASEURL = 'http://api.quickthink.online:8080/api/'

export default axios.create({
    baseURL: BASEURL,
    headers: {
        "Content-Type": "application/json",
    }
})


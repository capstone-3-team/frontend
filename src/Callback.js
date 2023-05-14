import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Callback = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const code = location.search.replace("?code=", "");
    code.replace("&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=none", "")

    return (
        <p>{code}</p>
    )

}

export default Callback;


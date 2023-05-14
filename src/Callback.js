import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from "query-string"

const Callback = () => {

    const navigate = useNavigate();

    const { search } = useLocation();

    let { code } = queryString.parse(search);

    return (
        <p>{code}</p>
    )

}

export default Callback;


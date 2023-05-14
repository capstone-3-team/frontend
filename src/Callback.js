import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Callback = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const code = location.search.replace("?code=", "");

    return (
        <p>{code}</p>
    )

}

export default Callback;


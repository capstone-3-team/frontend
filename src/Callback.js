import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Callback = () => {

    const navigate = useNavigate();

    const params = useParams();

    let code = params.search.replace("?code=", "");

    console.log(code);

    return (
        <p>callback</p>
    )

}

export default Callback;


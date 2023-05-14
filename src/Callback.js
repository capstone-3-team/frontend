import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Callback = () => {

    const navigate = useNavigate();

    const params = useParams();

    console.log(params);

    return (
        <p>callback</p>
    )

}

export default Callback;


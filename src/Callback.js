import React from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {

    const navigate = useNavigate();

    const params = useParams();

    console.log(params);

    return (
        <p>callback</p>
    )

}


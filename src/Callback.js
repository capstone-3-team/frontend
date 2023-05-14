import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from "query-string"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { client_id, client_secret, redirect_url, resource_uri, token_uri } from './Const'

const Callback = () => {

    const navigate = useNavigate();

    const { search } = useLocation();

    let { code } = queryString.parse(search);

    const [show, setShow] = useState(null);

    const process = async () => {
        let tokenData = await axios(
            token_uri,
            {
                method: 'POST',
                params: {
                    code: code,
                    client_id: client_id,
                    client_secret : client_secret,
                    redirect_uri: redirect_url,
                    grant_type: "authorization_code"
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        )
        tokenData = tokenData.data;
        
        let accessToken = tokenData.access_token;

        let userData = await axios(
            resource_uri,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            }
        )

        userData = userData.data;

        let finalData = {
            token: accessToken,
            googleName: userData.name,
            googleId: userData.id,
            profilePicture: userData.picture,
        }

        console.log(finalData);
    }

    useEffect(
        () => {
            process();
        }, []
    )

    return (
        <div>
        
        </div>
    )

}

export default Callback;


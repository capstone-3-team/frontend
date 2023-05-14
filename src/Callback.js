import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from "query-string"
import { useEffect } from 'react';

const Callback = () => {

    const client_id = "124283716814-jgmcllojhr4728ifsqbrphc6i972qvov.apps.googleusercontent.com";
    const client_secret = "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";
    const redirect_url = "https://quickthink.online/callback";
    const token_uri = "https://quickthink.online/callback";
    const recource_uri = "https://quickthink.online/callback";

    const navigate = useNavigate();

    const { search } = useLocation();

    let { code } = queryString.parse(search);

    const [show, setShow] = useState(null);

    const process = async () => {
        const tokenData = await fetch(
            token_uri,
            {
                method: 'POST',
                params: {
                    code: code,
                    client_id: client_id,
                    client_secret : client_secret,
                    redirect_url: redirect_url,
                    grant_type: "authorization_code"
                }
            }
        )
    }

    useEffect(
        () => {
            process();
        }, []
    )

    return (
        <div>
            {show}
        </div>
    )

}

export default Callback;


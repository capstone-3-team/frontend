/**
 * 
 * 프로필 수정 화면입니다.
 * 
 */

import { Close } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from '../../state/User';

import Styles from './Profile.module.css';

const Profile = () => {

    const [user, setUser] = useRecoilState(User);

    const navigate = useNavigate();

    const [profileText, setProfileText] = useState("");

    const inputRef = useRef(null);

    // Firebase로부터 프로필 텍스트 가져오기
    const fetchData = async () => {
        const data = await (await fetch('https://software-engineering-3team-default-rtdb.firebaseio.com/profile.json', { method: 'GET' })).json();
        setProfileText(data.profileText);
    }

    // Firebase에 새로운 프로필 텍스트 저장하기
    const updateData = async () => {
        await fetch('https://software-engineering-3team-default-rtdb.firebaseio.com/profile.json', { method: 'PUT', body: JSON.stringify({ profileText: inputRef.current.value }) });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={Styles.backdrop}>
            <div className={Styles.profileDiv}>
                <div className={Styles.topProfile}>
                    <div className={Styles.topProfileDetail}>
                        <img src={user.profilePicture} className={Styles.topProfilePicture} />
                        <p className={Styles.topProfileName}>{user.googleName}</p>
                    </div>
                    <Close className={Styles.topProfileClose} onClick={() => { navigate('./main') }} />
                </div>
                <textarea
                    defaultValue={profileText}
                    ref={inputRef}
                    cols={100}
                    rows={5}
                    className={Styles.profileText}
                />
                <div className={Styles.bottomProfileDiv}>
                    <div className={Styles.bottomProfileButtonLogout} onClick={() => {alert("이론상 로그아웃"); navigate('/main') }}>
                        <p>로그아웃</p>
                    </div>
                    <div className={Styles.bottomProfileButtonChange} onClick={() => {updateData(); navigate('/main');}}>
                        <p>프로필 문구 수정 완료</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
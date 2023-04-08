import { Close } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from '../../state/User';

import Styles from './Profile.module.css';

const Profile = () => {

    const [user, setUser] = useRecoilState(User);

    const navigate = useNavigate();

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
                    cols={100}
                    rows={5}
                    value={"프로필 텍스트가 들어갈 자리입니다, 프로필 버튼 누를 시 즉시 서버에서 가져오도록 구성할 예정입니다."} 
                    className={Styles.profileText}
                />
                <div className={Styles.bottomProfileDiv}>
                    <div className={Styles.bottomProfileButtonLogout} onClick={() => {alert("이론상 로그아웃");navigate('/main') }}>
                        <p>로그아웃</p>
                    </div>
                    <div className={Styles.bottomProfileButtonChange} onClick={() => {alert("이론상 프로필 정보 수정 완료");navigate('/main') }}>
                        <p>프로필 문구 수정 완료</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
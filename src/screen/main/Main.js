import React, { useState } from 'react';
import Styles from './Main.module.css';
import SearchIcon from '@mui/icons-material/Search';

import Logo from '../../assets/images/logo.png';
import ChatGPT from '../../assets/images/chatgpt.png';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from '../../state/User';

const Main = () => {

    const [search, setSearch] = useState("");

    const [user, setUser] = useRecoilState(User);

    return (
        <div>
            <div className={Styles.topDiv}>
                <Link to="/"><img src={Logo} className={Styles.topLogo}/></Link>
                <div className={Styles.topSearchBar}>
                    <SearchIcon className={Styles.topSearchIcon}/>
                    <input
                        value={search}
                        onChange={
                            (e) => {
                                setSearch(e.target.value);
                            }
                        } 
                        className={Styles.topSearchInput} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                alert(`${search}`);
                                // 검색시 해야할 라우팅이 여기에 들어가게 됩니다.
                            }
                        }}
                    />
                </div>
                <div 
                    className={Styles.topWriteNewCard}
                    onClick={() => {
                        alert("새 카드를 작성합니다.");
                    }}
                >
                <p className={Styles.topWriteNewCardText}>새 카드 작성하기</p>
                </div>
                <div
                    className={Styles.topProfilePictureDiv}
                    onClick={() => {
                        alert("프로필을 수정합니다.");
                    }}
                >
                    <img src={user.profilePicture} className={Styles.topProfilePicture}/>
                    <p className={Styles.topProfilePictureName}>{user.googleName}</p>
                </div>
                <div 
                    className={Styles.topChatGPTDiv}
                    onClick={
                        () => {
                            alert("ChatGPT에게 물어봅니다.");
                        }
                    }
                >
                    <img src={ChatGPT} className={Styles.topChatGPTLogo}/>
                    <p className={Styles.topChatGPTText}>CHATGPT에게 물어보기</p>
                </div>
            </div>
        </div>
    )
}

export default Main;
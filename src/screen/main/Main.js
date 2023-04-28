/**
 * 
 *  메인화면 입니다.
 * 
 */

import React, { useRef, useState } from 'react';
import Styles from './Main.module.css';
import SearchIcon from '@mui/icons-material/Search';

import Logo from '../../assets/images/logo.png';
import { Link, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from '../../state/User';
import {useNavigate} from 'react-router-dom';
import Profile from './Profile';
import CardWriting from './CardWriting';
import MyCards from './MyCards';
import ChatGPT from '../../assets/images/chatgpt.png'
import GPT from './GPT';


const Main = () => {

    const inputRef = useRef(null);

    const [search, setSearch] = useState("");

    const [user, setUser] = useRecoilState(User);

    const navigate = useNavigate();

    return (
        <div>
            <div className={Styles.topDiv}>
                <Link to="/"><img src={Logo} className={Styles.topLogo}/></Link>
                <div className={Styles.topSearchBar}>
                    <SearchIcon className={Styles.topSearchIcon}/>
                    <input
                        ref={inputRef}
                        className={Styles.topSearchInput} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                navigate('/main/search', {replace: true});
                                setSearch(inputRef.current.value);
                            }
                        }}
                    />
                </div>
                <div 
                    className={Styles.topWriteNewCard}
                    onClick={() => {
                        navigate('/main/write', {replace: true})
                    }}
                >
                <p className={Styles.topWriteNewCardText}>새 카드 작성하기</p>
                </div>
                <div
                    className={Styles.topProfilePictureDiv}
                    onClick={() => {
                        navigate('/main/profile', {replace: true})
                    }}
                >
                    <img src={user.profilePicture} className={Styles.topProfilePicture}/>
                    <p className={Styles.topProfilePictureName}>{user.googleName}</p>
                </div>
                <div 
                    className={Styles.topChatGPTDiv}
                    onClick={
                        () => {
                            navigate('/main/chatgpt', {replace: true})
                        }
                    }
                >
                    <img src={ChatGPT} className={Styles.topChatGPTLogo}/>
                    <p className={Styles.topChatGPTText}>CHATGPT에게 물어보기</p>
                </div>
            </div>
                <Routes>
                    <Route
                        exact
                        path=''
                        element={<MyCards />}
                    />
                    <Route
                        exact
                        path='chatgpt'
                        element={<GPT />}
                    />
                    <Route
                        exact
                        path='/profile'
                        element={<Profile />}
                    />
                    <Route
                        exact
                        path='/search'
                        element={<p>{`${search} 를 검색하려 시도 했습니다.`}</p>}
                    />
                    <Route
                        exact
                        path='/write'
                        element={<CardWriting />}
                    />
                    <Route
                        exact
                        path='/correction/:id'
                        element={<p>자신의 카드를 수정합니다</p>}
                    />
                    <Route
                        exact
                        path='/card/:id'
                        element={<p>내 카드 혹은 다른사람 카드 읽기</p>}
                    />
                    <Route
                        exact
                        path='/card/user/:userId'
                        element={<p>다른사람 카드 목록</p>}
                    />
                </Routes>
        </div>
    )
}

export default Main;
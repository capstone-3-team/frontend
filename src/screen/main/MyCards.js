import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import Styles from './MyCards.module.css';
import Card from '../../components/Card';
import Backend from '../../axios/Backend';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import User from '../../state/User';
import { SentimentDissatisfied } from '@mui/icons-material';

const MyCards = () => {

    const [cards, setCards] = useState([]);
    const user = useRecoilValue(User);
    const [isLoading, setLoading] = useState(true);
    
    const [hashTags, setHashTags] = useState([]);
    const [render, setRender] = useState(false);

    const resetUser = useResetRecoilState(User);

    const fetchNewCard = async () => {

        let hash = [];
        for(const hashTag of hashTags) {
            if(hashTag.chosen == true) {
                hash.push(hashTag.value);
            }
        }
    
        let data = await Backend("card", {
                method: 'POST', 
                headers: { 
                    accessToken: user.token 
                }, 
                params: { 
                    googleId: user.googleId 
                },
                data: JSON.stringify({
                    hashTags: hash,
                })
            }
        ).catch(err => {
            if(err.response.status == 401) resetUser();
        });

        data = data.data;
        const writings = []
        for(const d of data.cards) {
            writings.push(d)
        }

        setCards(writings)
        setLoading(false);
    }

    
    const fetchCards = async () => {
        let hashTags = await Backend(
            'hashtags',
            {
                method: "GET",
                headers: { 
                    accessToken: user.token 
                }, 
                params: { 
                    googleId: user.googleId 
                },
            }
        ).catch(err => {
            if(err.response.status == 401) resetUser();
        })

        hashTags = hashTags.data.hashTags;
        let hashTagList = [];
        for(const hashTag of hashTags) {
            hashTagList.push({
                value: hashTag,
                chosen: false,
            })
        }
        setHashTags(hashTagList);

        let data = await Backend("card", {
                    method: 'POST', 
                    headers: { 
                        accessToken: user.token 
                    }, 
                    params: { 
                        googleId: user.googleId 
                    },
                    data: JSON.stringify({
                        hashTags: [],
                    })
                }
            ).catch(err => {
                if(err.response.status == 401) resetUser();
            });

        data = data.data;
        const writings = []
        for(const d of data.cards) {
            writings.push(d)
        }

        setCards(writings)
        setLoading(false);
    }

    useEffect(
        () => {
            fetchCards();
        }
    , []);

    if(isLoading) {
        return (
            <div className={Styles.spinnerDiv}>
                <TailSpin
                    height="40"
                    width="40"
                    color="black"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    style={{ whiteSpace: 'pre-wrap' }}
                    visible={true}
                />
            </div>
        )
    }

    if(cards.length == 0) {
        return (
            <div className={Styles.emptyDiv}>
                <SentimentDissatisfied className={Styles.emptyText} />
                <p className={Styles.emptyText}>카드가 없습니다. 우 상단 작성 버튼으로 새로운 카드를 작성해주세요</p>
            </div>
        )
    }

    return (
        <div className={Styles.mainDiv}>
            <div className={Styles.hashtagsDiv}>
                {
                    hashTags.map((item) => {
                        if(item.chosen) {
                            return (<div style={{cursor: 'pointer'}} key={item.value}  onClick={() => {
                                        setHashTags(
                                            (prev) => {
                                                let p = prev;
                                                for(var i = 0;i < p.length;i++) {
                                                    if(p[i].value == item.value) {
                                                        p[i].chosen = false
                                                        break
                                                    }
                                                }
                                                fetchNewCard(p);
                                                setRender(prev => !prev);
                                                return p;
                                            }
                                        )
                                    }}>
                                        <p style={{color:'blue'}} key={item.value} className={Styles.hashtag}>#{item.value}</p>
                                    </div>
                                    )
                        } else {
                            return (<div style={{cursor: 'pointer'}} key={item.value} onClick={() => {
                                        setHashTags(
                                            (prev) => {
                                                let p = prev;
                                                for(var i = 0;i < p.length;i++) {
                                                    if(p[i].value == item.value) {
                                                        p[i].chosen = true
                                                        break
                                                    }
                                                }
                                                fetchNewCard(p);
                                                setRender(prev => !prev);
                                                return p;
                                            }
                                        )
                                    }}>
                                <p className={Styles.hashtag}>#{item.value}</p>
                            </div>)
                        }
                    })
                }
            </div>
            <div className={Styles.cardsDiv}>
                {
                    cards.map((item) => {
                        return <Card key={item.writtenDate} card={item} style={{width: '280px', margin: '0px 30px 30px 0px'}}/>
                    })
                }
            </div>
        </div>
    )
}

export default MyCards;
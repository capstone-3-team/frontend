import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import User from '../../state/User';
import Backend from '../../axios/Backend';
import Card from '../../components/Card';

import Styles from './OthersCard.module.css';
import { TailSpin } from 'react-loader-spinner';

const OthersCard = () => {

    const {id} = useParams();

    const [person, setPerson] = useState();

    const [cards, setCards] = useState([]);
    const user = useRecoilValue(User);
    const [isLoading, setLoading] = useState(true);

    const [hashTags, setHashTags] = useState([]);
    const [render, setRender] = useState(false);

    const fetchNewCard = async () => {

        let personData = await Backend(
            'person',
            {
                method: "GET",
                headers: { 
                    accessToken: user.token 
                }, 
                params: { 
                    googleId: id,
                },
            }
        )
        let person = personData.data;

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
                    googleId: person.googleId, 
                },
                data: JSON.stringify({
                    hashTags: hash,
                })
            }
        );

        data = data.data;

        const writings = []
        for(const d of data.cards) {
            writings.push(d)
        }

        setCards(writings)
        setLoading(false);
    }

    const fetchCards = async () => {

        let personData = await Backend(
            'person',
            {
                method: "GET",
                headers: { 
                    accessToken: user.token 
                }, 
                params: { 
                    googleId: id,
                },
            }
        )
        let person = personData.data;

        let hashTags = await Backend(
            'hashtags',
            {
                method: "GET",
                headers: { 
                    accessToken: user.token 
                }, 
                params: { 
                    googleId: person.googleId 
                },
            }
        )

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
                        googleId: person.googleId, 
                    },
                    data: JSON.stringify({
                        hashTags: [],
                    })
                }
            );

        data = data.data;

        const writings = []
        for(const d of data.cards) {
            writings.push(d)
        }

        setCards(writings)
        setLoading(false);
    }

    const fetchPerson = async () => {
        let personData = await Backend(
            'person',
            {
                method: "GET",
                headers: { 
                    accessToken: user.token 
                }, 
                params: { 
                    googleId: id,
                },
            }
        )
        setPerson(personData.data);
    }

    useEffect(
        () => {
            fetchPerson();
            fetchCards();
        }
    , []);

    return (
        <div className={Styles.mainDiv}>
            {
                person
                &&
                <div key={person.googleId} className={Styles.resultDiv}>
                    <div className={Styles.rowDiv}>
                        <img src={person.profilePicture} className={Styles.profileImage}></img>
                        <p className={Styles.name}>{person.googleName}</p>
                    </div>
                    <p className={Styles.profileText}>{person.profileText}</p>
                </div>
            }
            {
                isLoading
                ?
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
                :
                <div className={Styles.cardDiv}>
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
            }
        </div>
    )
}

export default OthersCard

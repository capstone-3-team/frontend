import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import Styles from './MyCards.module.css';
import Card from '../../components/Card';
import { useSearchParams } from 'react-router-dom';

const MyCards = () => {

    const [cards, setCards] = useState([]);

    const fetchCards = async () => {
        const data = await (await fetch("https://software-engineering-3team-default-rtdb.firebaseio.com/cards.json", {method: 'GET'})).json();
        const writings = []
        for(const d in data) {
            writings.push(data[d])
        }
        setCards(writings)
    }

    useEffect(
        () => {
            fetchCards();
        }
    , []);

    if(cards.length === 0) {
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

    return (
        <div className={Styles.mainDiv}>
            <div className={Styles.hashtagsDiv}>
                <p className={Styles.hashtag}>#해시태그</p>
            </div>
            <div className={Styles.cardsDiv}>
                {
                    cards.map((item) => {
                        return <Card key={item.writtenDate.toString()} card={item} style={{width: '280px', margin: '0px 30px 30px 0px'}}/>
                    })
                }
            </div>
        </div>
    )
}

export default MyCards;
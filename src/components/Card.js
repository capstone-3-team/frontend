import { Circle } from '@mui/icons-material';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import Styles from './Card.module.css';

const Card = (props) => {

    console.log(props.card);

    const card = props.card;

    return (
        <div 
            style={{
                ...props.style,
            }}
            className={Styles.cardDiv}
        >
            <div className={Styles.titleDiv}>
                <p>{card.title}</p>
                <Circle />
            </div>
            <div className={Styles.articleDiv}>
                <MDEditor.Markdown source={card.content} style={{ whiteSpace: 'pre-wrap' }}  />
            </div>
            <div className={Styles.hashtagsDiv}>
                {
                    card.hashTags.map(
                        item => {
                            return <p className={Styles.hashtag}>#{item}</p>
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Card;
import { Circle } from '@mui/icons-material';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import Styles from './Card.module.css';

const Card = (props) => {

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
                <MDEditor.Markdown source={card.content} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }}  />
            </div>
            <div className={Styles.hashtagsDiv}>
                {
                    card.hashTags.map(
                        item => {
                            return <p key={item} className={Styles.hashtag}>#{item}</p>
                        }
                    )
                }
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Card;
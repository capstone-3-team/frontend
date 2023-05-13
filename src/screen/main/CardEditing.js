import { Add, Close } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Styles from './CardEditing.module.css';

import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { getCodeString } from 'rehype-rewrite';
import katex from 'katex';

import User from '../../state/User';
import { useRecoilValue } from 'recoil';

import Backend from '../../axios/Backend';
import { useEffect } from 'react';


const CardEditing = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [value, setValue] = useState("");

    const [tip, setTip] = useState(false);

    const [hashtags, setHashtags] = useState([]);

    const [adding, setAdding] = useState(false);

    const user = useRecoilValue(User);

    const newHashtagRef = useRef(null);

    const titleRef = useRef(null);

    const { id } = useParams()

    useEffect(() => {
        fetchCard();
    }, [])

    const fetchCard = async () => {
        let data = await Backend('card/single',{
            method: "GET",
            headers: {
                accessToken: user.token,
            },
            params: {
                cardId: id
            }
        });
        data = data.data;
        
        setTitle(data.title);
        setValue(data.content);
        setHashtags(data.hashTags);

    }

    const putCard = async () => {

        console.log(hashtags);

        const cardData = {
            title: titleRef.current.value,
            content: value,
            hashTags: hashtags,
            writtenDate: new Date(),
        }

        await Backend('card/edit', {
            method: 'PUT',
            headers: {
                accessToken: user.token,
            },
            params: {
                cardId: id,
            },
            data: JSON.stringify(cardData)
        });
    }

    return (
        <div className={Styles.backdrop}>
            <div className={Styles.writingDiv}>
                <div className={Styles.topDiv}>
                    <input 
                        className={Styles.topTitleInput}
                        size={40}
                        defaultValue={title}
                        ref={titleRef}
                    />
                    <Close 
                        className={Styles.topClose}
                        onClick={() => {
                            navigate('/main', {replace: true})
                        }}
                    />
                </div>
                <div className={Styles.editorDiv}>
                    {
                        !tip
                        ?
                        <div>
                            <p onClick={() => setTip(true)} style={{cursor: 'pointer', color: 'grey'}} className={Styles.katexGuide}>작성 팁 보기</p>
                        </div>
                        :
                        <div>
                            <p onClick={() => setTip(false)} style={{cursor: 'pointer', color: 'grey'}} className={Styles.katexGuide}>작성 팁 가리기</p>
                            <p className={Styles.katexGuide}>수식 입력하기 : `$$수식$$` 자세한 내용은 <a target="_blank" href='https://cheris8.github.io/etc/MD-LaTex/'>이곳</a>을 참조해 주세요.</p>
                            <p className={Styles.katexGuide}>스페이스바 3번 입력으로 줄바꿈을 할수 있습니다.</p>
                        </div>
                    }
                    <MDEditor
                        value={value}
                        onChange={setValue}
                        className={Styles.editor}
                        style={{ whiteSpace: 'pre-wrap' }}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                            components: {
                                code: ({ inline, children = [], className, ...props }) => {
                                  const txt = children[0] || '';
                                  if (inline) {
                                    if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                      const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                        throwOnError: false,
                                        output: 'mathml'
                                      });
                                      return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                    }
                                    return <code>{txt}</code>;
                                  }
                                  const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                                  if (
                                    typeof code === 'string' &&
                                    typeof className === 'string' &&
                                    /^language-katex/.test(className.toLocaleLowerCase())
                                  ) {
                                    const html = katex.renderToString(code, {
                                      throwOnError: false,
                                    });
                                    return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                                  }
                                  return <code className={String(className)}>{txt}</code>;
                                },
                              },
                        }}
                    />
                </div>
            </div>
            <div className={Styles.bottomDiv}>
                <div className={Styles.bottomHashtagsDiv}>
                    <div className={Styles.bottomHashtagIcon}>
                        <span className={Styles.bottomHashtagIconText}>#</span>
                    </div>
                    <div className={Styles.bottomHashtagItemDiv}>
                        {
                            hashtags.map(
                                (item, index) => {
                                    return (
                                        <div 
                                            key={item}
                                            className={Styles.bottomHashtagItem}
                                            onClick={() => {
                                                setHashtags(prev => {
                                                    const revised = prev.filter(hashtag => prev[prev.indexOf(item)] !== hashtag);
                                                    return revised
                                                })
                                            }}
                                        >
                                            #{item}
                                        </div>
                                    )
                                }
                            )
                        }
                        {
                            adding
                            &&
                            <input
                                ref={newHashtagRef}
                                className={Styles.bottomHashtagAdd} 
                                size={10}
                                onKeyDown={(k) => {
                                    if(k.key == "Enter") {
                                        if(hashtags.indexOf(newHashtagRef.current.value) != -1) {
                                            alert("중복되는 해시태그는 작성 불가능합니다.");
                                            newHashtagRef.current.value = "";
                                        } else {
                                            setHashtags(prev => [...prev, newHashtagRef.current.value]);
                                            setAdding(false);
                                        }
                                    }
                                }}
                            />
                        }
                        {
                            adding
                            ?
                            <Close 
                                className={Styles.bottonHashtagAddButton}
                                onClick={() => {
                                    setAdding(false);
                                }}
                            />
                            :
                            <Add 
                                className={Styles.bottonHashtagAddButton}
                                onClick={() => {
                                    setAdding(true);
                                }}
                            />
                        }
                    </div>
                </div>
                <div 
                    className={Styles.bottomCompleteDiv}
                    onClick={() => {
                        if(titleRef.current.value == "" || value == "") {
                            alert('제목과 글은 빈칸이여선 안됩니다.');
                        } else {
                            putCard();
                            navigate('/main', {replace: false});
                        }
                    }}
                >
                    <span>수정 완료</span>
                </div>
            </div>
        </div>
    )
}

export default CardEditing;
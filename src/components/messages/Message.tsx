import React, { FC, useState, useEffect } from 'react'
import './Message.scss'
import { IMessage } from '../../types/IMessage'
import avatar from '../../images/avatar.png'
import like from '../../images/like.png'
import dislike from '../../images/dislike.png'

interface IMessageProps {
    message: IMessage,
}

const Message: FC<IMessageProps> = ({ message }) => {
    const [likes, setLikes] = useState<string[]>([])

    useEffect(() => {
        const locStor = localStorage.getItem("likes")
        if (locStor) {
            const localLikes: string[] = JSON.parse(locStor)
            setLikes(localLikes)
        }
    }, [])

    const addLike = () => {
        let newLikes: string[] = []
        likes.includes(message.id.toString())
            ? newLikes = likes.filter(like => like !== message.id.toString())
            : newLikes = [...likes, message.id.toString()]
        localStorage.setItem("likes", JSON.stringify(newLikes))
        setLikes(newLikes)
    }

    console.log("Message")

    return (
        <div className='message'>
            <div className='message__header'>
                <div className='message__header-box'>
                    <img className='message__header-avatar' src={avatar} />
                    <div className='message__header-title'>
                        <div className='header-author'>{message.author}</div>
                        <div className='header-channel'>{message.channel}</div>
                    </div>
                </div>
                <div>
                    <button className='like-btn' onClick={addLike}>
                        <img src={likes.includes(message.id.toString()) ? like : dislike} />
                    </button>
                </div>
                {/* {likes.includes(message.id.toString()) && (<span>Нравиться</span>)} */}
            </div>
            <div className='message__content'>
                <div className='content-date'>15:15</div>
                <div className='content'>
                    <div className='content-text'>{message.content}</div>
                    <div className='message__media'>
                        {message.attachments.map((media) => (
                            <div key={media.url}>
                                {media.type === "image" && (<img className='media-image' src={media.url} />)}
                                {media.type === "video" && (
                                    <video className='media-video' width="200" controls >
                                        <source src={media.url} type="video/mp4" />
                                    </video>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <span className='teg active-teg'>#Новое</span>
                <span className='teg'>#Эксперт</span>
            </div>

        </div>
    )
}

export default Message
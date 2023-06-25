import React, { FC, useState, useEffect } from 'react'
import './Message.scss'
import { IMessage } from '../../types/IMessage'
import avatar from '../../images/avatar.png'
import like_img from '../../images/like.png'
import dislike from '../../images/dislike.png'

interface IMessageProps {
    message: IMessage,
    like: boolean,
    onClick: (id: number) => void
}

const Message: FC<IMessageProps> = ({ message, like, onClick }) => {
    const [date, setDate] = useState(new Date(message.date))
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
                    <button className='like-btn' onClick={() => onClick(message.id)}>
                        <img src={like ? like_img : dislike}/>
                    </button>
                </div>
            </div>
            <div className='message__content'>
                <div className='content-date'>{date.getHours() + ":" + date.getMinutes()}</div>
                <div className='content'>
                    <div className='content-text'>{message.content}</div>
                    <div className='message__media'>
                        {message.attachments.map((media) => (
                            <div key={media.url}>
                                {media.type === "image" && (<img className='media-image' key={message.id + message.idSys + media.url} src={media.url} />)}
                                {media.type === "video" && (
                                    <video key={message.id + message.idSys + media.url} className='media-video' width="200" controls >
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
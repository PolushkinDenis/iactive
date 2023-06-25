import React, { FC, useEffect, useState } from 'react'
import './MessagesList.scss'
import Message from '../messages/Message'
import { IMessage } from '../../types/IMessage'
import { fetchMessages, fetchNewMessages, fetchOldMessages } from '../../store/messages/messagesAction'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { sorting } from '../../helpers/sorting'

interface MessagesListProps {
    messages: IMessage[],
    messageId: number
}

const MessagesList: FC<MessagesListProps> = ({ messages, messageId }) => {
    const { newMessages, oldMessages} = useAppSelector(state => state.messagesSlice)
    const [messagesSort, setMessagesSort] = useState<IMessage[]>(messages)
    const [newMessageId, setNewMessageId] = useState<number>(messageId)
    const [likes, setLikes] = useState<string[]>([])
    const [sort, setSort] = useState(false)
    const [fetching, setFetching] = useState(false)
    const dispatch = useAppDispatch()

    //Получение новых сообщений при первом запуске
    useEffect(() => {
        if (messages.length > 0) {
            // window.scrollTo(0, document.documentElement.scrollHeight);
            setTimeout(() => {
                dispatch(fetchNewMessages(messages[messages.length - 1].id))
            }, 5000)
        }
    }, [messages])

    useEffect(() => {
        const locStor = localStorage.getItem("likes")
        if (locStor) {
            const localLikes: string[] = JSON.parse(locStor)
            setLikes(localLikes)
        }
    }, [])

    //Получение по скроллу
    useEffect(() => {
        if (fetching) {
            dispatch(fetchOldMessages())
            setFetching(false)
        }
    }, [fetching])

    useEffect(() => {
        addNewMessage()
    }, [newMessages])

    useEffect(() => {
        addOldMessages()
    }, [oldMessages])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [sort])

    const addLike = (id: number) => {
        let newLikes: string[] = []
        likes.includes(id.toString())
            ? newLikes = likes.filter(like => like !== id.toString())
            : newLikes = [...likes, id.toString()]
        localStorage.setItem("likes", JSON.stringify(newLikes))
        setLikes(newLikes)
    }

    const addNewMessage = () => {
        if (newMessages && newMessages.length > 0) {
            setNewMessageId(newMessages[0].id)
            if (!sort) {
                const newMessagesReverse = [...newMessages]
                newMessagesReverse.reverse()
                setMessagesSort([...messagesSort, ...newMessagesReverse])
            }
            else {
                setMessagesSort([...newMessages, ...messagesSort])
            }
            setTimeout(() => {
                dispatch(fetchNewMessages(newMessages[0].id))
            }, 5000)
        }
        if (newMessages === undefined || newMessages.length === 0) { // Если не получили данные с предыдущего запроса
            let id = newMessageId
            if(id === 0 && messages.length > 0) {
                id = messages[messages.length - 1].id
            }
            setTimeout(() => {              
                dispatch(fetchNewMessages(id))
            }, 5000)
        }
    }

    const addOldMessages = () => {
        if (oldMessages && oldMessages.length > 0) {
            if (sort) {
                const oldMessagesReverse = [...oldMessages]
                oldMessagesReverse.reverse()
                setMessagesSort([...messagesSort, ...oldMessagesReverse])
            }
            else {
                setMessagesSort([...oldMessages, ...messagesSort])
            }
        }
    }

    const sortDate = () => {
        if (messagesSort.length > 0) {
            setNewMessageId(messagesSort[messagesSort.length - 1].id)
            const newMessages = [...messagesSort].reverse()
            setMessagesSort(newMessages)
            setSort(!sort)
        }
    }

    const scrollHandler = () => {
        if ((sort && document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 10) && !fetching) {
            setFetching(true)
        }
        
        if (sort === false && document.documentElement.scrollTop === 0) {
            setFetching(true)
        }
    }


    return (
        <div className='messagesList' >
            <div className='messagesList-menu'>
                <div>
                    <button className='sort-btn' onClick={sortDate}>{sort ? "Сначала новые" : "Сначала старые"}</button>
                </div>
            </div>
            <div className='messagesList-list'>
                {messagesSort.map((message) => (
                    <Message message={message} key={message.idSys} like={likes.includes(message.id.toString()) ? true : false} onClick={addLike}/>
                ))}
            </div>

        </div>
    )
}

export default MessagesList
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
    const { newMessages, oldMessages } = useAppSelector(state => state.messagesSlice)
    const [messagesSort, setMessagesSort] = useState<IMessage[]>(messages)
    const [newMessageId, setNewMessageId] = useState<number>(messageId)
    const [likes, setLikes] = useState<string[]>([])
    const [sort, setSort] = useState(false)
    const [fetching, setFetching] = useState(false)

    const dispatch = useAppDispatch()

    //Получение новых сообщений при первом запуске
    useEffect(() => {
        if (messages.length > 0) {
            window.scrollTo(0, document.documentElement.scrollHeight);
            setTimeout(() => {
                dispatch(fetchNewMessages(messages[messages.length - 1].id))
            }, 5000)
        }
    }, [messages])

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
    })

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
        if (newMessages === undefined) { // Если не получили данные с предыдущего запроса
            let id = newMessageId
            if(id === 0 && messages.length > 0) {
                console.log(messages)
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
                console.log(oldMessagesReverse)
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
            let newMessages = [...messagesSort]
            newMessages.sort((a, b) => sorting(a, b, sort))
            setMessagesSort(newMessages)
            setSort(!sort)
        }
    }

    const scrollHandler = () => {
        if ((sort && document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 10) && !fetching) {
            setFetching(true)
        }
        if (!sort && document.documentElement.scrollTop === 0) {
            setFetching(true)
        }
    }

    return (
        <div className='messagesList' >
            <div className='messagesList-menu'>
                <div>
                    <button className='sort-btn' onClick={sortDate}>Сортировка</button>
                </div>
            </div>
            <div className='messagesList-list'>
                {messagesSort.map((message) => (
                    <Message message={message} key={message.id}/>
                ))}
            </div>

        </div>
    )
}

export default MessagesList
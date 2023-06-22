import React, { FC, useEffect, useState } from 'react'
import MessagesList from '../components/messagesList/MessagesList'
import { IMessage, IMessages } from '../types/IMessage'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchMessages } from '../store/messages/messagesAction'
import { sorting } from '../helpers/sorting'

const Messages: FC = () => {
    const { messages } = useAppSelector(state => state.messagesSlice)
    const [messagesSort, setMessagesSort] = useState<IMessage[]>([])
    const [newMessageId, setNewMessageId] = useState<number>(0)
    const [sort, setSort] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchMessages())
    }, [])

    useEffect(() => {
        if (messages.length > 0) {
            setNewMessageId(messages[messages.length - 1].id)
            let newMessages = [...messages]
            newMessages.sort((a, b) => sorting(a, b, sort))
            setMessagesSort(newMessages)
        }
    }, [messages])

    return (
        <div>
            {messages.length > 0 && (
                <MessagesList messages={messages} messageId={newMessageId} />
            )}
        </div>
    )
}

export default Messages
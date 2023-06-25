import { IMessage, IMessages } from "../../types/IMessage";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMessages } from "./messagesAction";

interface MessagesState {
    messages: IMessage[],
    newMessages: IMessage[],
    oldMessages: IMessage[],
}

const initialState: MessagesState = {
    messages: [],
    newMessages: [],
    oldMessages: [],
}

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        fetchMessages(state, action: PayloadAction<IMessage[]>) {
            action.payload.map((message) => {
                message.idSys = Math.random()
            })
            state.messages.push(...action.payload)
        },
        fetchNewMessages(state, action: PayloadAction<IMessage[]>) {
            if(action.payload !== undefined) {
                action.payload.map((message) => {
                    message.idSys = Math.random()
                })
                state.newMessages = action.payload
            }
            else {
                state.newMessages = action.payload
            }
        },
        fetchOldMessages(state, action: PayloadAction<IMessage[]>) {
            action.payload.map((message) => {
                message.idSys = Math.random()
            })
            state.oldMessages = action.payload
        }
    }
})

// export const {fetchMessages} = messagesSlice.actions
export default messagesSlice.reducer
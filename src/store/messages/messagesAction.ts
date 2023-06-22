import axios from "axios";
import { IMessages } from "../../types/IMessage";
import { AppDispatch } from "../store";
import { messagesSlice } from "./messagesSlice";


export const fetchMessages = (old?: boolean, id?: number,) => async (dispatch: AppDispatch) => {
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('actionName', 'MessagesLoad');
        id && bodyFormData.append("messageId", id.toString());
        old && bodyFormData.append("oldMessage", "true");

        const response = await axios.post<IMessages>("http://a0830433.xsph.ru/", bodyFormData,)
        dispatch(messagesSlice.actions.fetchMessages(response.data.Messages))
    }
    catch (e: any) {
        console.log("Ошибка получения данных")
    }
}

export const fetchNewMessages = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('actionName', 'MessagesLoad');
        bodyFormData.append("messageId", id.toString());

        const response = await axios.post<IMessages>("http://a0830433.xsph.ru/", bodyFormData,)
        dispatch(messagesSlice.actions.fetchNewMessages(response.data.Messages))
    }
    catch (e: any) {
        console.log("Ошибка получения данных")
    }
}

export const fetchOldMessages = () => async (dispatch: AppDispatch) => {
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('actionName', 'MessagesLoad');
        bodyFormData.append("oldMessage", "true");

        const response = await axios.post<IMessages>("http://a0830433.xsph.ru/", bodyFormData,)
        dispatch(messagesSlice.actions.fetchOldMessages(response.data.Messages))
    }
    catch (e: any) {
        console.log("Ошибка получения данных")
    }
}
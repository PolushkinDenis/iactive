import { IMessage } from "../types/IMessage"

export const sorting = (firstItem: IMessage, secondItem: IMessage, sort: boolean) => {
    if (!sort) {
        return secondItem.id - firstItem.id
    }
    else {
        return firstItem.id - secondItem.id
    }
}
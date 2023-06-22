interface IAttachment {
    type: string,
    url: string
}

export interface IMessage {
    attachments: IAttachment[],
    author: string,
    channel: string,
    content: string,
    date: string,
    id: number,
    region: string,
    senderNumber: string
}

export interface IMessages {
    Messages: IMessage[],
}
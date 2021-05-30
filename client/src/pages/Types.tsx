export interface TypePicOne {
    clients?: string[],
    contents?: string,
    date?: string,
    email?: string,
    imageUrl?: string,
    id?: string,
    uuid?: string,
    comments: string[],
    authorImage: string,
}

export interface TypeClient {
    "name"?: string,
    "clientId": string,
    "clientPwd": string,
    "nickName": string,
    "sex": string,
    "phone": number,
    "content": string,
    "age": number,
    _id: string,
    image: string,
}

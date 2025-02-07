type ObjectResponse = {
    error: boolean;
    items: object[] | unknown | string;
    message: string;
}

export type ResponseAPi = {
    data: ObjectResponse    
}

export type ItemsResponse = {
    result:object[],
    isLastPage?: false 
}

export type ObjectResponse = {
    error: boolean;
    items: object[] | string | unknown | [];
    message: string;
}

export type ResponseApi = {
    data: ObjectResponse    
}

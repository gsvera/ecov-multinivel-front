export type ItemsResponse = {
    result:object[],
    isLastPage?: false 
}

type ObjectResponse = {
    error: boolean;
    items: object[] | string | unknown | [];
    message: string;
}

export type ResponseApi = {
    data: ObjectResponse    
}

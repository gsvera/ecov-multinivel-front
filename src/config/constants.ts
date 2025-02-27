export enum MODULES_ADMIN { 
    MODULE_AFFILIATES = 'MODULE_AFFILIATES',
    MODULE_BUYS = 'MODULE_BUYS',
    MODULE_COMMISSIONS = 'MODULE_COMMISSIONS',
    MODULE_PAYMENT = 'MODULE_PAYMENT',
    MODULE_DOCUMENTS = 'MODULE_DOCUMENTS'
}

export enum MODULES_AFFILIATE {
    MODULE_HERARCHY_AFFILIATE = 'MODULE_HERARCHY_AFFILIATE',
    MODULE_SHOP = 'MODULE_SHOP'
}

export enum WORKGROUP {
    ADMIN = 1,
    CLIENT = 2
}

export enum STATUS_PAY {
    PENDIENT = 0,
    PAY = 1
}

export enum PAY_METHOD {
    DEPOSIT = 'deposito | transferencia',
    ON_LINE = 'en linea'
}

export const REGEX: {[key:string]:RegExp}= {
    EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
    NUMBER: /^\d+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    AMOUNT: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/
}

export const defaultPageParams = {
    page: 0,
    size: 10,
  };
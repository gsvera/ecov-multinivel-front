export enum MODULES_ADMIN { 
    MODULE_AFFILIATES = 'MODULE_AFFILIATES',
    MODULE_BUYS = 'MODULE_BUYS',
    MODULE_COMMISSIONS = 'MODULE_COMMISSIONS',
    MODULE_PAYS = 'MODULE_PAYS',
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

export const REGEX: {[key:string]:RegExp}= {
    EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
    NUMBER: /^\d+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    AMOUNT: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/
}
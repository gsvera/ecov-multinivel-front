export enum MODULES { 
    MODULE_AFFILIATES = 'MODULE_AFFILIATES',
    MODULE_BUYS = 'MODULE_BUYS',
    MODULE_COMMISSIONS = 'MODULE_COMMISSIONS',
    MODULE_PAYS = 'MODULE_PAYS',
    MODULE_DOCUMENTS = 'MODULE_DOCUMENTS'
}

export const REGEX: {[key:string]:RegExp}= {
    EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
    NUMBER: /^\d+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    AMOUNT: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/
}
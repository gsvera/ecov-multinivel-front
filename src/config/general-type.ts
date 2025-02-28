import { STATUS_PAY } from "./constants";

export type affiliateType = {
    id: string;
    firstName: string;
    lastName: string;
}

export type payAffiliateType = {
    id: number;
    amount: number;
    description: string;
    createdDate: string;
    statusPay: number;
}

export type commissionType = {
    id: number;
    amountCommission: number;
    statusPay: STATUS_PAY;
}
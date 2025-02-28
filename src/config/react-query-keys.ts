export const REACT_QUERY_KEYS = {
    user: {
        validExpiredTokenPassword: (key:string) => `valid-expired-token-password-${key}`
    },
    affiliate: {
        getHerarchy: (key:string) => `get-herarchy-${key}`,
        getDataAffiliate: (key:string) => `get-data-affiliate-${key}`,
        getDataAffiliateByUser: (key:string | null) => `get-data-affiliate-by-user-${key}`
    },
    product: {
        getAll: (key:string) => `get-all-products-${key}`,
        getByUser: (key:string | null) => `get-product-by-user-${key}`,
        getPurchased: (key:string) => `get-product-purchades-by-filter-${key}`,
        detailQuota: (key:number | null) => `get-detail-quota-by-product-${key}`
    },
    payment: {
        getFilterData: (key:string) => `get-by-filter-data-payment-${key}`
    },
    commission: {
        getByFilterDada: (key:string) => `get-by-filter-data-comission-${key}`
    }
}
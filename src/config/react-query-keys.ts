export const REACT_QUERY_KEYS = {
    user: {
        validExpiredTokenPassword: (key:string) => `valid-expired-token-password-${key}`
    },
    affiliate: {
        getHerarchy: (key:string) => `get-herarchy-${key}`,
        getDataAffiliate: (key:string) => `get-data-affiliate-${key}`,
        getDataAffiliateByUser: (key:string | null) => `get-data-affiliate-by-user-${key}`
    }
}
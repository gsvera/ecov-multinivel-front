export const REACT_QUERY_KEYS = {
    user: {
        validExpiredTokenPassword: (key:string) => `valid-expired-token-password-${key}`
    },
    affiliate: {
        getHerarchy: (key:string) => `get-herarchy-${key}`,
        getDataAffiliate: (key:string) => `get-data-affiliate-${key}`
    }
}
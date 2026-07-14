export const CONFIG = { 
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    requestSecureCookies: process.env.REQUIRE_SECURE_COOKIES,
    serverApiUrl: process.env.INTERNAL_API_URL || '/api/v1'
}
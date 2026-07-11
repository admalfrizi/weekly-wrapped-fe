export const CONFIG = { 
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    serverApiUrl: process.env.INTERNAL_API_URL || 'http://localhost:8080/api/v1'
}
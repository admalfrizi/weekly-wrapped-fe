interface LoginDataRequest {
    email: string,
    password: string
}

interface RegisterDataRequest {
    name: string,
    username: string,
    email: string,
    password: string
}

interface PaginatedDataRequest {
    page: number
    limit: number
}
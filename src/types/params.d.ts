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

interface ActivityDataRequest {
    category_id: string,
    value: string,
    note: string,
    occured_at: string
}

interface PaginatedDataRequest {
    page: number
    limit: number
}
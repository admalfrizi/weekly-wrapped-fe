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
    value: number,
    note: string,
    occured_at: string
}

interface UpdateActivityDataRequest {
    id: string;
    formData: ActivityDataRequest
}

interface DeleteActivityRequest {
    id: string
}

interface PaginatedDataRequest {
    page: number
    limit: number
}

interface WeeklyDashboardRequest {
    startDate: string
}

interface GenerateRecapRequest {
    start_date: string
}
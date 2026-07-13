export const AUTH_PATH = {
    LOGIN_URL: "/auth/login",
    REGISTER_URL: "/auth/register"
}

export const USER_PATH = {
    PROFILE: "/users/me"
}

export const ACTIVITIES_PATH = {
    ACTIVITY: "/activity",
    ACTIVITY_DTL: (id?: string) => `/activity/${id}`,
    ACTIVITY_CATEGORIES: "/activity/categories"
}

export const DASHBOARD_PATH = {
    WEEKLY: "/dashboard/weekly",
}

export const RECAP_PATH = {
    GENERATE: "/recaps/generate",
    RECAP_SLUG: (slug: string) => `/recaps/${slug}`
}
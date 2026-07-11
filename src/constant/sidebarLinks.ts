import { Activity, CalendarRange, Home } from "lucide-react";

export const sideBarLinks = [
    {
        icon: Home,
        route: "/",
        label: "Dashboard"
    },
    {
        icon: Activity,
        route: "/activities",
        label: "Activities"
    },
    {
        icon: CalendarRange,
        route: "/weeklyData",
        label: "Weekly Data"
    },
];

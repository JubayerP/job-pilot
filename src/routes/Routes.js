import { createBrowserRouter } from "react-router-dom";
import DashboardLayouts from "../layouts/DashboardLayouts";
import Main from "../layouts/Main";
import ListJob from "../pages/Dashboard/ListJob";
import Home from "../pages/Home/Home/Home";
import Jobs from "../pages/Jobs/Jobs";
import Login from "../pages/Login/Login";
import { Profile } from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/jobs/:category',
                element: <Jobs />,
                loader: ({ params }) => fetch(`http://localhost:5000/joblistings?category=${params.category}`)
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/profile',
                element: <Profile />
            }
        ]
    },
    {
        path: '/dashboard/listjob',
        element: <DashboardLayouts />,
        children: [
            {
                path: '/dashboard/listjob',
                element: <ListJob />
            }
        ]
    }
])
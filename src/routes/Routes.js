import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Jobs from "../pages/Jobs/Jobs";


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
                loader: ({params}) => fetch(`http://localhost:5000/joblistings?category=${params.category}`)
            }
        ]
    }
])

import Application from "../pages/application/Application";
import Login from "../pages/login/Login";
import {Navigate} from "react-router-dom";

export const PATH_DICT = {
    ROOT: '/',
    LOGIN: '/login',
    APPLICATION: '/application',
}

export const routes = [
    {
        path: PATH_DICT.ROOT,
        element: <Navigate to={PATH_DICT.APPLICATION} replace />
    },
    {
        path: PATH_DICT.APPLICATION,
        element: <Application />
    },
    {
        path: PATH_DICT.LOGIN,
        element: <Login />
    },
]
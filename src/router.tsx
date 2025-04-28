import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {PageType} from "./types/PageType.ts";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {AccountPage} from "./pages/AccountPage/AccountPage.tsx";
import {HowToPage} from "./pages/HowToPage/HowToPage.tsx";
import {AboutPage} from "./pages/AboutPage/AboutPage.tsx";
import {RecoveryPage} from "./pages/RecoveryPage/RecoveryPage.tsx";
import {VerifyPage} from "./pages/VerifyPage/VerifyPage.tsx";
import {AdminPage} from "./pages/AdminPage/AdminPage.tsx";

const path = (path: string, Page: PageType): RouteObject => ({
    path,
    element: <Page />,
    loader: Page.loader,
})

export const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            path('/', MainPage),
            path('/howto', HowToPage),
            path('/about', AboutPage),
            path('/account', AccountPage),
            path('/admin', AdminPage),
            {
                path: '/login',
                element: <Navigate to="/" state={{ modal: 'login' }} />
            },
            {
                path: '/signup',
                element: <Navigate to="/" state={{ modal: 'signup' }} />
            },
            {
                path: '/recover',
                element: <Navigate to="/" state={{ modal: 'recovery' }} />
            },
            path('/recover/:code', RecoveryPage),
            path('/verify/:code', VerifyPage)
        ]
    }
]);
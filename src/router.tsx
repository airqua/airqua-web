import {createBrowserRouter, RouteObject} from "react-router-dom";
import {PageType} from "./types/PageType.ts";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {AccountPage} from "./pages/AccountPage/AccountPage.tsx";
import {HowToPage} from "./pages/HowToPage/HowToPage.tsx";
import {AboutPage} from "./pages/AboutPage/AboutPage.tsx";

const path = (path: string, Page: PageType): RouteObject => ({
    path,
    element: <Page />,
    loader: Page.loader
})

export const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            path('/', MainPage),
            // path('/login', LoginPage),
            // path('/signup', SignupPage),
            // path('/recover', RecoverPage),
            // path('/verify', VerifyPage),
            path('/howto', HowToPage),
            path('/about', AboutPage),
            path('/account', AccountPage),
        ]
    }
]);
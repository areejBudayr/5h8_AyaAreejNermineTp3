import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
// plus tard : Register, Articles, etc.

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            // { path: "add", element: <ArticleFormPage /> }, etc.
            { path: "*", element: <ErrorPage /> },
        ],
    },
]);

export default router;

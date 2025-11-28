import { createBrowserRouter } from "react-router-dom";
import React from "react";
import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/register";
import ArticleList from "../pages/ArticleList";
import ArticleForm from "../components/articleForm/ArticleForm";
import CategoriePage from "../pages/CategoriePage";
import Panier from "../components/cart/Panier";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "articles", element: <ArticleList /> },
            { path: "add", element: <ArticleForm /> },
            { path: "edit/:id", element: <ArticleForm /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "categorie/:nom", element: <CategoriePage /> },
            { path: "panier", element: <Panier /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
]);

export default router;

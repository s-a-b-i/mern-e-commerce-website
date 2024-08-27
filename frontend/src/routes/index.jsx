import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SignUp from "../pages/SignUp";
import {AdminPanel} from "../pages/AdminPanel";
import Allusers from "../pages/Allusers";
import Products from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import Setting from "../pages/Setting";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetailsCard from "../components/ProductDetatilsCard";
import CartVeiw from "../pages/CartVeiw";
import SearchProduct from "../pages/SearchProduct";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "forgot-password",
                element: <ForgetPassword/>
            },
            {
                path: "signup",
                element: <SignUp/>
            },
            {
                path: "productCategory/:category",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetailsCard/>
            },
            {
                path : "cart",
                element : <CartVeiw/>

            },
            {
                path : "search",
                element : <SearchProduct/>

            },
            {
                path: "admin",
                element: <AdminPanel/>,
                children :[
                    {
                        path : "",
                        element: <Dashboard/>
                    },
                    {
                        path : "allusers",
                        element: <Allusers/>
                    },
                    {
                        path : "products",
                        element: <Products/>
                    },
                    {
                        path : "settings",
                        element: <Setting/>
                    }
                ]
            }
        ],
    },
]);

export default router;
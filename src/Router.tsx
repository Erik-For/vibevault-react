import React from "react"
import { Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Router = () => {
    return (
        <div className="h-screen w-full">
            <Routes>
                <Route path="/*" Component={App} />
                <Route path="/login" Component={Login} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Router
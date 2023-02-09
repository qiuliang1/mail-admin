import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";

import Login from "../views/login";
import Layout from "@/views/Layout";
import Dashboard from "@/views/Dashboard";

function RouterRender(params) {

    return (
            <Routes>
                <Route index path="/*" element={<Layout />} />
                <Route path="/login" element={<Login />} />
                {/* <Route
                            path="/"
                            render={(routerProps) => {
                                if (!token) {
                                    return <Redirect to="/login" />;
                                } else {
                                    return <Layout role={role} routerProps={routerProps} />
                                }
                            }}
                        /> */}
            </Routes>
    )
}
export default RouterRender
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./views/Home";
import AuthPage from "./views/Auth";
import AuthProvider from "./components/providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import BaseLayout from "./components/layouts/BaseLayout";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <BaseLayout>
                                <HomePage/>
                            </BaseLayout>
                        </ProtectedRoute>
                    }>

                    </Route>
                    <Route path="/login" element={<AuthPage/>}>

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

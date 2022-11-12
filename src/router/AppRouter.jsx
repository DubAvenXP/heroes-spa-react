import { Navigate, Route, Routes } from "react-router-dom";

import { MarvelPage, DcPage } from "../heroes/pages";
import { LoginPage } from "../auth/pages";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="marvel" element={<MarvelPage />} />
                <Route path="dc" element={<DcPage />} />
                <Route path="login" element={<LoginPage />} />

                <Route path="/" element={<Navigate to="/marvel" />} />
            </Routes>
        </>
    );
};

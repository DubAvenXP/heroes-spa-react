import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";

describe("Test in <PublicRoute/>", () => {
    test("should show children if user is not authenticated", () => {
        render(
            <AuthContext.Provider value={{ authState: { logged: false } }}>
                <PublicRoute>
                    <span>public route</span>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText("public route")).toBeTruthy();
    });

    test("shouldn't show children if user is authenticated", () => {
        const contextValue = {
            authState: { logged: true, user: { name: "john", id: "123" } },
        }

        render(
            <AuthContext.Provider value={contextValue}>
                

                <MemoryRouter initialEntries={['/marvel']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <span>public route</span>
                            </PublicRoute>
                        } />

                        <Route path="marvel" element={<span>marvel page</span>} />
                    </Routes>

                    
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("marvel page")).toBeTruthy();
    });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";

describe("Test in <PrivateRoute/>", () => {
    test("should show children if user is authenticated", () => {

        const contextValue = {  authState: { logged: true, user: { name: "john", id: "123" } } }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <span>private route</span>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("private route")).toBeTruthy();
    });

    test("shouldn't show children if user is not authenticated", () => {
        const contextValue = {
            authState: { logged: false },
        }

        render(
            <AuthContext.Provider value={contextValue}>

                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="marvel" element={
                            <PrivateRoute>
                                <span>marvel route</span>
                            </PrivateRoute>
                        } />

                        <Route path="login" element={<span>login page</span>} />
                    </Routes>

                    
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("login page")).toBeTruthy();
    });


    test('should call localStorage.setItem with the right arguments', () => {

        Storage.prototype.setItem = jest.fn();
        
        const contextValue = {  authState: { logged: true, user: { name: "john", id: "123" } } }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <span>private route</span>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("private route")).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    });
});

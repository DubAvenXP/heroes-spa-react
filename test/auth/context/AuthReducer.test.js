import { authReducer, types } from "../../../src/auth";

describe("Tests in authReducer", () => {
    
    const initialState = { logged: false }
    
    test("should return the initial state", () => {
        const newState = authReducer(initialState, {});
        expect(newState).toEqual(initialState);        
    });

    test("login should authenticate and put the user in the state", () => {
        const action = {
            type: types.login,
            payload: {
                name: "John",
                id: "123"
            }
        }

        const newState = authReducer(initialState, action);
        
        expect(newState.logged).toBeTruthy();
        expect(newState.user).toEqual(action.payload);
    })

    test("logout should remove the user from the state", () => {
        const action = {
            type: types.logout
        }

        const initialState = {
            logged: true,
            user: {
                name: "John",
                id: "123"
            }
        }

        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBe(undefined);
    })
});

import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                logged: true,
                user: action.payload,
                ...action.payload,
            }
        case types.logout:
            return {
                logged: false,
                ...action.payload,
            }
        default:
            return state;
    }
};

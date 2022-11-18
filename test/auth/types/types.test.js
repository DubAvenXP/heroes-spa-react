import { types } from "../../../src/auth";

describe("Tests in types.js", () => {
    test("should return auth types", () => {

        expect(types).toEqual({
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
        });

    });
});

import {login, logout} from "../../actions/auth";

test("Test generate login action generator", () => {
    const uid = "12313aaaa123";
    const action = login(uid);
    expect(action).toEqual({
        type: "LOGIN",
        uid
    });
});

test("Test generate logout action generator", () => {
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT"
    });
});
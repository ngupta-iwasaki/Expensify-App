import authReducer from '../../reducers/auth';
import {login, logout} from '../../actions/auth';

test("Test generate reducer with login action ", () => {
    const uid = "13241aawerwereqqaw121";
    const action = login(uid);
    const state = authReducer({}, action);
    expect(state).toEqual({
        uid
    });
});

test("Test reducer with logout action", () => {
    const action = logout();
    const state = authReducer({}, action);
    expect(state).toEqual({});
});
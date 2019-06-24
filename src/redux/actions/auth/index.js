import {
    FETCH_CURRENT_USER_FAILED,
    FETCH_CURRENT_USER_STARTED,
    FETCH_CURRENT_USER_SUCCEEDED,
    SET_USER
} from "../../consts/auth";
import {RedmineApi} from "../../../api";

export const fetchCurrentUser = (username = null, password = null) => dispatch =>
    new Promise((resolve, reject) => {
        if (!username) {
            reject({
                _error: 'Username is required'
            });
        }
        if (!password) {
            reject({
                _error: 'Password is required'
            });
        }

        dispatch({type: FETCH_CURRENT_USER_STARTED});

        RedmineApi.getCurrentUser([username, password])
            .then(
                (response) => {
                    const {user} = response.data;
                    dispatch({type: FETCH_CURRENT_USER_SUCCEEDED, user});
                    resolve(user);
                },
                error => {
                    dispatch({type: FETCH_CURRENT_USER_FAILED, error});
                    reject(error);
                }
            );
    });

export const setUser = user => ({
    type: SET_USER,
    user
});

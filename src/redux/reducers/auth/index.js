import {
    FETCH_CURRENT_USER_FAILED,
    FETCH_CURRENT_USER_STARTED,
    FETCH_CURRENT_USER_SUCCEEDED,
    SET_USER
} from "../../consts/auth";

const defaultState = {
    user: null,

    requests: {
        fetchProjects: {
            isLoading: false,
            response: null,
            error: null
        }
    }
};

export default (state = {...defaultState}, action) => {
    switch (action.type) {
        case FETCH_CURRENT_USER_STARTED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    fetchProjects: {
                        ...state.requests.fetchProjects,
                        isLoading: true
                    }
                }
            };

        case FETCH_CURRENT_USER_SUCCEEDED:
            return {
                ...state,
                user: action.user,
                requests: {
                    ...state.requests,
                    fetchProjects: {
                        ...state.requests.fetchProjects,
                        isLoading: false,
                        response: action.response
                    }
                }
            };

        case FETCH_CURRENT_USER_FAILED:
            return {
                ...state,
                user: null,
                requests: {
                    ...state.requests,
                    fetchProjects: {
                        ...state.requests.fetchProjects,
                        isLoading: false,
                        response: action.error
                    }
                }
            };

        case SET_USER:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};

import {
    FETCH_PROJECTS_FAILED,
    FETCH_PROJECTS_STARTED,
    FETCH_PROJECTS_SUCCEEDED,
    FETCH_SINGLE_PROJECT_FAILED,
    FETCH_SINGLE_PROJECT_STARTED,
    FETCH_SINGLE_PROJECT_SUCCEEDED
} from "../../consts/projects";

const defaultState = {
    items: [],
    single: null,

    requests: {
        fetchProjects: {
            isLoading: false,
            response: null,
            error: null
        },
        fetchSingleProject: {
            isLoading: false,
            response: null,
            error: null
        },
    }
};

export default (state = {...defaultState}, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_STARTED:
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

        case FETCH_PROJECTS_SUCCEEDED:
            return {
                ...state,
                items: action.projects,
                requests: {
                    ...state.requests,
                    fetchProjects: {
                        ...state.requests.fetchProjects,
                        isLoading: false,
                        response: action.response
                    }
                }
            };

        case FETCH_PROJECTS_FAILED:
            return {
                ...state,
                items: [],
                requests: {
                    ...state.requests,
                    fetchProjects: {
                        ...state.requests.fetchProjects,
                        isLoading: false,
                        response: action.error
                    }
                }
            };

        case FETCH_SINGLE_PROJECT_STARTED:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    fetchSingleProject: {
                        ...state.requests.fetchSingleProject,
                        isLoading: true
                    }
                }
            };

        case FETCH_SINGLE_PROJECT_SUCCEEDED:
            return {
                ...state,
                single: action.project,
                requests: {
                    ...state.requests,
                    fetchSingleProject: {
                        ...state.requests.fetchSingleProject,
                        isLoading: false,
                        response: action.response
                    }
                }
            };

        case FETCH_SINGLE_PROJECT_FAILED:
            return {
                ...state,
                single: null,
                requests: {
                    ...state.requests,
                    fetchSingleProject: {
                        ...state.requests.fetchSingleProject,
                        isLoading: false,
                        response: action.error
                    }
                }
            };

        default:
            return state;
    }
};

import {RedmineApi} from "../../../api";
import {
    FETCH_PROJECTS_FAILED,
    FETCH_PROJECTS_STARTED,
    FETCH_PROJECTS_SUCCEEDED, FETCH_SINGLE_PROJECT_FAILED, FETCH_SINGLE_PROJECT_STARTED, FETCH_SINGLE_PROJECT_SUCCEEDED
} from "../../consts/projects";

export const fetchProjects = () => dispatch =>
    new Promise((resolve, reject) => {
        dispatch({type: FETCH_PROJECTS_STARTED});

        RedmineApi.indexProjects()
            .then(
                (response) => {
                    const {projects} = response.data;
                    dispatch({type: FETCH_PROJECTS_SUCCEEDED, projects});
                    resolve(projects);
                },
                error => {
                    dispatch({type: FETCH_PROJECTS_FAILED, error});
                    reject(error);
                }
            );
    });

export const fetchSingleProject = (id) => dispatch =>
    new Promise((resolve, reject) => {
        dispatch({type: FETCH_SINGLE_PROJECT_STARTED});

        RedmineApi.getProject(id)
            .then(
                (response) => {
                    const {project} = response.data;
                    dispatch({type: FETCH_SINGLE_PROJECT_SUCCEEDED, project});
                    resolve(project);
                },
                error => {
                    dispatch({type: FETCH_SINGLE_PROJECT_FAILED, error});
                    reject(error);
                }
            );
    });

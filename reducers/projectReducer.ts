import { PROJECT_CREATE_SUCCESS, GET_ALL_PROJECTS_SUCCESS, GET_FILTERED_PROJECTS } from '@/actions/actions';
import { TProjectState } from '@/contexts/ProjectContext';

const projectReducer = (state: TProjectState, action: any) => {
  switch (action.type) {
    case PROJECT_CREATE_SUCCESS: {
      return {
        ...state,
        allProject: [...state.allProject, action.payload.project],
        filteredProjects: [...state.filteredProjects, action.payload.project],
      };
    }

    case GET_ALL_PROJECTS_SUCCESS: {
      return {
        ...state,
        allProject: [...action.payload.projects],
        filteredProjects: [...action.payload.projects],
      };
    }

    case GET_FILTERED_PROJECTS: {
      return {
        ...state,
        filteredProjects: [
          ...state.allProject.filter((project) => project.projectname.includes(action.payload.searchText)),
        ],
      };
    }

    default: {
      return state;
    }
  }
};

export default projectReducer;

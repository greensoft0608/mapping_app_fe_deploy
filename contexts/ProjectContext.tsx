'use client';

import React, { createContext, useEffect, useReducer, useRef } from 'react';

import { PROJECT_CREATE_SUCCESS, GET_ALL_PROJECTS_SUCCESS, GET_FILTERED_PROJECTS } from '@/actions/actions';

import reducer from '@/reducers/projectReducer';
import { axiosPrivate } from '@/utils/axios';

type TProject = {
  id: string;
  email: string;
  projectname: string;
  status: string;
  createdate: string;
  updatedate?: string | null;
};

export type TProjectState = {
  allProject: TProject[];
  filteredProjects: TProject[];
};

type TContextType = {
  projectState: TProjectState;
  createProject: (email: string, password: string) => Promise<string | undefined>;
  filterProjectsBySearchText: (searchText: string) => void;
};

const projects: TProject[] = [
  {
    createdate: '2024-04-02T21:58:39.424Z',
    email: 'maverik@bk.ru',
    id: '1892ed84-c5d0-4713-a169-5b0fdac7ecb3',
    projectname: 'Demo KOPA Roof Surface Measuring (R.S.M.)',
    status: 'new',
    updatedate: null,
  },
  {
    createdate: '2024-04-02T21:58:39.424Z',
    email: 'silver@bk.ru',
    id: '2892ed84-c5d0-4713-a169-5b0fdac7ecb4',
    projectname: 'Demo2 KOPA Roof Surface Measuring',
    status: 'new',
    updatedate: null,
  },
];

const initialState: TProjectState = {
  allProject: projects,
  filteredProjects: projects,
};

export const ProjectContext = createContext<TContextType>({
  projectState: initialState,
  createProject: async (_projectname: string, _email: string) => {
    return 'success';
  },
  filterProjectsBySearchText: (_searchText: string) => {},
});

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [projectState, dispatch] = useReducer(reducer, initialState);
  const isMountedRef = useRef(false);

  const createProject = async (projectName: string, email: string) => {
    try {
      const response = await axiosPrivate.post('createProject', {
        projectName,
        email,
        status: 'new',
      });

      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: { project: response.data.results },
      });

      if (response.data.isProject) {
        return 'success';
      } else {
        return 'aleady exist';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filterProjectsBySearchText = (searchText: string) => {
    dispatch({
      type: GET_FILTERED_PROJECTS,
      payload: { searchText },
    });
  };

  const fetchAllProjects = async () => {
    try {
      // const response = await axiosPrivate.post('createProject', {});

      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: { projects },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const initializingApp = () => {
    fetchAllProjects();
  };

  useEffect(() => {
    if (isMountedRef.current) return;
    initializingApp();

    isMountedRef.current = true;
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        createProject,
        filterProjectsBySearchText,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;

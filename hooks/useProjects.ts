import { useContext } from 'react';
import ProjectContext from '@/contexts/ProjectContext';

const useProjects = () => useContext(ProjectContext);

export default useProjects;

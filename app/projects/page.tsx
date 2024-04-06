'use client';

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { Button, useDisclosure, Input } from '@nextui-org/react';

import useAuth from '@/hooks/useAuth';
import useProjects from '@/hooks/useProjects';

import SearchInput from '@/components/Inputs/SearchInput/SearchInput';
import ProjectCard from '@/app/_components/ProjectCard/ProjectCard';
import ProjectModal from '../_components/ProjectModal/ProjectModal';
import { ConfirmButtons } from '@/components/Buttons/ConfirmButtons/ConfirmButtons';
import ImageUploadModal from '../_components/ImageUploadModal/ImageUploadModal';
import ImageUploader from '../_components/ImageUploadModal/ImageUploader';

const validationSchema = z.object({
  projectName: z.string().min(1, { message: 'Must have at least 1 character' }),
});

type SchemaProps = z.infer<typeof validationSchema>;

export default function Projects() {
  const { projectState, createProject, filterProjectsBySearchText } = useProjects();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { state } = useAuth();

  const [isUpload, setIsUpload] = useState(false);
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  const [searchText, setSearchText] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
  });

  const submitForm = async (data: SchemaProps) => {
    const res = await createProject(data.projectName, state.user.email);
    if (res === 'success') {
      toast.success('A new project was created successfully!');
      onClose();
    } else {
      toast.error('You already have such project name.');
    }
  };

  const openCreationModal = () => {
    setIsCreation(true);
    onOpen();
  };

  useEffect(() => {
    filterProjectsBySearchText(searchText);
  }, [searchText]);

  useEffect(() => {
    if (projectName) {
      onOpen();
    } else {
      onClose();
    }
  }, [projectName]);

  useEffect(() => {
    if (!isOpen) {
      setIsCreation(false);
      setProjectName('');
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-8 p-16">
      <div className="flex justify-between">
        <div>
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        </div>
        <Button color="primary" onPress={openCreationModal}>
          Create a project
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold text-white">{`Projects: ${projectState.filteredProjects.length}`}</div>

        <div className="grid grid-cols-2 gap-4">
          {projectState.filteredProjects.map((project) => (
            <ProjectCard key={project.id} data={project} projectName={projectName} setProjectName={setProjectName} />
          ))}
        </div>
      </div>

      <ProjectModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
        {isCreation && (
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4 pb-4">
            <div className="flex h-[70px] flex-col">
              <Input
                label="Project name"
                placeholder="Enter the project name"
                type="text"
                variant="bordered"
                className="text-white"
                {...register('projectName')}
              />
              <span className="pl-2 text-red-400">
                {errors?.projectName && <span>{errors.projectName.message}</span>}
              </span>
            </div>
            <div className="flex justify-end gap-4">
              <Button color="default" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </div>
          </form>
        )}

        {projectName && (
          <div className="flex flex-col gap-8 pb-4">
            <ImageUploader isUpload={isUpload} setIsUpload={setIsUpload} />
            <div className="flex justify-end gap-4">
              <Button color="default" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={() => setIsUpload(true)}>
                Upload
              </Button>
            </div>
          </div>
        )}
      </ProjectModal>
    </div>
  );
}

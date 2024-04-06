'use client';

import React from 'react';

import { Button, Card, CardBody, Image } from '@nextui-org/react';

export type TProjectCard = {
  id: string;
  projectname: string;
  email: string;
  status: string;
  createdate: string;
};

export type TProjectCardProps = {
  data: TProjectCard;
  projectName: string;
  setProjectName: (val: string) => void;
};

export default function ProjectCard({ data, projectName, setProjectName }: TProjectCardProps) {
  return (
    <Card className="p-4">
      <CardBody className="flex flex-col gap-4 overflow-visible">
        <div className="text-2xl font-semibold">{data.projectname}</div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-between gap-4">
            <div>{data.status}</div>
            <div className="flex gap-4">
              <Button radius="lg" color="primary">
                Open Project
              </Button>
              <Button radius="lg" color="primary" onClick={() => setProjectName(data.projectname)}>
                Upload Images
              </Button>
            </div>
          </div>
          <div className="w-[200px]">
            <Image
              isZoomed
              alt="NextUI Fruit Image with Zoom"
              src={`/images/project_${parseInt(data.id.substring(0, 1)) % 2}.png`}
            />
          </div>
        </div>
        <div className="flex w-full justify-between text-sm text-stone-500">
          <div>{`Expiring date ${data.createdate.substring(0, 10)}`}</div>
          <div>{`Created by ${data.email}`}</div>
        </div>
      </CardBody>
    </Card>
  );
}

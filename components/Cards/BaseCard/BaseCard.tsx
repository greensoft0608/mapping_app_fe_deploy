'use client';

import React from 'react';

import { Button, Card, CardBody, Image } from '@nextui-org/react';

export default function BaseCard() {
  return (
    <Card className="p-4">
      <CardBody className="flex flex-col gap-4 overflow-visible">
        <div className="text-2xl font-semibold">Demo KOPA Roof Surface Measur...</div>
        <div>Beispiel Steildach</div>
        <div>
          <Button radius="lg" color="primary">
            Open Project
          </Button>
        </div>
        <div className="flex w-full justify-between text-sm text-stone-500">
          <div>Expiring date 12/30/2099</div>
          <div>Created by Admin</div>
        </div>
      </CardBody>
    </Card>
  );
}

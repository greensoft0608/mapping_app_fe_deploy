'use client';

import React, { useEffect, useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

import ImageUploader from './ImageUploader';

type ProjectModalProps = {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
  onOpenChange: () => void;
  setProjectName: (val: string) => void;
};

export default function ImageUploadModal({
  isOpen,
  projectName,
  setProjectName,
  onClose,
  onOpenChange,
}: ProjectModalProps) {
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    if (!projectName) onClose();
  }, [projectName]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">{projectName}</ModalHeader>
            <ModalBody>
              <ImageUploader isUpload={isUpload} setIsUpload={setIsUpload} />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={() => setProjectName('')}>
                Cancel
              </Button>
              <Button type="submit" color="primary" onPress={() => setIsUpload(true)}>
                Upload
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

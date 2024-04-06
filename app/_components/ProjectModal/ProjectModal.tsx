'use client';

import React from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  actionComponent?: React.ReactNode;
  children: React.ReactNode;
};

export default function ProjectModal({ isOpen, onClose, onOpenChange, actionComponent, children }: ProjectModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">Create a new project</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {actionComponent && <ModalFooter>{actionComponent}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

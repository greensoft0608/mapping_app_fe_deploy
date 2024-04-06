'use client';

import { axiosPrivate } from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

export type ImageUploaderProps = {
  isUpload: boolean;
  setIsUpload: (val: boolean) => void;
};

export default function ImageUploader({ isUpload, setIsUpload }: ImageUploaderProps) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1000,
  });

  const formData = new FormData();

  useEffect(() => {
    setIsUpload(false);
    if (isUpload) {
      axiosPrivate
        .post('uploadData', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          return response.data;
        })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }, [isUpload]);

  const acceptedFileItems = acceptedFiles.map((file: any) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }: { file: any; errors: any }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e: any) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  const handleDrop = (acceptedFiles: any) => {
    formData.append('images', acceptedFiles);
    formData.append('projectName', 'test');
  };

  useEffect(() => {
    if (acceptedFiles) handleDrop(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <section className="container h-full max-h-[300px] w-full cursor-pointer overflow-auto rounded-xl border-[2px] border-dashed border-zinc-700 p-4 text-zinc-300">
      <div {...getRootProps({ className: 'dropzone' })} className="flex flex-col items-center justify-center">
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="h-10 w-10" />
        <p className="w-full text-center">
          Drag 'n' drop some files here, <br /> or click to select files
        </p>
      </div>
      {acceptedFiles.length > 0 ? (
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      ) : (
        ''
      )}
    </section>
  );
}

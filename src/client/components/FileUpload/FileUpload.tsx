import { useCallback, useState, MouseEvent, useMemo } from "react";
import { Flex, Heading, Button, DataList, Text } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

import { uploadFiles } from "@/client/utils/api";

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFilesNames] = useState<string[]>([]);
  const [isUploading, setUploading] = useState(false);

  const host = useMemo(() => {
    return `${window.location.protocol}//${window.location.host}/download-file/`
  }, [window.location.protocol, window.location.host]);

  const onClickUpload = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setUploading(true);
      if (files?.length) {
        await uploadFiles(files);
        const newFileNames = [];
        for (let i = 0; i < files.length; i++) {
          newFileNames.push(files[i].name);
        }
        setFilesNames(newFileNames);
      } else {
        toast.warning("Add files before uploading");
      }
    } catch (error) {
      toast.error(error?.toString());
    } finally {
      setUploading(false);
    }
  }, [files]);

  const onClickCopy = useCallback(async (name: string) => {
    await navigator.clipboard.writeText(host + name);
  }, [host]);

  const onDrop = useCallback((acceptedFiels: File[]) => {
    setFiles(acceptedFiels);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop
  });

  return (
    <>
      <Flex
        {...getRootProps()}
        direction="column"
        align="center"
        width="50%"
        gap="4"
        className="border-2 border-dashed border-black p-5"
      >
        <Heading>Drag & drop some files here, or click to select files</Heading>
        {
          files.length > 0 &&
          <Text>{files.length > 1 ? `${files?.length} files` : files[0].name}</Text>
        }
        <input {...getInputProps()} />
        <Button onClick={onClickUpload} loading={isUploading}>Upload</Button>
      </Flex>
      <DataList.Root>
        {
          fileNames.map((file) => (
            <DataList.Item key={file} className="flex gap-4">
              <DataList.Label>{file}</DataList.Label>
              <DataList.Value>{host + file}</DataList.Value>
              <Button onClick={() => onClickCopy(file)}>Copy</Button>
            </DataList.Item>
          ))
        }
      </DataList.Root>
    </>
  )
}

export default FileUpload;

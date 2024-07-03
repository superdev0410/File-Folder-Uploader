import { ChangeEvent, MouseEvent, useCallback, useRef, useState, useMemo } from "react"
import { Flex, Button, Heading, Text, DataList } from "@radix-ui/themes"
import { toast } from "react-toastify";
import { FileWithPath, useDropzone } from "react-dropzone";

import { uploadFolder } from "@/client/utils/api";
import { getFolderName } from "@/client/utils/helper";

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}

const FolderUpload = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [isUploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const url = useMemo(() => {
    return `${window.location.protocol}//${window.location.host}/`;
  }, [window.location.protocol, window.location.host]);

  const onChangeFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onDrop(Array.from(e.target.files ?? []));
  }, []);

  const onClickAdd = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onClickUpload = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setUploading(true);
      if (files) {
        await uploadFolder(files);
        setFolder(getFolderName(files[0]));
      } else {
        toast.warning("Add folder before uploading");
      }
    } catch (error) {
      toast.error(error?.toString());
    } finally {
      setUploading(false);
    }
  }, [files]);

  const onClickCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${url}download-folder/${folder}`);
  }, [url, folder]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    noClick: true
  })
  
  return (
    <>
      <Flex
        {...getRootProps()}
        direction="column"
        gap="4"
        align="center"
        className="border-2 border-dashed border-black p-5 w-1/2"
        onClick={onClickAdd}
      >
        <input {...getInputProps()} webkitdirectory="true" />
        <input
          ref={inputRef}
          type="file"
          webkitdirectory="true"
          className="hidden"
          onChange={onChangeFiles}
        />
        <Heading>Drag & drop a folder here, or click to select a folder</Heading>
        {
          files.length > 0 &&
          <Text>{getFolderName(files[0])}</Text>
        }
        <Button onClick={onClickUpload} loading={isUploading}>Upload</Button>
      </Flex>
      {
        folder.length > 0 &&
        <DataList.Root>
          <DataList.Item className="flex gap-4">
            <DataList.Label>{folder}</DataList.Label>
            <DataList.Value >{`${url}download-folder/${folder}`}</DataList.Value>
            <Button onClick={onClickCopy}>Copy</Button>
          </DataList.Item>
        </DataList.Root>
      }
    </>
  )
}

export default FolderUpload;

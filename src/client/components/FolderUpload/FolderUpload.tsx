import { ChangeEvent, MouseEvent, useCallback, useRef, useState, useMemo } from "react"
import { Flex, Button, Heading, Text, DataList } from "@radix-ui/themes"
import { toast } from "react-toastify";

import { uploadFolder } from "@/client/utils/api";

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}

const FolderUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const url = useMemo(() => {
    return `${window.location.protocol}//${window.location.host}/`;
  }, [window.location.protocol, window.location.host]);

  const onChangeFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    setFiles(e.target.files);
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
        setFolder(files[0].webkitRelativePath.split("/")[0]);
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
  
  return (
    <>
      <Flex className="flex-col gap-4 w-1/3 h-40 p-4 justify-center items-center border-2 border-dashed" onClick={onClickAdd}>
        <Heading>Click or Drag & Drop folder</Heading>
        {
          files &&
          <Text>{files[0].webkitRelativePath.split("/")[0]}</Text>
        }
        <input ref={inputRef} type="file" webkitdirectory="true" onChange={onChangeFiles} className="hidden"/>
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

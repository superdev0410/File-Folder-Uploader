import { ChangeEvent, useCallback, useRef, useState, MouseEvent, useMemo, DragEvent } from "react";
import { Flex, Heading, Button, DataList, Text } from "@radix-ui/themes";
import { toast } from "react-toastify";

import { uploadFiles } from "@/client/utils/api";

const FileUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNames, setFilesNames] = useState<string[]>([]);
  const [isUploading, setUploading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const host = useMemo(() => {
    return `${window.location.protocol}//${window.location.host}/download-file/`
  }, [window.location.protocol, window.location.host]);

  const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  }, []);

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

  const onClickAdd = useCallback(async () => {
    fileRef.current?.click();
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFiles(e.dataTransfer.files);
    }
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Flex
        className="flex-col justify-center items-center gap-4 border-2 border-dashed w-1/3 h-40 p-4"
        onClick={onClickAdd}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Heading>Click or Drag & Drop files to upload.</Heading>
        {
          files &&
          <Text>{files.length > 1 ? `${files?.length} files` : files[0].name}</Text>
        }
        <input ref={fileRef} type="file" className="hidden" multiple onChange={onChangeFile} />
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

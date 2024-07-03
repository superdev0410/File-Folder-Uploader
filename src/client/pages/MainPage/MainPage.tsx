import { Flex } from "@radix-ui/themes";

import { FileUpload } from "@/client/components";

const MainPage = () => {
  return (
    <Flex className="flex-col gap-5 p-4">
      <FileUpload />      
    </Flex>
  )
}

export default MainPage;

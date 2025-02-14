import { Flex, Spinner } from "@chakra-ui/react";
import { DialogBody, DialogContent, DialogRoot } from "./ui/dialog";
import { colors } from "./utils";

interface PageLoaderProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const PageLoader = (props: PageLoaderProps) => {
  return (
    <DialogRoot
      open={props.isOpen}
      closeOnInteractOutside={false}
      placement="center"
      role="dialog"
      onOpenChange={(data) => {
        if (!data.open) {
          props.onClose();
        }
      }}
      scrollBehavior="inside"
      size="xs"
    >
      <DialogContent>
        <DialogBody py={8}>
          <Flex justify="center" align="center">
            <Spinner color={colors.blueColor[6]} mr={3} /> Loading...
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default PageLoader;

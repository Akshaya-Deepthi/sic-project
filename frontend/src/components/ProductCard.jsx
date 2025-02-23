import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Switch
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: success ? "ToDo updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleCompletion = async (id) => {
    const updatedStatus = !updatedProduct.completed;
    setUpdatedProduct({ ...updatedProduct, completed: updatedStatus });
    await handleUpdateProduct(id, { ...updatedProduct, completed: updatedStatus });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.title}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.details}
        </Text>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {new Date(product.date).toLocaleDateString()}
        </Text>

        <HStack spacing={2}>
          <Text fontWeight="bold">Completed:</Text>
          <Switch
            size="md"
            colorScheme="green"
            isChecked={product.completed}
            onChange={() => toggleCompletion(product._id)}
          />
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                name="title"
                value={updatedProduct.title}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
              />
              <Input
                placeholder="Details"
                name="details"
                value={updatedProduct.details}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, details: e.target.value })}
              />
              <Input
                type="date"
                placeholder="Date"
                name="date"
                value={updatedProduct.date ? new Date(updatedProduct.date).toISOString().split("T")[0] : ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, date: e.target.value })}
              />
              <HStack>
                <Text fontWeight="bold">Completed:</Text>
                <Switch
                  name="completed"
                  isChecked={updatedProduct.completed}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, completed: e.target.checked })}
                />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

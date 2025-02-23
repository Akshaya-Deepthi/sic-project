import { 
	Box, 
	Button, 
	Container, 
	Heading, 
	Input, 
	useColorModeValue, 
	useToast, 
	VStack, 
	Switch, 
	Text 
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useProductStore } from "../store/product";
  
  const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
	  title: "",
	  details: "",
	  date: "",
	  completed: false, 
	});
  
	const toast = useToast();
	const { createProduct } = useProductStore();
  
	const handleAddProduct = async () => {
	  const { success, message } = await createProduct(newProduct);
	  if (!success) {
		toast({
		  title: "Error",
		  description: message,
		  status: "error",
		  isClosable: true,
		});
	  } else {
		toast({
		  title: "Success",
		  description: message,
		  status: "success",
		  isClosable: true,
		});
	  }
	  setNewProduct({ title: "", details: "", date: "", completed: false }); 
	};
  
	return (
	  <Container maxW={"container.sm"}>
		<VStack spacing={8}>
		  <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
			Create a ToDo
		  </Heading>
  
		  <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
			<VStack spacing={4}>
			  <Input
				placeholder='Title'
				name='title'
				value={newProduct.title}
				onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
			  />
			  <Input
				placeholder='Details'
				name='details'
				value={newProduct.details}
				onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
			  />
			  <Input
				placeholder='Date'
				name='date'
				value={newProduct.date}
				onChange={(e) => setNewProduct({ ...newProduct, date: e.target.value })}
			  />
  
			  <Text fontWeight="bold">Completed:</Text>
			  <Switch
				name="completed"
				isChecked={newProduct.completed}  
				onChange={(e) => setNewProduct({ ...newProduct, completed: e.target.checked })}
			  />
  
			  <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
				Add ToDo
			  </Button>
			</VStack>
		  </Box>
		</VStack>
	  </Container>
	);
  };
  
  export default CreatePage;
  
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,

  Stack,
  Button,
  Heading,

  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import {Link as login, useNavigate} from 'react-router-dom';
import {useState} from "react";
import { signupApi } from '../utils/fetchAPI';

interface InputState {
  email: string;
  password: string;
}


export default function SignupCard() {
  const [input, setInput] = useState<InputState>({
    email:'',
    password:''
  });

  const Navigate = useNavigate();

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    e.stopPropagation();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    e.preventDefault();
    try{
      await signupApi(input);
      Navigate('/');
    } catch(err){
      alert('Wrong Credentials');
    }
  }

  
  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Create your own account</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" onChange={handleChange} value={input.email} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" onChange={handleChange} value={input.password} />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Link as={login} to='/auth/login' color={'blue.400'} >Already a User?</Link>
            </Stack>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
              >
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  );
}
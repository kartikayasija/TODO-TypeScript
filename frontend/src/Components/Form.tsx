import { FormControl, Input, Stack, Button} from "@chakra-ui/react";
import { useState } from "react";
import { addTodo } from "../utils/fetchAPI";

interface InputState {
  title: string;
  content: string;
}

interface ComponentProps {
  dispatch: any;
  edit: any;
}


const Form: React.FC<ComponentProps> = ({dispatch,edit}) => {
  const [input,setInput] = useState<InputState>({
    title:'',
    content: ''
  })
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    e.stopPropagation();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    e.preventDefault();
    try{
      if(edit===null){
        const result = await addTodo(input);
        dispatch({ type: "ADD", payload: result.data });
      }else{
        // const edit = editTodo(input,id)
        dispatch({type:"UPDATE", payload: {...edit,...input}})
      }
    } catch(err){
      console.log(err)
      alert('Could not be added');
    }
  }
  return (
    <>
      <Stack w="30%" m="auto" align="center">
        <FormControl>
          <Input type="text" name="title" value={input.title} placeholder="Title" onChange={handleChange}/>
          <Input type="text" name="content" value={input.content} placeholder="Content" onChange={handleChange}/>
        </FormControl>
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" size="md" onClick={handleSubmit}>
            {edit!==null?'Edit':'Add'}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Form;

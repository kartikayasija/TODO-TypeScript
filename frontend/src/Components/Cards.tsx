import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Button,
  Flex,
} from "@chakra-ui/react";
import { deleteTodo } from "../utils/fetchAPI";
import { useContext } from "react";
import { CardContext } from "../context/TodoContext";

interface CardsProps {
  setEdit: any;
}

const Cards: React.FC<CardsProps> = ({setEdit}) => {
  const{data,dispatch} = useContext(CardContext);
  const handleDelete = async (
    e: React.FormEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteTodo(id);
      dispatch({ type: "DELETE", payload: id });
    } catch (err) {
      throw new Error("could'nt delete");
    }
  };

  return (
    <>
      {data.map((todo) => (
        <Card key={todo._id}>
          <CardHeader>
            <Heading
              size="md"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {todo.title}
              <Flex>
                <Button
                  variant="link"
                  onClick={(e) => handleDelete(e, todo._id)}
                >
                  <DeleteIcon color="teal" />
                </Button>
                <Button variant="link" onClick={()=>setEdit(todo)}>
                  <EditIcon color="teal" />
                </Button>
              </Flex>
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>{todo.content}</Text>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
export default Cards;

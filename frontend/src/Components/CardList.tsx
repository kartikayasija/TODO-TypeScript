import { useEffect} from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Cards from "./Cards";
import { getAllTodo } from "../utils/fetchAPI";

interface ComponentProps {
  dispatch: any;
  data: any[]
}


const CardList: React.FC<ComponentProps> = ({ dispatch,data }) => {

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const result = await getAllTodo();
        dispatch({ type: "SET_DATA", payload: result.data });
      } catch (err) {
        throw new Error("Invalid");
      }
    };
    fetchTodo();
  }, []);

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        w="80%"
        mx="auto"
        my="60px"
      >
        <Cards data={data}/>
      </SimpleGrid>
    </>
  );
};

export default CardList;

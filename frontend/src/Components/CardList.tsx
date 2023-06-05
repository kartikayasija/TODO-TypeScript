import { useContext, useEffect,useState} from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CardContext } from "../context/TodoContext";

interface ComponentProps {
  setEdit: any,
}


const CardList: React.FC<ComponentProps> = ({ setEdit }) => {

  const {dispatch} = useContext(CardContext);

  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      const token:string|null = localStorage.getItem('token');
      if(token){
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const result = await axios.get("/api/todo/getAll", config)
          setIsLoading(false);
          dispatch({ type: "SET_DATA", payload: result.data });
        } catch (err) {
          Navigate("/auth/login");
          throw err;
        }
      }else{
        Navigate("/auth/login");
      }
    };
    fetchTodo();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        w="80%"
        mx="auto"
        my="60px"
      >
        <Cards setEdit={setEdit}/>
      </SimpleGrid>
    </>
  );
};

export default CardList;

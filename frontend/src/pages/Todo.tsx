import { useReducer } from "react";
import CardList from "../Components/CardList";
import Form from "../Components/Form";
import Profile from "../Components/Profile";

type CardData = {
  id: string;
  title: string;
  content: string;
};

type CardAction =
  | { type: "SET_DATA"; payload: CardData[] }
  | { type: "ADD"; payload: CardData }
  | { type: "UPDATE"; payload: CardData }
  | { type: "DELETE"; payload: string };

const Todo: React.FC = () => {
  const cardReducer = (data: CardData[], action: CardAction): CardData[] => {
    switch (action.type) {
      case "SET_DATA":
        return action.payload;
      case "ADD":
        return [...data, action.payload];
      case "UPDATE":
        return data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      case "DELETE":
        return data.filter((item) => item.id !== action.payload);
      default:
        return data;
    }
  };

  const [data, dispatch] = useReducer(cardReducer, []);

  return (
    <>
      <Profile />
      <Form dispatch={dispatch}/>
      <CardList dispatch={dispatch} data={data}/>
    </>
  );
};
export default Todo;

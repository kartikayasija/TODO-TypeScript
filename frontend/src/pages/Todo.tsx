import { useReducer, useState } from "react";
import CardList from "../Components/CardList";
import Form from "../Components/Form";
import Profile from "../Components/Profile";

type CardData = {
  _id: string;
  title: string;
  content: string;
};

type CardAction =
  | { type: "SET_DATA"; payload: CardData[] }
  | { type: "ADD"; payload: CardData }
  | { type: "UPDATE"; payload: CardData }
  | { type: "DELETE"; payload: string };

const Todo: React.FC = () => {
  const [edit, setEdit] = useState(null);
  
  const cardReducer = (data: CardData[], action: CardAction): CardData[] => {
    switch (action.type) {
      case "SET_DATA":
        return action.payload;
      case "ADD":
        return [...data, action.payload];
      case "UPDATE":
        const newData = data.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload
          } else return item
        });
        setEdit(null)
        return newData;

      case "DELETE":
        return data.filter((item) => item._id !== action.payload);
      default:
        return data;
    }
  };

  const [data, dispatch] = useReducer(cardReducer, []);


  return (
    <>
      <Profile />
      <Form dispatch={dispatch} edit={edit} />
      <CardList dispatch={dispatch} data={data} setEdit={setEdit} />
    </>
  );
};
export default Todo;

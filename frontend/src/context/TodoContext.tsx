import { ReactNode, createContext, useReducer} from "react";

type CardProviderProps = {
  children: ReactNode;
};
type CardData = {
  _id: string;
  title: string;
  content: string;
};
const CardContext = createContext<{
  data: CardData[];
  dispatch: React.Dispatch<CardAction>;
}>({
  data: [], // Provide initial value for data
  dispatch: () => {} // Provide initial value for dispatch
});

type CardAction =
  | { type: "SET_DATA"; payload: CardData[] }
  | { type: "ADD"; payload: CardData }
  | { type: "UPDATE"; payload: CardData }
  | { type: "DELETE"; payload: string };

  const cardReducer = (data: CardData[], action: CardAction): CardData[] => {
    switch (action.type) {
      case "SET_DATA":
        return action.payload;
      case "ADD":
        return [...data, action.payload];
      case "UPDATE":
        const newData = data.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else return item;
        });
        return newData;

      case "DELETE":
        return data.filter((item) => item._id !== action.payload);
      default:
        return data;
    }
  };

const CardProvider: React.FC<CardProviderProps> = ({ children }) => {

  const [data, dispatch] = useReducer(cardReducer, []);

  return (
    <CardContext.Provider value={ {dispatch,data} }>
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, CardProvider };

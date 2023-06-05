import { useState } from "react";
import CardList from "../Components/CardList";
import Form from "../Components/Form";
import Profile from "../Components/Profile";
import { CardProvider } from "../context/TodoContext";

const Todo: React.FC = () => {

  const [edit, setEdit] = useState(null);

  return (
    <CardProvider>
      <Profile />
      <Form edit={edit} setEdit={setEdit}/>
      <CardList setEdit={setEdit} />
    </CardProvider>
  );
};
export default Todo;

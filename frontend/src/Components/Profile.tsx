import {
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Button
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function MyComponent() {

  const Navigate = useNavigate();

  const handleLogOut = (e:React.FormEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    localStorage.removeItem('token');
    Navigate('/auth/login')
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", margin:"30px 30px 0 0" }}>
      <Popover>
        <PopoverTrigger>
          <Avatar
            src="https://bit.ly/broken-link"
            style={{ cursor: "pointer" }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to Logout?
            <Button mt="20px" onClick={handleLogOut}>Log Out</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MyComponent;

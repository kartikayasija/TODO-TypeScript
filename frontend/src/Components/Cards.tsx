import { Card, CardHeader, Heading, Text, CardBody } from "@chakra-ui/react";

interface CardsProps {
  data: any[];
}

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <>
      {data.map((todo) => (
        <Card key={todo._id}>
          <CardHeader>
            <Heading size="md">{todo.title}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              {todo.content}
            </Text>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
export default Cards;

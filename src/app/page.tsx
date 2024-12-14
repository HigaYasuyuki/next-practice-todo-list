import TodoList from "./components/TodoList";
import Box from '@mui/material/Box';
import { PrismaClient } from '@prisma/client';
import { Container } from "@mui/material";
import SelectedItemDescription from './components/SelectedItemDescription';

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" alignItems="center">
        <Box flexGrow={1} width="100%" maxWidth="600px">
          <TodoList todos={todos} />
        </Box>
        <Box width="100%" maxWidth="600px">
          <SelectedItemDescription item={null} />
        </Box>
      </Box>
    </Container>
  );
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listTodos() {
  try {
    const todos = await prisma.todo.findMany();
    console.log('All ToDos:', todos);
  } catch (error) {
    console.error('Error fetching ToDos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
listTodos();

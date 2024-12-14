const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTodo(title, description) {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        completed: false,
      },
    });
    console.log('New ToDo created:', newTodo);
  } catch (error) {
    console.error('Error creating ToDo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
createTodo('Sample ToDo', 'This is a sample ToDo item');

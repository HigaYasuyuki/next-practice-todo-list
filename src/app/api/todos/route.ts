import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        description: description,
        completed: false,
      },
    });
    return Response.json(newTodo, { status: 201 });
  } catch (error) {
    return { error: 'Failed to create todo' };
  }
}

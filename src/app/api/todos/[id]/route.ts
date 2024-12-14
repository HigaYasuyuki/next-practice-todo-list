import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    const id = Number(params.id);
    await prisma.todo.delete({
      where: { id: id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return { error: 'Failed to delete todo' };
  }
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  try {
    const id = Number(params.id);
    const { completed } = await request.json();
    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: { completed: completed },
    });
    return Response.json(updatedTodo, { status: 200 });
  } catch (error) {
    return { error: 'Failed to update todo' };
  }
}

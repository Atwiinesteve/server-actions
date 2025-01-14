
import { revalidatePath } from "next/cache";
import prisma from "../db";

// get all todos
export async function getTodos() {
	"use server";
	const todos = await prisma.todo.findMany({
		select: {
			id: true,
			input: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return todos;
}

// create todos
export async function createTodo(formData: FormData) {
	"use server";
	const inputData = formData.get("input") as string;
	await prisma.todo.create({
		data: {
			input: inputData,
		},
	});
	revalidatePath("/");
}

// edit todo
export async function editTodo(formData: FormData) {
	"use server";
	const input = formData.get("input") as string;
	const inputId = parseInt(formData.get("inputId") as string, 10);
	await prisma.todo.update({
		where: {
			id: inputId,
		},
		data: {
			input: input,
		},
	});
	revalidatePath("/");
}

// delete todo
export async function deleteTodo(formData: FormData) {
	"use server";
	const inputId = parseInt(formData.get("inputId") as string, 10);
	await prisma.todo.delete({
		where: {
			id: inputId,
		},
	});
	revalidatePath("/");
}

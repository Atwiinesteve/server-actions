import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "./db";
import { revalidatePath } from "next/cache";

async function getTodos() {
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

export default async function Home() {
	const data = await getTodos();
	async function createTodo(formData: FormData) {
		"use server";
		const inputData = formData.get("input") as string;
		await prisma.todo.create({
			data: {
				input: inputData,
			},
		});
		revalidatePath("/");
	}

	return (
		<>
			<div className="h-screen w-screen flex justify-center items-center">
				<div className="rounded-lg border shadow-xl p-10 w-[30vw]">
					<form className="flex flex-col" action={createTodo}>
						<Input type="text" name="input" className="mb-2" />
						<Button className="bg-slate-900 text-white hover:text-slate-900 hover:border hover:border-slate-900">
							Submit
						</Button>
					</form>
					{data.map((todo) => (
						<div
							key={todo.id}
							className="flex justify-between items-center border-b py-2">
							<p>{todo.input}</p>
							<Button className="bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500">
								Delete
							</Button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

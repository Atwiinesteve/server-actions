import { Input } from "@/components/ui/input";

import { createTodo, getTodos } from "./actions/actions";
import SaveButton from "@/components/Save";
import EditButton from "@/components/Edit";
import DeleteButton from "@/components/Delete";

export default async function Home() {
	const data = await getTodos();
	return (
		<>
			<div className="h-screen w-screen flex justify-center items-center">
				<div className="rounded-lg border shadow-xl p-10 w-[30vw]">
					<form className="flex flex-col" action={createTodo}>
						<Input type="text" name="input" className="mb-2" />
						<SaveButton />
					</form>
					<div className="mt-3 flex flex-col gap-y-2">
						{data.map((todo) => (
							<form
								action=""
								key={todo.id}
								className="flex justify-between items-center border-b py-2">
								<Input type="hidden" name="inputId" value={todo.id} />
								<Input type="text" name="input" defaultValue={todo.input} />
								<div className="ml-2 flex items-center justify-center gap-x-2">
									<EditButton />
									<DeleteButton />
								</div>
							</form>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

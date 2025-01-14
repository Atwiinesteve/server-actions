import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import prisma from "./db";

import SaveButton from "@/components/Save";
import EditButton from "@/components/Edit";
import DeleteButton from "@/components/Delete";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { createTodo, deleteTodo, editTodo, getTodos } from "./actions/actions";

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
              <div key={todo.id} className="flex items-center justify-between">
                <form
                  action={editTodo}
                  className="flex justify-between items-center border-b-slate-300 py-2 ml-2"
                >
                  <Input
                    type="hidden"
                    className="w-[40px]"
                    name="inputId"
                    value={todo.id}
                  />
                  <Input
                    type="text"
                    className="w-[380px]"
                    name="input"
                    defaultValue={todo.input}
                  />
                  <EditButton />
                </form>

                <form action={deleteTodo}>
                  <Input
                    type="hidden"
                    className="w-[40px]"
                    name="inputId"
                    value={todo.id}
                  />
                  <DeleteButton />
                </form>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

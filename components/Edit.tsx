"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

export default function EditButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="bg-slate-900 ml-1 text-white hover:text-slate-900 hover:border hover:border-slate-900">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="  border border-green-500 ml-1"
        >
          <CiEdit color="green" />
        </Button>
      )}
    </>
  );
}

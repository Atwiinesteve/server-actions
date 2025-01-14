"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SaveButton() {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button className="bg-slate-900 text-white hover:text-slate-900 hover:border hover:border-slate-900">
					<AiOutlineLoading3Quarters className="animate-spin" />
				</Button>
			) : (
				<Button className="bg-slate-900 text-white hover:text-slate-900 hover:border hover:border-slate-900">
					Save
				</Button>
			)}
		</>
	);
}

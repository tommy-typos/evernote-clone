import { useEffect } from "react";
import { LeftSide } from "./LeftSide";
import Tiptap from "./Tiptap";
import { DenemeZustand } from "../DenemeZustand";
import { useSelectedNoteStore } from "@/state/selectedNote";
import { useRegularNoteStore } from "@/state/regularNotes";

export default function App() {
	const selectedNote = useSelectedNoteStore((state) => state.selectedNote);

	useEffect(() => {
		useRegularNoteStore.persist.rehydrate();
	}, []);

	return (
		<div className="flex h-full ">
			<LeftSide />

			{selectedNote ? (
				<Tiptap />
			) : (
				<div className="z-10 flex h-full w-full flex-grow items-center justify-center bg-slate-900 text-xl text-slate-300">
					<p>Please choose a note to start writing</p>
				</div>
			)}
			{/* <DenemeZustand /> */}
		</div>
	);
}

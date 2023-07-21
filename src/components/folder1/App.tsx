import { useEffect, useState } from "react";
import { LeftSide } from "./LeftSide";
import Tiptap from "./Tiptap";
import { getNoteTree } from "@/utils/functions1";
import { TreeItems } from "../DndKitSortable/Tree/types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { initialItems2 } from "@/utils/sampleNoteTree";
import { DenemeZustand } from "../DenemeZustand";
import { useSelectedNoteStore } from "@/state/selectedNote";
import { useRegularNoteStore } from "@/state/regularNotes";

export default function App() {
	const selectedNote = useSelectedNoteStore((state) => state.selectedNote);

	useEffect(() => {
		useRegularNoteStore.persist.rehydrate();
	}, []);

	// const [count, setCount] = useState(0);

	// function clickHandler() {
	// 	setCount((value) =>  {
	// 		return value + 1
	// 	});
	// }
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
			{/* <button className="text-2xl ml-10" onClick={clickHandler}>click {count}</button> */}
		</div>
	);
}

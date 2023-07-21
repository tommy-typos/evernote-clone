import { useEffect, useState } from "react";
import { LeftSide } from "./LeftSide";
import Tiptap from "./Tiptap";
import { getNoteTree } from "@/utils/functions1";
import { TreeItems } from "../DndKitSortable/Tree/types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { changeItemName } from "../DndKitSortable/Tree/utilities";
import { initialItems2 } from "@/utils/sampleNoteTree";
import { DenemeZustand } from "../DenemeZustand";
import { useSelectedNoteStore } from "@/state/selectedNote";

// export type NoteIDandTitlewithNoteType = `${noteType},${string},${string}` | undefined;

// export type noteType = "dailyNote" | "regularNote";

export default function App() {
	// const [selectedNote, setSelectedNote] = useState<NoteIDandTitlewithNoteType>();
	const selectedNote = useSelectedNoteStore(state => state.selectedNote);
	const [items, setItems] = useState<TreeItems>([]);

	useEffect(() => {
		const noteTree = getNoteTree();
		if (noteTree.length) {
			setItems(noteTree);
		} else {
			setItems(initialItems2);
		}
	}, []);

	function changeNoteTitle(noteId: UniqueIdentifier, title: string) {
		setItems((items) => changeItemName(items, noteId, title));
	}

	return (
		<div className="flex h-full ">
			<LeftSide items={items} setItems={setItems} />

			{selectedNote ? (
				<Tiptap changeNoteTitle={changeNoteTitle} />
			) : (
				<div className="z-10 flex h-full w-full flex-grow items-center justify-center bg-slate-900 text-xl text-slate-300">
					<p>Please choose a note to start writing</p>
				</div>
			)}
			{/* <DenemeZustand /> */}
		</div>
	);
}

// TODO: conditionally render Editor

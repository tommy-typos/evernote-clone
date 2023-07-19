import { useEffect, useState } from "react";
import { LeftSide } from "./LeftSide";
import Tiptap from "./Tiptap";
import { getNoteTree } from "@/utils/functions1";
import { TreeItems } from "../DndKitSortable/Tree/types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { changeItemName } from "../DndKitSortable/Tree/utilities";

export type noteType = "dailyNote" | "regularNote";
export type NoteIDandTitlewithNoteType = `${noteType},${string},${string}` | undefined;

export default function App() {
	const [selectedNote, setSelectedNote] = useState<NoteIDandTitlewithNoteType>();
	const [items, setItems] = useState<TreeItems>([]);

	useEffect(() => {
		setItems(getNoteTree())
	}, [])

	function changeNoteTitle(noteId: UniqueIdentifier, title: string) {
		setItems((items) => changeItemName(items, noteId, title));
	}

	return (
		<div className="flex h-full ">
			<LeftSide selectedNote={selectedNote} setSelectedNote={setSelectedNote} 
			items={items} 
			setItems={setItems}
			/>
			<Tiptap selectedNote={selectedNote} changeNoteTitle={changeNoteTitle}/>
		</div>
	);
}

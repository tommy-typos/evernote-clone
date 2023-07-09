import { useState } from "react";
import { LeftSide } from "./LeftSide";
import Tiptap from "./Tiptap";

export type noteType = "dailyNote" | "regularNote";
export type NoteIDwithNoteType = `${noteType},${string}` | undefined;

export default function App() {
	const [selectedNote, setSelectedNote] = useState<NoteIDwithNoteType>();

	return (
		<div className="flex h-full ">
			<LeftSide selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
			<Tiptap selectedNote={selectedNote} />
		</div>
	);
}

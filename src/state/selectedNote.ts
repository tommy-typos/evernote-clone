import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";

type NoteType = "dailyNote" | "regularNote";
type NoteId = UniqueIdentifier | `${string}-${string}-${string}`;

type SelectedNote = {
	type: NoteType;
	id: NoteId;
	title: string;
};

type SelectedNoteStore = {
	selectedNote: SelectedNote | null;
	latestSelectedRegularNoteId: UniqueIdentifier | null;
	setSelectedNote: (note: SelectedNote | null) => void;
};

export const useSelectedNoteStore = create<SelectedNoteStore>()((set) => ({
	selectedNote: null,
	latestSelectedRegularNoteId: null,
	setSelectedNote: (note) =>
		set((state) => {
			let newLatestValue: UniqueIdentifier | null = state.latestSelectedRegularNoteId;
			let latestShouldChange: boolean = false;
			if (note === null) {
				latestShouldChange = true;
				newLatestValue = null;
			} else if (note.type === "regularNote") {
				latestShouldChange = true;
				newLatestValue = note.id;
			}
			return {
				selectedNote: note,
				latestSelectedRegularNoteId: latestShouldChange ? newLatestValue : state.latestSelectedRegularNoteId,
			};
		}),
}));

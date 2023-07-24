import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
import { RegularNote, RegularNotes, useRegularNoteStore } from "./regularNotes";

export type NoteType = "dailyNote" | "regularNote";
export type NoteId = UniqueIdentifier | `${string}-${string}-${string}`;

export type SelectedNote = {
	type: NoteType;
	id: NoteId;
	title: string;
};

type SelectedNoteStore = {
	selectedNote: SelectedNote | null;
	latestSelectedRegularNoteId: UniqueIdentifier | null;
	setSelectedNote: (note: SelectedNote | null) => void;
	setSelectedNoteFromLatestRegularNoteId: () => void;
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
	setSelectedNoteFromLatestRegularNoteId: () =>
		set((state) => {
			let found = false;
			let selectedNote: SelectedNote | null = null;
			if (state.latestSelectedRegularNoteId) {
				const regularNotes = useRegularNoteStore.getState().regularNotes;
				const note = findRegularNoteWithId(regularNotes, state.latestSelectedRegularNoteId);
				if (note) {
					selectedNote = {
						id: note.id,
						type: "regularNote",
						title: note.title,
					};

					found = true;
				}
			}
			return {
				selectedNote: found ? selectedNote : state.selectedNote,
			};
		}),
}));

function findRegularNoteWithId(regularNotes: RegularNotes, id: UniqueIdentifier): RegularNote | null {
	let foundNote: RegularNote | null = null;

	for (const item of regularNotes) {
		if (item.id === id) {
			foundNote = item;
			break;
		}

		if (item.children.length) {
			foundNote = findRegularNoteWithId(item.children, id);
		}
	}

	return foundNote;
}

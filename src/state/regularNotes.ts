import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSelectedNoteStore } from "./selectedNote";
import { addNoteFunction, removeNoteFunction, togglePropertyFunction, updateNoteTitleFunction } from "./utilities";
import { deleteNotesFromLocalStorage } from "@/utils/functions1";

export type RegularNote = {
	id: UniqueIdentifier;
	title: string;
	children: RegularNote[];
	collapsed?: boolean;
	isFavorite?: boolean;
};

export type Toggleable = "collapsed" | "isFavorite";

export type FavoriteRegularNote = {
	id: UniqueIdentifier;
	title: string;
};

export type RegularNotes = RegularNote[];
type FavoriteRegularNotes = FavoriteRegularNote[];

type RegularNoteStore = {
	regularNotes: RegularNotes;
	favoriteNotes: FavoriteRegularNotes;
	addNote: (parentId: UniqueIdentifier | null) => void;
	removeNote: (id: UniqueIdentifier) => void;
	updateNoteTitle: (argList: { id: UniqueIdentifier; title: string }) => void;
	toggleProperty: (argList: { id: UniqueIdentifier; property: Toggleable }) => void;
	setRegularNotes: (notes: RegularNotes) => void;
	setFavoriteNotes: (notes: FavoriteRegularNotes) => void;
};

export const useRegularNoteStore = create<RegularNoteStore>()(
	persist(
		(set) => ({
			regularNotes: [] as RegularNotes,
			favoriteNotes: [] as FavoriteRegularNotes,
			addNote: (parentId) =>
				set((state) => {
					const { newNotes, idForNewNote } = addNoteFunction(state.regularNotes, parentId);

					// set selected note to new note
					const setSelectedNote = useSelectedNoteStore.getState().setSelectedNote;
					setSelectedNote({ type: "regularNote", id: idForNewNote, title: "" });
					return { regularNotes: newNotes };
				}),
			removeNote: (id) =>
				set((state) => {
					const { newNotes, allRemovedNoteIds } = removeNoteFunction(state.regularNotes, id);

					// update favorite notes
					let newFavNotes: FavoriteRegularNotes = [];
					const anyFavoriteDeleted = state.favoriteNotes.some((favNote) =>
						allRemovedNoteIds.includes(favNote.id)
					);
					if (anyFavoriteDeleted) {
						newFavNotes = state.favoriteNotes.filter((favNote) => !allRemovedNoteIds.includes(favNote.id));
					}

					// update selected note
					const selectedNote = useSelectedNoteStore.getState().selectedNote;
					const setSelectedNote = useSelectedNoteStore.getState().setSelectedNote;
					if (selectedNote && allRemovedNoteIds.includes(selectedNote?.id)) {
						setSelectedNote(null);
					}

					// delete content of removed notes from database
					deleteNotesFromLocalStorage(allRemovedNoteIds);

					return {
						regularNotes: newNotes,
						favoriteNotes: anyFavoriteDeleted ? newFavNotes : state.favoriteNotes,
					};
				}),
			updateNoteTitle: ({ id, title }) =>
				set((state) => {
					const newNotes = updateNoteTitleFunction(state.regularNotes, id, title);

					//update in favorites
					let updatedInFavs = false;
					const newFavNotes = state.favoriteNotes.map((note) => {
						if (note.id === id) {
							updatedInFavs = true;
							return {
								...note,
								title: title,
							};
						} else {
							return note;
						}
					});

					//update in selected note
					const selectedNote = useSelectedNoteStore.getState().selectedNote;
					const setSelectedNote = useSelectedNoteStore.getState().setSelectedNote;
					if (selectedNote && selectedNote.id === id) {
						setSelectedNote({ ...selectedNote, title: title });
					}

					return {
						regularNotes: newNotes,
						favoriteNotes: updatedInFavs ? newFavNotes : state.favoriteNotes,
					};
				}),
			toggleProperty: ({ id, property }) =>
				set((state) => {
					const { newNotes, becameFavAfterToggle, title } = togglePropertyFunction(
						state.regularNotes,
						id,
						property
					);

					let newFavs: FavoriteRegularNotes = [];
					if (property === "isFavorite") {
						newFavs = becameFavAfterToggle
							? [...state.favoriteNotes, { id: id, title: title }]
							: state.favoriteNotes.filter((note) => note.id !== id);
					}

					return {
						regularNotes: newNotes,
						favoriteNotes: property === "isFavorite" ? newFavs : state.favoriteNotes,
					};
				}),
			setRegularNotes: (notes) =>
				set((state) => {
					return {
						regularNotes: notes,
					};
				}),
			setFavoriteNotes: (notes) =>
				set((state) => {
					return {
						favoriteNotes: notes,
					};
				}),
		}),
		{
			name: "regular-notes-tree",
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
		}
	)
);

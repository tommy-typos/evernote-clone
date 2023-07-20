import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSelectedNoteStore } from "./selectedNote";
import { addNoteFunction, removeNoteFunction, togglePropertyFunction, updateNoteTitleFunction } from "./utilities";
import { deleteNotesFromLocalStorage } from "@/utils/functions1";

type RegularNote = {
	id: UniqueIdentifier;
	title: string;
	children: RegularNote[];
	collapsed?: boolean;
	isFavorite?: boolean;
};

export type Toggleable = "collapsed" | "isFavorite";

type FavoriteRegularNote = {
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

const useRegularNoteStore = create<RegularNoteStore>()(
	persist(
		(set) => ({
			// TODO: ask why "as" was important to get rid of errors
			regularNotes: [] as RegularNotes,
			favoriteNotes: [] as FavoriteRegularNotes,
			addNote: (parentId) =>
				set((state) => {
					const { newNotes, idForNewNote } = addNoteFunction(state.regularNotes, parentId);

					// set selected note to new note
					const setSelectedNode = useSelectedNoteStore((state) => state.setSelectedNote);
					Promise.resolve().then(() => {
						setSelectedNode({ type: "regularNote", id: idForNewNote, title: "" });
					});
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
					const selectedNote = useSelectedNoteStore((state) => state.selectedNote);
					const setSelectedNode = useSelectedNoteStore((state) => state.setSelectedNote);
					if (selectedNote && allRemovedNoteIds.includes(selectedNote?.id)) {
						setSelectedNode(null);
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
					const selectedNote = useSelectedNoteStore((state) => state.selectedNote);
					const setSelectedNode = useSelectedNoteStore((state) => state.setSelectedNote);
					if (selectedNote && selectedNote.id === id) {
						setSelectedNode({ ...selectedNote, title: title });
					}

					return {
						regularNotes: newNotes,
						favoriteNotes: updatedInFavs ? newFavNotes : state.favoriteNotes,
					};
				}),
			toggleProperty: ({ id, property }) =>
				set((state) => {
					const newNotes = togglePropertyFunction(state.regularNotes, id, property);

					return {
						regularNotes: newNotes,
						favoriteNotes:
							property === "isFavorite"
								? state.favoriteNotes.filter((note) => note.id !== id)
								: state.favoriteNotes,
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

/**
 * add new note
 * 		done = should set it to selected note + latestselected note
 */

/**
 * removeNote
 * 		done = remove note with given id
 * 		done = if it was fav, then remove it from favs too
 * 		done = recursively loop through children and check if any of them were favorite, remove them from favs too
 * 		done = if it was selectednote, set selected note to null
 * 		done = if it was latest selectednote, set latest selected note to null
 * 		done = recursively loop through children and check if any of them were selectedNote, if so set selected to null
 * 		done = delete notecontent fromd database
 */

/**
 * updateNoteTitle
 * 		done = update title in regular notes
 * 		done = if it was fav, update in favs too
 * 		done = if it was selectednote, update there too
 * 		done = if it was latest selected note, update there too
 */

/**
 * toggleFavorite
 * 		done = remove it from favorites
 *
 */

// favorites could be derived but it will cause favs to rerender every time we do unrelated activities as well.

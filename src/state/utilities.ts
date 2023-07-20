import { nanoid } from "nanoid";
import { RegularNotes, Toggleable } from "./regularNotes";
import type { UniqueIdentifier } from "@dnd-kit/core";

export function addNoteFunction(notes: RegularNotes, parentId: UniqueIdentifier | null) {
	let newNotes = [];
	let idForNewNote = nanoid();
	if (parentId !== null) {
		for (const note of notes) {
			let added = false;
			if (note.id === parentId) {
				note.children.push({
					id: idForNewNote,
					title: "",
					children: [],
				});
				note.collapsed = false;
				added = true;
			}

			if (!added && note.children.length) {
				note.children = addNoteFunction(note.children, parentId).newNotes;
			}

			newNotes.push(note);
		}
	} else {
		notes.push({
			id: idForNewNote,
			title: "",
			children: [],
		});

		newNotes = [...notes];
	}

	return { newNotes: newNotes, idForNewNote: idForNewNote };
}

export function removeNoteFunction(notes: RegularNotes, id: UniqueIdentifier) {
	const newNotes = [];
	const allRemovedNoteIds: UniqueIdentifier[] = [];

	for (const item of notes) {
		if (item.id === id) {
			allRemovedNoteIds.push(id);
			if (item.children.length) {
				const childrenIds = getIdsOfChildren(item.children);
				allRemovedNoteIds.push(...childrenIds);
			}
			continue;
		}

		if (item.children.length) {
			item.children = removeNoteFunction(item.children, id).newNotes;
		}

		newNotes.push(item);
	}

	return { newNotes: newNotes, allRemovedNoteIds: allRemovedNoteIds };
}

// ids of all levels of children
function getIdsOfChildren(notes: RegularNotes) {
	const ids: UniqueIdentifier[] = [];

	for (const item of notes) {
		ids.push(item.id);

		if (item.children.length) {
			const childrenIds = getIdsOfChildren(item.children);
			ids.push(...childrenIds);
		}
	}

	return ids;
}

export function updateNoteTitleFunction(notes: RegularNotes, id: UniqueIdentifier, title: string) {
	const newNotes = [];
	let nameChanged = false;

	for (const item of notes) {
		if (!nameChanged) {
			if (item.id === id) {
				item.title = title;
				nameChanged = true;
			}

			if (item.children.length) {
				item.children = updateNoteTitleFunction(item.children, id, title);
			}
		}

		newNotes.push(item);
	}

	return newNotes;
}

export function togglePropertyFunction(notes: RegularNotes, id: UniqueIdentifier, property: Toggleable) {
	for (const item of notes) {
		if (item.id === id) {
			item[property] = !item[property];
			continue;
		}

		if (item.children.length) {
			item.children = togglePropertyFunction(item.children, id, property);
		}
	}

	return [...notes];
}

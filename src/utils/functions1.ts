import { TreeItems } from "@/components/DndKitSortable/Tree/types";
// import { noteType } from "@/components/folder1/App";
import { NoteId, NoteType } from "@/state/selectedNote";
import { UniqueIdentifier } from "@dnd-kit/core";
import { MutableRefObject } from "react";

export const isToday = (someDate: Date) => {
	const today = new Date();
	return (
		someDate.getDate() === today.getDate() &&
		someDate.getMonth() === today.getMonth() &&
		someDate.getFullYear() === today.getFullYear()
	);
};

export const debounce = (cb: Function, delay = 150, timeoutRef: MutableRefObject<NodeJS.Timeout>) => {
	return (...args: any[]) => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			cb(...args);
		}, delay);
	};
};

export const saveNoteToLocalStorage = (noteContent: string, noteID: NoteId, noteType: NoteType) => {
	if (noteType === "dailyNote") {
		const userData = JSON.parse(window.localStorage.getItem("userDailyNotes")!) || {};
		userData[noteID] = noteContent;
		window.localStorage.setItem("userDailyNotes", JSON.stringify(userData));
	} else {
		const userData = JSON.parse(window.localStorage.getItem("userRegularNotes")!) || {};
		userData[noteID] = noteContent;
		window.localStorage.setItem("userRegularNotes", JSON.stringify(userData));
	}
};

export const deleteNotesFromLocalStorage = (noteIds: UniqueIdentifier[]) => {
	const userData = JSON.parse(window.localStorage.getItem("userRegularNotes")!) || {};
	const updatedDB = Object.fromEntries(Object.entries(userData).filter(([key]) => !noteIds.includes(key)));
	window.localStorage.setItem("userRegularNotes", JSON.stringify(updatedDB));
};

export const returnDateID = (date: Date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const saveNoteTreeToLocalStorage = (noteTree: TreeItems) => {
	window.localStorage.setItem("regularNotesTree", JSON.stringify(noteTree));
};

export const getNoteTree = () => {
	return JSON.parse(window.localStorage.getItem("regularNotesTree")!) || ([] as TreeItems);
};

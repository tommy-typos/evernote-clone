import { noteType } from "@/components/folder1/App";
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

export const saveToLocalStorage = (noteContent: string, noteID: string, noteType: noteType) => {
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

export const returnDateID = (date: Date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

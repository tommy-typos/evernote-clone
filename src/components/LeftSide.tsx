import { CalendarDaysIcon, FolderIcon } from "@heroicons/react/20/solid";
import {  UserCog2 } from "lucide-react";
import { useState } from "react";
import { ProfileAndSettings } from "./folder1/ProfileAndSettings";
import { Notebooks } from "./Notebooks";
import { DailyNotes } from "./DailyNotes";
import { Dispatch, SetStateAction } from "react";
import { NoteIDwithNoteType } from "./App";

type TabType = "settings" | "notebooks" | "dailyNotes";

type Props = {
	selectedNote: NoteIDwithNoteType;
	setSelectedNote: Dispatch<SetStateAction<NoteIDwithNoteType>>;
};

export function LeftSide({ selectedNote, setSelectedNote }: Props) {
	const [openTab, setOpenTab] = useState<TabType>("dailyNotes");

	return (
		<div style={{ minWidth: "384px" }} className="h-full w-96 bg-slate-950 ">
			<div className="flex h-12 border-b border-slate-600">
				<button
					onClick={() => setOpenTab("settings")}
					className="flex flex-grow items-center justify-center p-3 hover:scale-125"
				>
					<UserCog2 className={`h-6 w-6  ${openTab === "settings" ? "text-blue-500" : "text-slate-50"}`} />
				</button>
				<button
					onClick={() => setOpenTab("notebooks")}
					className="flex flex-grow items-center justify-center p-3 hover:scale-125"
				>
					<FolderIcon className={`h-6 w-6  ${openTab === "notebooks" ? "text-blue-500" : "text-slate-50"}`} />
				</button>
				<button
					onClick={() => setOpenTab("dailyNotes")}
					className="flex flex-grow items-center justify-center p-3 hover:scale-125"
				>
					<CalendarDaysIcon
						className={`h-6 w-6  ${openTab === "dailyNotes" ? "text-blue-500" : "text-slate-50"}`}
					/>
				</button>
			</div>
			{openTab === "settings" && <ProfileAndSettings />}
			{openTab === "notebooks" && <Notebooks />}
			{openTab === "dailyNotes" && <DailyNotes setSelectedNote={setSelectedNote} />}
		</div>
	);
}

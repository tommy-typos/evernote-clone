import { CalendarDaysIcon, FolderIcon } from "@heroicons/react/20/solid";
import { UserCog2 } from "lucide-react";
import { useState } from "react";
import { Notebooks } from "../Notebooks";
import { DailyNotes } from "./DailyNotes";
import { Dispatch, SetStateAction } from "react";
// import { NoteIDandTitlewithNoteType } from "./App";
import { twSpacing } from "@/utils/colors/twTheme";
import { TreeItems } from "../DndKitSortable/Tree/types";
import { useSelectedNoteStore } from "@/state/selectedNote";

type TabType = "settings" | "notebooks" | "dailyNotes";

type Props = {
	// selectedNote: NoteIDandTitlewithNoteType;
	// setSelectedNote: Dispatch<SetStateAction<NoteIDandTitlewithNoteType>>;
	items: TreeItems;
	setItems: React.Dispatch<React.SetStateAction<TreeItems>>;
};

export function LeftSide({ 
	// selectedNote, setSelectedNote,
	items, setItems }: Props) {
		// const selectedNote = useSelectedNoteStore(state => state.selectedNote);
		// const setSelectedNote = useSelectedNoteStore(state => state.setSelectedNote);
	const [openTab, setOpenTab] = useState<TabType>("notebooks");

	return (
		<div style={{ minWidth: twSpacing[96], maxWidth: twSpacing[96] }} className="flex h-full flex-col bg-slate-950">
			<div className="flex h-12 items-center border-b border-slate-600 py-2">
				<button
					onClick={() => setOpenTab("settings")}
					className="flex flex-grow items-center justify-center p-3 hover:scale-125"
				>
					<UserCog2 className={`h-5 w-5  ${openTab === "settings" ? "text-blue-500" : "text-slate-50"}`} />
				</button>
				<button
					onClick={() => setOpenTab("notebooks")}
					className="flex flex-grow items-center justify-center p-3 hover:scale-125"
				>
					<FolderIcon className={`h-5 w-5  ${openTab === "notebooks" ? "text-blue-500" : "text-slate-50"}`} />
				</button>
				<button
					onClick={() => setOpenTab("dailyNotes")}
					className="flex flex-grow items-center justify-center p-3 hover:scale-125"
				>
					<CalendarDaysIcon
						className={`h-5 w-5  ${openTab === "dailyNotes" ? "text-blue-500" : "text-slate-50"}`}
					/>
				</button>
			</div>
			{openTab === "settings" && <ProfileAndSettings />}
			{openTab === "notebooks" && (
				<Notebooks
					// selectedNote={selectedNote}
					// setSelectedNote={setSelectedNote}
					items={items}
					setItems={setItems}
				/>
			)}
			{openTab === "dailyNotes" && <DailyNotes 
			// setSelectedNote={setSelectedNote}
			 />}
		</div>
	);
}

function ProfileAndSettings() {
	return <h1 className="p-3  text-center text-slate-50">Profile and Settings</h1>;
}

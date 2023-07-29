import { CalendarDaysIcon, FolderIcon } from "@heroicons/react/20/solid";
import { UserCog2 } from "lucide-react";
import { useState } from "react";
import { Notebooks } from "../Notebooks";
import { DailyNotes } from "./DailyNotes";
import { twSpacing } from "@/utils/colors/twTheme";

type TabType = "settings" | "notebooks" | "dailyNotes";

export function LeftSide() {
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
			{openTab === "notebooks" && <Notebooks />}
			{openTab === "dailyNotes" && <DailyNotes />}
		</div>
	);
}

function ProfileAndSettings() {
	return <h1 className="p-3  text-center text-slate-50">Profile and Settings</h1>;
}

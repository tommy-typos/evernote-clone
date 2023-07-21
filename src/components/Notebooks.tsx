import { SortableTree } from "./DndKitSortable/Tree/SortableTree";
import dynamic from "next/dynamic";
import { Pages } from "./DndKitSortable/Pages/Pages";
import { Layout } from "./DndKitSortable/Pages/Page";
import { SimpleDnd } from "./DndKitSortable/SimpleDnd/SimpleDnd";
import { useEffect } from "react";
import { useSelectedNoteStore } from "@/state/selectedNote";

const SortableTreeClient = dynamic(() => Promise.resolve(SortableTree), {
	ssr: false,
});

const PagesClient = dynamic(() => Promise.resolve(Pages), {
	ssr: false,
});

export function Notebooks() {
	const setSelectedNoteFromLatestRegularNoteId = useSelectedNoteStore(
		(state) => state.setSelectedNoteFromLatestRegularNoteId
	);
	useEffect(() => {
		setSelectedNoteFromLatestRegularNoteId();
	}, []);
	return (
		<div className={`h-full overflow-y-auto p-2  `}>
			<PagesClient layout={Layout.Vertical} />
			<p className="mb-1 text-slate-300">Notes</p>
			<SortableTreeClient collapsible removable />
			{/* <SimpleDnd /> */}
		</div>
	);
}

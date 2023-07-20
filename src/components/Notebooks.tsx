import { SortableTree } from "./DndKitSortable/Tree/SortableTree";
import { TreeItems } from "./DndKitSortable/Tree/types";
import dynamic from "next/dynamic";
import { Pages } from "./DndKitSortable/Pages/Pages";
import { Layout } from "./DndKitSortable/Pages/Page";
import { SimpleDnd } from "./DndKitSortable/SimpleDnd/SimpleDnd";
import { NoteIDandTitlewithNoteType } from "./folder1/App";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getNoteTree } from "@/utils/functions1";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const SortableTreeClient = dynamic(() => Promise.resolve(SortableTree), {
	ssr: false,
});

type Props = {
	selectedNote: NoteIDandTitlewithNoteType;
	setSelectedNote: Dispatch<SetStateAction<NoteIDandTitlewithNoteType>>;
	items: TreeItems;
	setItems: React.Dispatch<React.SetStateAction<TreeItems>>;
};

export function Notebooks({ selectedNote, setSelectedNote, items, setItems }: Props) {
	return (
		<div className={`h-full overflow-y-auto p-2  `}>
			<p className="text-slate-300 mb-1">Notes</p>
			<SortableTreeClient
				items={items}
				setItems={setItems}
				collapsible
				removable
				selectedNote={selectedNote}
				setSelectedNote={setSelectedNote}
			/>
			{/* <Pages layout={Layout.Vertical} /> */}
			{/* <SimpleDnd /> */}
		</div>
	);
}

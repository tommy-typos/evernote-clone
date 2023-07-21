import { TreeItems } from "@/components/DndKitSortable/Tree/types";

export const initialItems: TreeItems = [
	{
		id: "note1id",
		title: "note 1",
		children: [],
	},
	{
		id: "note2id",
		title: "note 2",
		children: [
			{ id: "note3id", title: "note 3", children: [] },
			{ id: "note4id", title: "note 4", children: [] },
			{ id: "note5id", title: "note 5", children: [] },
			{ id: "note6id", title: "note 6", children: [] },
		],
	},
	{
		id: "note7id",
		title: "note 7",
		children: [],
	},
	{
		id: "note8id",
		title: "note 8",
		children: [
			{ id: "note9id", title: "note 9", children: [] },
			{ id: "note10id", title: "note 10", children: [] },
		],
	},
];

export const initialItems2: TreeItems = [
	{
		id: "note1id",
		title: "note 1",
		children: [],
	},
	{
		id: "note2id",
		title: "note 2",
		children: [{ id: "note3id", title: "note 3", children: [] }],
	},
	{
		id: "note4id",
		title: "note 4",
		children: [],
	},
	{
		id: "note5id",
		title: "note 5",
		children: [],
	},
];

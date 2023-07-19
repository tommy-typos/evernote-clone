import { TreeItems } from "@/components/DndKitSortable/Tree/types";


export const initialItems: TreeItems = [
	{
		id: "note1id",
		noteName: "note 1",
		children: [],
	},
	{
		id: "note2id",
		noteName: "note 2",
		children: [
			{ id: "note3id", noteName: "note 3", children: [] },
			{ id: "note4id", noteName: "note 4", children: [] },
			{ id: "note5id", noteName: "note 5", children: [] },
			{ id: "note6id", noteName: "note 6", children: [] },
		],
	},
	{
		id: "note7id",
		noteName: "note 7",
		children: [],
	},
	{
		id: "note8id",
		noteName: "note 8",
		children: [
			{ id: "note9id", noteName: "note 9", children: [] },
			{ id: "note10id", noteName: "note 10", children: [] },
		],
	},
];

export const initialItems2: TreeItems = [
	{
		id: "note1id",
		noteName: "note 1",
		children: [],
	},
	{
		id: "note2id",
		noteName: "note 2",
		children: [{ id: "note3id", noteName: "note 3", children: [] }],
	},
	{
		id: "note4id",
		noteName: "note 4",
		children: [],
	},
	{
		id: "note5id",
		noteName: "note 5",
		children: [],
	},
];



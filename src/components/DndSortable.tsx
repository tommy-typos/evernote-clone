import { SortableTree } from "./DndKitSortable/Tree/SortableTree";
import { TreeItems } from "./DndKitSortable/Tree/types";
import dynamic from "next/dynamic";

const SortableTreeClient = dynamic(() => Promise.resolve(SortableTree), {
	ssr: false,
});

export function DndSortable() {
	return (
		<>
			<SortableTreeClient collapsible removable defaultItems={initialItems2} />
		</>
	);
}

const initialItems2: TreeItems = [
	{
		id: "Home",
		children: [],
	},
	{
		id: "Collections",
		children: [],
	},
	{
		id: "About Us",
		children: [],
	},
];

const initialItems: TreeItems = [
	{
		id: "Home",
		children: [],
	},
	{
		id: "Collections",
		children: [
			{ id: "Spring", children: [] },
			{ id: "Summer", children: [] },
			{ id: "Fall", children: [] },
			{ id: "Winter", children: [] },
		],
	},
	{
		id: "About Us",
		children: [],
	},
	{
		id: "My Account",
		children: [
			{ id: "Addresses", children: [] },
			{ id: "Order History", children: [] },
		],
	},
];

import { SortableTree } from "./DndKitSortable/Tree/SortableTree";
import { TreeItems } from "./DndKitSortable/Tree/types";
import dynamic from "next/dynamic";
import { Pages } from "./DndKitSortable/Pages/Pages";
import { Layout } from "./DndKitSortable/Pages/Page";
import { SimpleDnd } from "./DndKitSortable/SimpleDnd/SimpleDnd";

const SortableTreeClient = dynamic(() => Promise.resolve(SortableTree), {
	ssr: false,
});

export function DndSortable() {
	return (
		<>
			<SortableTreeClient collapsible removable defaultItems={initialItems2} />
			{/* <Pages layout={Layout.Vertical} />
			<SimpleDnd /> */}
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
		children: [{ id: "Spring", children: [] }],
	},
	{
		id: "About Us",
		children: [],
	},
	{
		id: "505",
		children: [],
	},
];

export const initialItems: TreeItems = [
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

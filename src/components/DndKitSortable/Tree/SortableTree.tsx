import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	PointerSensorOptions,
	useSensor,
	useSensors,
	DragStartEvent,
	DragOverlay,
	DragMoveEvent,
	DragEndEvent,
	DragOverEvent,
	MeasuringStrategy,
	DropAnimation,
	defaultDropAnimation,
	UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import {
	buildTree,
	flattenTree,
	getProjection,
	removeItem,
	removeChildrenOf,
	addNewNote,
	setProperty,
} from "./utilities";
import type { FlattenedItem, TreeItems } from "./types";
import { SortableTreeItem } from "./TreeItem";
import { CSS } from "@dnd-kit/utilities";
import { initialItems } from "@/utils/sampleNoteTree";

import { NoteIDandTitlewithNoteType } from "@/components/folder1/App";
import { Dispatch, SetStateAction } from "react";
import { getNoteTree, saveNoteTreeToLocalStorage } from "@/utils/functions1";
import { PlusIcon } from "@heroicons/react/20/solid";

const measuring = {
	droppable: {
		strategy: MeasuringStrategy.Always,
	},
};

const dropAnimationConfig: DropAnimation = {
	keyframes({ transform }) {
		return [
			{ opacity: 1, transform: CSS.Transform.toString(transform.initial) },
			{
				opacity: 0,
				transform: CSS.Transform.toString({
					...transform.final,
					x: transform.final.x + 5,
					y: transform.final.y + 5,
				}),
			},
		];
	},
	easing: "ease-out",
	sideEffects({ active }) {
		active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: defaultDropAnimation.duration,
			easing: defaultDropAnimation.easing,
		});
	},
};

interface Props {
	collapsible?: boolean;
	// defaultItems?: TreeItems;
	indentationWidth?: number;
	removable?: boolean;
	selectedNote: NoteIDandTitlewithNoteType;
	setSelectedNote: Dispatch<SetStateAction<NoteIDandTitlewithNoteType>>;
	items: TreeItems;
	setItems: React.Dispatch<React.SetStateAction<TreeItems>>;
}

const customPointerSensorOptions: PointerSensorOptions = {
	activationConstraint: {
		delay: 150,
		tolerance: 0,
	},
};

export function SortableTree({
	collapsible,
	// defaultItems = initialItems,
	indentationWidth = 50,
	removable,
	selectedNote,
	setSelectedNote,
	items,
	setItems,
}: Props) {
	// const [items, setItems] = useState<TreeItems>(() => getNoteTree());
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
	const [offsetLeft, setOffsetLeft] = useState(0);

	const flattenedItems = useMemo(() => {
		const flattenedTree = flattenTree(items);
		const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
			(acc, { children, collapsed, id }) => (collapsed && children.length ? [...acc, id] : acc),
			[]
		);

		return removeChildrenOf(flattenedTree, activeId ? [activeId, ...collapsedItems] : collapsedItems);
	}, [activeId, items]);

	const projected =
		activeId && overId ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth) : null;

	const sensors = useSensors(useSensor(PointerSensor, customPointerSensorOptions));

	const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);
	const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;

	// console.log(JSON.stringify(items, null, 2));

	useEffect(() => {
		saveNoteTreeToLocalStorage(items);
	}, [items]);

	return (
		<>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				measuring={measuring}
				onDragStart={handleDragStart}
				onDragMove={handleDragMove}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
					{flattenedItems.map(({ id, children, collapsed, depth, noteName }) => (
						<SortableTreeItem
							key={id}
							id={id}
							noteName={noteName}
							noteId={id}
							depth={id === activeId && projected ? projected.depth : depth}
							indentationWidth={indentationWidth}
							collapsed={Boolean(collapsed && children.length)}
							onCollapse={collapsible && children.length ? () => handleCollapse(id) : undefined}
							onRemove={removable ? () => handleRemove(id) : undefined}
							onAddChild={() => handleAddChild(id)}
							selectedNote={selectedNote}
							setSelectedNote={setSelectedNote}
						/>
					))}
					{createPortal(
						<DragOverlay dropAnimation={dropAnimationConfig}>
							{activeId && activeItem ? (
								<SortableTreeItem
									id={activeId}
									depth={activeItem.depth}
									clone
									// value={activeId.toString()}
									noteName={activeItem.noteName ? activeItem.noteName : "Untitled"}
									indentationWidth={indentationWidth}
									// setSelectedNote={null}
								/>
							) : null}
						</DragOverlay>,
						document.body
					)}
				</SortableContext>
			</DndContext>
			<button className="flex w-full  items-center text-slate-50" onClick={() => handleAddTopLevelNote()}>
				<PlusIcon className="mr-1 h-5 w-5" />
				Add a note
			</button>
		</>
	);

	function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
		setActiveId(activeId);
		setOverId(activeId);

		document.body.style.setProperty("cursor", "grabbing");
	}

	function handleDragMove({ delta }: DragMoveEvent) {
		setOffsetLeft(delta.x);
	}

	function handleDragOver({ over }: DragOverEvent) {
		setOverId(over?.id ?? null);
	}

	function handleDragEnd({ active, over }: DragEndEvent) {
		resetState();

		if (projected && over) {
			const { depth, parentId } = projected;
			const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)));
			const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
			const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
			const activeTreeItem = clonedItems[activeIndex];

			clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

			const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
			const newItems = buildTree(sortedItems);

			setItems(newItems);
		}
	}

	function handleDragCancel() {
		resetState();
	}

	function resetState() {
		setOverId(null);
		setActiveId(null);
		setOffsetLeft(0);

		document.body.style.setProperty("cursor", "");
	}

	function handleRemove(id: UniqueIdentifier) {
		setItems((items) => removeItem(items, id));
	}

	function handleAddChild(id: UniqueIdentifier) {
		setItems((items) => addNewNote(items, id, setSelectedNote));
	}

	function handleAddTopLevelNote() {
		setItems((items) => addNewNote(items, null, setSelectedNote));
	}

	function handleCollapse(id: UniqueIdentifier) {
		setItems((items) =>
			setProperty(items, id, "collapsed", (value) => {
				return !value;
			})
		);
	}
}

import React, { useMemo, useState } from "react";
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
	Modifier,
	defaultDropAnimation,
	UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import {
	buildTree,
	flattenTree,
	getProjection,
	getChildCount,
	removeItem,
	removeChildrenOf,
	setProperty,
} from "./utilities";
import type { FlattenedItem, TreeItems } from "./types";
import { SortableTreeItem } from "./TreeItem";
import { CSS } from "@dnd-kit/utilities";
import { initialItems } from "@/components/DndSortable";

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
	defaultItems?: TreeItems;
	indentationWidth?: number;
	indicator?: boolean;
	removable?: boolean;
}

const customPointerSensorOptions: PointerSensorOptions = {
	activationConstraint: {
		delay: 150,
		tolerance: 0,
	},
};

export function SortableTree({
	collapsible,
	defaultItems = initialItems,
	indicator = false,
	indentationWidth = 50,
	removable,
}: Props) {
	const [items, setItems] = useState(() => defaultItems);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
	const [offsetLeft, setOffsetLeft] = useState(0);

	const flattenedItems = useMemo(() => {
		const flattenedTree = flattenTree(items);
		const collapsedItems = flattenedTree.reduce<string[]>(
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

	return (
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
				{flattenedItems.map(({ id, children, collapsed, depth }) => (
					<SortableTreeItem
						key={id}
						id={id}
						value={id}
						depth={id === activeId && projected ? projected.depth : depth}
						indentationWidth={indentationWidth}
						indicator={indicator}
						collapsed={Boolean(collapsed && children.length)}
						onCollapse={collapsible && children.length ? () => handleCollapse(id) : undefined}
						onRemove={removable ? () => handleRemove(id) : undefined}
					/>
				))}
				{createPortal(
					<DragOverlay
						dropAnimation={dropAnimationConfig}
						modifiers={indicator ? [adjustTranslate] : undefined}
					>
						{activeId && activeItem ? (
							<SortableTreeItem
								id={activeId}
								depth={activeItem.depth}
								clone
								childCount={getChildCount(items, activeId) + 1}
								value={activeId.toString()}
								indentationWidth={indentationWidth}
							/>
						) : null}
					</DragOverlay>,
					document.body
				)}
			</SortableContext>
		</DndContext>
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

	function handleCollapse(id: UniqueIdentifier) {
		setItems((items) =>
			setProperty(items, id, "collapsed", (value) => {
				return !value;
			})
		);
	}
}

const adjustTranslate: Modifier = ({ transform }) => {
	return {
		...transform,
		y: transform.y - 25,
	};
};

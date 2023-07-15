import React, { CSSProperties } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TreeItem, Props as TreeItemProps } from "./TreeItem";
// import {iOS} from '../../utilities';

interface Props extends TreeItemProps {
	id: UniqueIdentifier;
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
	isSorting || wasDragging ? false : true;

export function SortableTreeItem({ id, depth, ...props }: Props) {
	const {
		attributes,
		isDragging,
		isSorting,
		listeners,
		setDraggableNodeRef,
		setDroppableNodeRef,
		transform,
		transition,
		isOver,
	} = useSortable({
		id,
		animateLayoutChanges,
	});
	const style: CSSProperties = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<TreeItem
			ref={setDraggableNodeRef}
			wrapperRef={setDroppableNodeRef}
			style={style}
			depth={depth}
			ghost={isDragging}
			//   disableSelection={iOS}
			disableSelection={/iPad|iPhone|iPod/.test(navigator.platform)}
			disableInteraction={isSorting}
			handleProps={{
				...attributes,
				...listeners,
			}}
			{...props}
			isOver={isOver}
		/>
	);
}

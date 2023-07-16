import React, { useEffect, useState } from "react";
import {
	DndContext,
	DragMoveEvent,
	DragEndEvent,
	UniqueIdentifier,
	DragStartEvent,
	DragOverEvent,
} from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export type CloseTo = "top" | "center" | "bottom" | null;

type CustomOver = {
	overId: UniqueIdentifier | null;
	closeTo: CloseTo;
};

export function SimpleDnd() {
	const [parent, setParent] = useState<UniqueIdentifier | null>(null);
	const [closeTo, setCloseTo] = useState<CloseTo>(null);
	// const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
	// const [listenToMouse, setListenToMouse] = useState(false);

	// useEffect(() => {
	// 	if (listenToMouse) {
	// 		document.addEventListener("mousemove", handleMouseMove);
	// 	} else {
	// 		document.removeEventListener("mousemove", handleMouseMove);
	// 	}
	// 	return () => {
	// 		document.removeEventListener("mousemove", handleMouseMove);
	// 	};
	// }, [listenToMouse]);

	useEffect(() => {
		// console.log(closeTo);
	}, [closeTo]);

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragMove={handleDragMove}
			onDragOver={handleDragOver}
			onDragCancel={handleDragCancel}
		>
			{parent === null ? <Draggable id="draggable" /> : null}

			{["A", "B", "C"].map((id) => (
				<Droppable key={id} id={id} closeTo={closeTo}>
					{parent === id ? <Draggable id="draggable" /> : "Drop here"}
				</Droppable>
			))}
		</DndContext>
	);

	function handleMouseMove(event: MouseEvent) {
		// console.log("event.offsetY", event.offsetY) // useless
		// 	console.log("event.movementY", event.movementY) // useless
		// 	console.log("event.clientY", event.clientY)
		// 	console.log("event.pageY", event.pageY)
		// 	console.log("event.y", event.y)
	}

	function handleDragStart({}: DragStartEvent) {
		// setListenToMouse(true);
	}

	function handleDragMove({ over, active }: DragMoveEvent) {
		if (!over) {
			// setListenToMouse(false);
			setCloseTo(null);
		} else {
			console.log("over id", over.id);
			let draggableCenterY;
			if (active.rect.current.translated) {
				draggableCenterY = active.rect.current.translated?.top + active.rect.current.translated?.height / 2;
			}
			let overCenterY;
			let overHeight;
			let overTop;
			if (over) {
				overCenterY = over.rect.top + over.rect.height / 2;
				overHeight = over.rect.height;
				overTop = over.rect.top;
			}

			if (draggableCenterY && overHeight && overTop && overCenterY) {
				if (
					draggableCenterY >= overTop + overHeight / 4 &&
					draggableCenterY <= overTop + (overHeight / 4) * 3
				) {
					setCloseTo("center");
				} else if (draggableCenterY < overCenterY) {
					setCloseTo("top");
				} else if (draggableCenterY > overCenterY) {
					setCloseTo("bottom");
				} 
				
				// else if (draggableCenterY >= overTop && draggableCenterY <= overTop + overHeight / 4) {
				// 	setCloseTo("top");
				// } else if (
				// 	draggableCenterY >= overTop + (overHeight / 4) * 3 &&
				// 	draggableCenterY <= overTop + overHeight
				// ) {
				// 	setCloseTo("bottom");
				// } else {
				// 	setCloseTo(null);
				// }
			}
		}
	}

	function handleDragOver({ over }: DragOverEvent) {
		// setListenToMouse(true);
	}

	function handleDragCancel() {
		// setListenToMouse(false);
	}

	function handleDragEnd(event: DragEndEvent) {
		const { over } = event;
		setParent(over ? over.id : null);
		// setListenToMouse(false);
	}
}

import React from "react";
import { useDroppable, UniqueIdentifier } from "@dnd-kit/core";
import { CloseTo } from "./SimpleDnd";

export function Droppable({
	closeTo,
	id,
	children,
}: {
	closeTo: CloseTo;
	id: UniqueIdentifier;
	children: JSX.Element | string;
}) {
	const { isOver, setNodeRef, over, active, rect } = useDroppable({
		id: id,
	});
	const style = {
		borderTop: isOver && closeTo === "top" ? "5px solid blue" : undefined,
		backgroundColor: isOver && closeTo === "center" ? "green" : undefined,
		borderBottom: isOver && closeTo === "bottom" ? "5px solid blue" : undefined,
	};
	// console.log(over);
	// console.log(active);

	let draggableCenterY;

	if (active?.rect.current.translated) {
		draggableCenterY = active.rect.current.translated?.top + active.rect.current.translated?.height / 2;
	}
	// console.log("draggableCenterY: ", draggableCenterY);
	// console.log(rect)

	return (
		<div ref={setNodeRef} style={style} className="m-1 mx-4 !box-border border p-4 py-5 text-white ">
			<p>{children}</p>
		</div>
	);
}

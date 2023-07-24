import React, { forwardRef, HTMLAttributes } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import classNames from "classnames";

import styles from "./Page.module.css";
import { useSelectedNoteStore } from "@/state/selectedNote";

export enum Position {
	Before = -1,
	After = 1,
}

export enum Layout {
	Horizontal = "horizontal",
	Vertical = "vertical",
	Grid = "grid",
}

export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
	active?: boolean;
	clone?: boolean;
	insertPosition?: Position;
	id: UniqueIdentifier;
	title: string;
	index?: number;
	layout: Layout;
}

export const Page = forwardRef<HTMLLIElement, Props>(function Page(
	{ id, title, index, active, clone, insertPosition, layout, style, ...props },
	ref
) {
	const selectedNote = useSelectedNoteStore((state) => state.selectedNote);
	const setSelectedNote = useSelectedNoteStore((state) => state.setSelectedNote);

	return (
		<li
			className={classNames(
				styles.Wrapper,
				active && styles.active,
				clone && styles.clone,
				insertPosition === Position.Before && styles.insertBefore,
				insertPosition === Position.After && styles.insertAfter,
				layout === Layout.Vertical && styles.vertical
			)}
			style={style}
			ref={ref}
			onClick={() => setSelectedNote({ id: id, type: "regularNote", title: title })}
		>
			<button
				className={classNames(
					styles.Page,
					"pl-4 text-left text-white",
					selectedNote?.id === id && "bg-slate-700"
				)}
				data-id={id.toString()}
				{...props}
			>
				{title ? title : "Untitled"}
			</button>
		</li>
	);
});

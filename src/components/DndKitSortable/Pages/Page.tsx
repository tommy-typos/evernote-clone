import React, { forwardRef, HTMLAttributes } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import classNames from "classnames";

import styles from "./Page.module.css";

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
	index?: number;
	layout: Layout;
}

export const Page = forwardRef<HTMLLIElement, Props>(function Page(
	{ id, index, active, clone, insertPosition, layout, style, ...props },
	ref
) {
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
		>
			<button className={classNames(styles.Page, "bg-slate-700  text-white")} data-id={id.toString()} {...props}>
				{id}
			</button>
		</li>
	);
});


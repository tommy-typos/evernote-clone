import React, { forwardRef, CSSProperties } from "react";
import classNames from "classnames";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	active?: {
		fill: string;
		background: string;
	};
	cursor?: CSSProperties["cursor"];
}

export const Action = forwardRef<HTMLButtonElement, Props>(({ active, className, cursor, style, ...props }, ref) => {
	return (
		<button
			ref={ref}
			{...props}
			className={classNames(
				className,
				"cursor-[var(--cursor, pointer)] touch-none appearance-none outline-none hover:fill-slate-400"
			)}
			tabIndex={0}
			style={
				{
					...style,
					cursor,
					"--fill": active?.fill,
					"--background": active?.background,
					WebkitTapHighlightColor: "transparent",
				} as CSSProperties
			}
		/>
	);
});

Action.displayName = "Action";

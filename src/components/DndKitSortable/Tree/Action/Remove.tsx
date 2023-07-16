import React from "react";

import { Action, ActionProps } from ".";
import { XMarkIcon } from "@heroicons/react/20/solid";

export function Remove(props: ActionProps) {
	return (
		<Action
			{...props}
			active={{
				fill: "rgba(255, 70, 70, 0.95)",
				background: "rgba(255, 70, 70, 0.1)",
			}}
		>
			<XMarkIcon className="h-4 w-4" />
		</Action>
	);
}

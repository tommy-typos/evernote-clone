import { Action, ActionProps } from ".";
import { PlusIcon } from "@heroicons/react/20/solid";

export function AddChild(props: ActionProps) {
	return (
		<Action
			{...props}
			active={{
				fill: "rgba(255, 70, 70, 0.95)",
				background: "rgba(255, 70, 70, 0.1)",
			}}
			className={`ml-2 ${props.className ? props.className : ""}`}
		>
			<PlusIcon className="h-4 w-4" />
		</Action>
	);
}

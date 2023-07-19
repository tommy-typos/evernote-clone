import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useRef, useState } from "react";
import { ControlledMenu, useClick } from "@szhsin/react-menu";

export default function Deneme() {
	const [isContextOpen, setIsContextOpen] = useState(false);
	const [contextAnchorPoint, setContextAnchorPoint] = useState({ x: 0, y: 0 });

	// console.log(anchorPoint.x);
	return (
		<div
			onContextMenu={(e) => {
				e.preventDefault();
				setContextAnchorPoint({ x: e.clientX, y: e.clientY });
				setIsContextOpen(true);
			}}
			className={"w-full bg-blue-400 py-2"}
		>
			Right click to open context menu
			<button
				className="ml-10 bg-red-400"
				onClick={(e) => {
					setContextAnchorPoint({ x: e.clientX, y: e.clientY });
					setIsContextOpen(true);
				}}
			>
				click
			</button>
			<ControlledMenu
				anchorPoint={contextAnchorPoint}
				state={isContextOpen ? "open" : "closed"}
				direction="right"
				onClose={() => setIsContextOpen(false)}
				position="initial"
			>
				<MenuItem>Cut</MenuItem>
				<MenuItem>Copy</MenuItem>
				<MenuItem>Paste</MenuItem>
			</ControlledMenu>
		</div>
	);
}

import classNames from "classnames";
import { DndSortable } from "./DndSortable";

export function Notebooks() {
	return (
		<div className="h-full overflow-y-auto bg-slate-950 p-2">
			<DndSortable />
		</div>
	);
}

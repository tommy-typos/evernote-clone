import classNames from "classnames";
import { DndSortable } from "./DndSortable";

export function Notebooks() {
	return (
		<div className="h-full overflow-y-auto bg-orange-500 p-2">
			<DndSortable />
		</div>
	);
}

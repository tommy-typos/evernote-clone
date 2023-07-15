import classNames from "classnames";
import styles from "./Notebooks.module.css";

export function Notebooks() {
	return (
		<div className="h-full overflow-y-auto bg-yellow-600 pb-28">
			<h1 className="p-3 text-center text-slate-50">Notebooks</h1>
			<h1 className={classNames(styles.Wrapper)}>
				hello <span>world</span>
			</h1>
		</div>
	);
}

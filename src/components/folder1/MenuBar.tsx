import { Editor } from "@tiptap/core";

type Props = {
	editor: Editor | null;
};

const MenuBar = ({ editor }: Props) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="MenuBar p-5">
			<style>{`
				.MenuBar button {
					padding: 5px;
					margin: 5px;
					border: 1px solid black;
				}
				.is-active {
					background-color: gray;
				}
			`}</style>
		</div>
	);
};

export default MenuBar;

import { Editor } from "@tiptap/react";

type Props = {
	editor: Editor | null;
};

const MenuBar = ({ editor }: Props) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="MenuBar p-5">
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={editor.isActive("code") ? "is-active" : ""}
			>
				code
			</button>
			<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
			<button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>

			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={editor.isActive("codeBlock") ? "is-active" : ""}
			>
				code block
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive("blockquote") ? "is-active" : ""}
			>
				blockquote
			</button>
			<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>horizontal rule</button>
			<button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button>

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

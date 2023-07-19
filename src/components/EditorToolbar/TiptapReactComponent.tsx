import { Node } from "@tiptap/core";
import { nanoid } from "nanoid";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { useEffect, useState } from "react";
import { NodeViewWrapper, mergeAttributes } from "@tiptap/react";

// TODO: add new line after react component everytime so continuing to type would be easier.

function TiptapButton(props: any) {
	const [count, setCount] = useState(props.node.attrs.count as number);
	const [customId, setCustomId] = useState(props.node.attrs.customId as string);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (customId === "") {
				setCustomId(() => {
					const tempId = nanoid();
					props.updateAttributes({
						customId: tempId,
					});
					return tempId;
				});
			} else {
				// this element has already been created before. imagine it is a task item.
				// check if it still exists on database or not, and also update attributes if it exists but changed in task view.
				// TODO: delete this node from tiptap if it is deleted from database.
			}
		}, 0);

		return () => clearTimeout(timeOut);
	}, []);
	return (
		<NodeViewWrapper className="react-component" data-fuck="fuck">
			<button
				className="my-2 w-96 bg-blue-200 px-1 py-2 hover:bg-blue-300"
				onClick={() => {
					props.updateAttributes({
						count: props.node.attrs.count + 1,
					});
					setCount((prev) => prev + 1);
				}}
			>
				<span className="text-slate-400">Clicked:</span> {count}x.&#160;&#160;&#160;
				<span className="text-slate-400">ID:</span> {customId}
			</button>
		</NodeViewWrapper>
	);
}

// TODO: refactor the entire node
const TiptapReactNode = Node.create({
	name: "reactComponent",

	group: "block",

	atom: true,

	addAttributes() {
		return {
			count: {
				default: 0,
			},
			customId: {
				default: "",
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "react-component",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["react-component", mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return ReactNodeViewRenderer(TiptapButton);
	},
});

export default TiptapReactNode;

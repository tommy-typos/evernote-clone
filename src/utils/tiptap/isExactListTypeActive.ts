import { getNodeType, NodeRange } from "@tiptap/react";
import { Editor } from "@tiptap/core";

export function isExactListTypeActive(editor: Editor, typeOrName: "bulletList" | "orderedList" | "taskList"): boolean {
	const state = editor.state;
	const { from, to, empty } = state.selection;
	const type = typeOrName ? getNodeType(typeOrName, state.schema) : null;

	const nodeRanges: NodeRange[] = [];

	state.doc.nodesBetween(from, to, (node, pos) => {
		if (node.isText) {
			return;
		}

		const relativeFrom = Math.max(from, pos);
		const relativeTo = Math.min(to, pos + node.nodeSize);

		nodeRanges.push({
			node,
			from: relativeFrom,
			to: relativeTo,
		});
	});

	const selectionRange = to - from;
	const matchedNodeRanges = nodeRanges.slice(-3).filter((nodeRange) => {
		if (!type) {
			return true;
		}
		return type.name === nodeRange.node.type.name;
	});

	if (empty) {
		return !!matchedNodeRanges.length;
	}

	const range = matchedNodeRanges.reduce((sum, nodeRange) => sum + nodeRange.to - nodeRange.from, 0);

	return range >= selectionRange;
}

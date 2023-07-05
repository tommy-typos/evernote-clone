import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import MenuBar from "./MenuBar";
import TiptapReactNode from "./TiptapReactComponent";
import { ToolbarComponent } from "../Toolbar";
import React, { useState } from "react";
import { getFontColorsDarkMode, getHighlightColorsDarkMode, ColorHex } from "@/utils/evernoteColors";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import { Editor } from "@tiptap/core";

const TabKeepsFocusExtension = Extension.create({
	name: "tabKeepsFocus",
	addKeyboardShortcuts() {
		return {
			Tab: () => {
				return this.editor.commands.focus();
			},
		};
	},
});

export type ColorHexOrAuto = ColorHex | `auto0.${string}`;

export function generateAuto() {
	return "auto" + Math.random();
}

const Tiptap = () => {
	const [headingLevel, setHeadingLevel] = useState<string>("");
	const [fontColor, setFontColor] = useState<ColorHexOrAuto>(generateAuto() as ColorHexOrAuto);
	const [highlightColor, setHighlightColor] = useState<ColorHex>(getHighlightColorsDarkMode()[0].twHex);
	const [selectionHasColor, setSelectionHasColor] = useState(false);

	const editor = useEditor({
		extensions: [
			TiptapReactNode,
			TabKeepsFocusExtension,
			// TODO: add a new line paragraph after horizontal rule
			// TODO: make headings bold as default so that we can toggle bold on and off
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
			Underline,
			Highlight.configure({
				multicolor: true,
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			TextStyle,
			Color,
			Link.configure({
				openOnClick: true,
			}),
		],
		onUpdate({ editor }) {
			stuffTodo(editor);
		},

		onSelectionUpdate({ editor }) {
			if (editor.getAttributes("textStyle").color) {
				setSelectionHasColor(true);
			} else {
				setSelectionHasColor(false);
			}
			stuffTodo(editor);
		},
		content: `<p>Hello World! 🌎️</p>`,
		// content: `<p>Hello World! 🌎️</p><react-component count=100></react-component>`,
		parseOptions: {
			preserveWhitespace: "full",
		},
	});

	function stuffTodo(editor: Editor) {
		let tempCurrentHeading = "";
		if (editor.isActive("heading", { level: 1 })) tempCurrentHeading = "heading-1";
		else if (editor.isActive("heading", { level: 2 })) tempCurrentHeading = "heading-2";
		else if (editor.isActive("heading", { level: 3 })) tempCurrentHeading = "heading-3";
		else if (editor.isActive("paragraph")) tempCurrentHeading = "paragraph";
		setHeadingLevel(tempCurrentHeading);

		let activeColorFound = false;
		for (let tempFontColor of getFontColorsDarkMode()) {
			if (
				editor.isActive("textStyle", { color: tempFontColor.twHex }) ||
				editor.isActive("textStyle", { color: tempFontColor.twRGB })
			) {
				setFontColor(tempFontColor.twHex);
				activeColorFound = true;
				break;
			}
		}
		if (!activeColorFound) setFontColor(generateAuto() as ColorHexOrAuto);

		for (let tempHighlightColor of getHighlightColorsDarkMode()) {
			if (editor.isActive("highlight", { color: tempHighlightColor.twHex })) {
				setHighlightColor(tempHighlightColor.twHex);
				break;
			}
		}
	}

	return (
		<>
			<ToolbarComponent
				selectionHasColor={selectionHasColor}
				editor={editor}
				headingLevel={headingLevel}
				fontColor={fontColor}
				setFontColor={setFontColor}
				highlightColor={highlightColor}
				setHighlightColor={setHighlightColor}
			/>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
};

export default Tiptap;

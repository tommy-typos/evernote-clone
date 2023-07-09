import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TiptapReactNode from "./folder1/TiptapReactComponent";
import { ToolbarComponent } from "./EditorToolbar/Toolbar";
import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import { getFontColorsDarkMode, getHighlightColorsDarkMode, ColorHex } from "@/utils/evernoteColors";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";
import { NoteIDwithNoteType, noteType } from "./App";
import { debounce, isToday, saveToLocalStorage } from "@/utils/functions1";

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

const formatOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };

type Props = {
	selectedNote: NoteIDwithNoteType;
};

const Tiptap = ({ selectedNote }: Props) => {
	const [headingLevel, setHeadingLevel] = useState<string>("");
	const [fontColor, setFontColor] = useState<ColorHexOrAuto>(generateAuto() as ColorHexOrAuto);
	const [highlightColor, setHighlightColor] = useState<ColorHex>(getHighlightColorsDarkMode()[0].twHex);
	const [selectionHasColor, setSelectionHasColor] = useState(false);

	const timeoutRef = useRef<MutableRefObject<NodeJS.Timeout>>(null);

	let noteContent = useRef<string>();
	let noteID = useRef<string>();
	let noteType = useRef<noteType>();
	let noteTitle = useRef<string>();
	let ifDailyThenIsToday = useRef<boolean>();

	useEffect(() => {
		ifDailyThenIsToday.current = false;
		if (selectedNote) {
			noteType.current = selectedNote.split(",")[0] as noteType;
			noteID.current = selectedNote.split(",")[1];

			if (noteType.current === "dailyNote") {
				const userDailyNoteData = JSON.parse(window.localStorage.getItem("userDailyNotes")!) || {};
				noteContent.current = userDailyNoteData[noteID.current] ?? "";

				let temp = noteID.current.split("-");
				noteTitle.current = new Date(
					parseInt(temp[0]),
					parseInt(temp[1]) - 1,
					parseInt(temp[2])
				).toLocaleDateString("en-US", formatOptions);
				ifDailyThenIsToday.current = isToday(
					new Date(parseInt(temp[0]), parseInt(temp[1]) - 1, parseInt(temp[2]))
				);
			} else {
				const userRegularNoteData = JSON.parse(window.localStorage.getItem("userRegularNotes")!) || {};
				noteContent.current = userRegularNoteData[noteID.current] ?? "";

				noteTitle.current = "note title";
			}
		}
	}, [selectedNote]);

	//TODO: even selection changes cause this componenet re-render every time.
	const editor = useEditor(
		{
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
				Placeholder.configure({
					placeholder: "Start writing",
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

				debounce(
					() => {
						saveToLocalStorage(editor.getHTML(), noteID.current!, noteType.current!);
					},
					undefined,
					timeoutRef as any
				)();
			},

			onSelectionUpdate({ editor }) {
				if (editor.getAttributes("textStyle").color) {
					setSelectionHasColor(true);
				} else {
					setSelectionHasColor(false);
				}
				stuffTodo(editor);
			},
			content: noteContent.current,
			// content: `<p>Hello World! 🌎️</p>`,
			// content: `<p>Hello World! 🌎️</p><react-component count=100></react-component>`,
			parseOptions: {
				preserveWhitespace: "full",
			},
		},
		[noteContent.current, noteID.current, selectedNote]
	);

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
		<div className="flex h-full flex-grow flex-col">
			<ToolbarComponent
				selectionHasColor={selectionHasColor}
				editor={editor}
				headingLevel={headingLevel}
				fontColor={fontColor}
				setFontColor={setFontColor}
				highlightColor={highlightColor}
				setHighlightColor={setHighlightColor}
			/>
			<h1
				className={`${
					ifDailyThenIsToday.current ? " text-blue-500" : " text-slate-50"
				} bg-slate-900 pl-12 pt-6 text-4xl`}
			>
				{noteTitle.current}
			</h1>

			<EditorContent editor={editor} className="h-full bg-slate-900" />
		</div>
	);
};

export default Tiptap;

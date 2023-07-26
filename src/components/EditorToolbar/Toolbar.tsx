import { Editor } from "@tiptap/core";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { Dispatch, SetStateAction, forwardRef } from "react";
import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/20/solid";
import { ColorSelector } from "./FontColorSelector";
import { Highlighter, ListOrdered, List, ListChecks} from "lucide-react";
import {
	FontBoldIcon,
	FontItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	TextAlignLeftIcon,
	TextAlignCenterIcon,
	TextAlignRightIcon,
	QuoteIcon,
	DividerHorizontalIcon,
} from "@radix-ui/react-icons";
import { ColorHex } from "@/utils/colors/evernoteColors";
import { ColorHexOrAuto } from "../folder1/Tiptap";
import { HighlightSelector } from "./HighlightSelector";
import { HeadingLevelSelector } from "./HeadingSelector";
import { isExactListTypeActive } from "../../utils/tiptap/isExactListTypeActive";

type Props = {
	editor: Editor | null;
	headingLevel: string;
	fontColor: string;
	setFontColor: Dispatch<SetStateAction<ColorHexOrAuto>>;
	highlightColor: string;
	setHighlightColor: Dispatch<SetStateAction<ColorHex>>;
	selectionHasColor: boolean;
};

function ToolbarSeparator() {
	return <Toolbar.Separator style={{ minWidth: "1px" }} className="mx-2 h-full w-px bg-slate-600" />;
}

const iconClasses = " h-5 w-5 text-slate-50 ";

export function ToolbarComponent({
	fontColor,
	setFontColor,
	editor,
	headingLevel,
	highlightColor,
	setHighlightColor,
	selectionHasColor,
}: Props) {
	if (!editor) {
		return (
			<div className="flex h-12 items-center bg-slate-900 pl-3 text-slate-400">
				Focus on note in order to start to edit
			</div>
		);
	}

	return (
		<>
			<Toolbar.Root className="flex h-12 items-center border-b border-b-slate-600 bg-slate-900 py-2 pl-2">
				<>
					<ToolbarButtonWithTooltip
						tooltipContent="Undo"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}
					>
						<ArrowUturnLeftIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Redo"
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().chain().focus().redo().run()}
					>
						<ArrowUturnRightIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>
				</>

				<ToolbarSeparator />

				<HeadingLevelSelector editor={editor} headingLevel={headingLevel} />

				<ToolbarSeparator />

				<>
					<ColorSelector
						selectionHasColor={selectionHasColor}
						setFontColor={setFontColor}
						editor={editor}
						fontColor={fontColor}
					/>

					<ToolbarButtonWithTooltip
						tooltipContent="Bold"
						onClick={() => editor.chain().focus().toggleBold().run()}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						isActive={editor.isActive("bold")}
					>
						<FontBoldIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Italic"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						isActive={editor.isActive("italic")}
					>
						<FontItalicIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Underline"
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						disabled={!editor.can().chain().focus().toggleUnderline().run()}
						isActive={editor.isActive("underline")}
					>
						<UnderlineIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Strikethrough"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						disabled={!editor.can().chain().focus().toggleStrike().run()}
						isActive={editor.isActive("strike")}
					>
						<StrikethroughIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<div className="flex h-full items-center">
						<ToolbarButtonWithTooltip
							tooltipContent="Highlight"
							onClick={() => editor.chain().focus().toggleHighlight({ color: highlightColor }).run()}
							disabled={!editor.can().chain().focus().toggleHighlight().run()}
							style={{
								backgroundColor: editor.isActive("highlight") ? highlightColor : "var(--slate-900)",
							}}
						>
							<Highlighter
								style={{
									stroke: editor.isActive("highlight") ? "var(--slate-900)" : highlightColor,
								}}
								className="mx-2 h-5 w-5"
							/>
						</ToolbarButtonWithTooltip>
						<HighlightSelector
							editor={editor}
							isActive={editor.isActive("highlight")}
							highlightColor={highlightColor}
							setHighlightColor={setHighlightColor}
						/>
					</div>
				</>

				<ToolbarSeparator />

				{/* TODO: add disabled conditions for list buttons */}
				<>
					<ToolbarButtonWithTooltip
						tooltipContent="Bulleted list"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						isActive={isExactListTypeActive(editor, "bulletList") && headingLevel !== ""}
					>
						<List className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Numbered list"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						isActive={isExactListTypeActive(editor, "orderedList") && headingLevel !== ""}
					>
						<ListOrdered className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Checklist"
						onClick={() => editor.chain().focus().toggleTaskList().run()}
						isActive={isExactListTypeActive(editor, "taskList") && headingLevel !== ""}
					>
						<ListChecks className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>
				</>

				<ToolbarSeparator />

				{/* TODO: add disabled conditions for align buttons */}
				<>
					<ToolbarButtonWithTooltip
						tooltipContent="Align left"
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						isActive={editor.isActive({ textAlign: "left" }) && headingLevel !== ""}
					>
						<TextAlignLeftIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Align center"
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						isActive={editor.isActive({ textAlign: "center" }) && headingLevel !== ""}
					>
						<TextAlignCenterIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>

					<ToolbarButtonWithTooltip
						tooltipContent="Align right"
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						isActive={editor.isActive({ textAlign: "right" }) && headingLevel !== ""}
					>
						<TextAlignRightIcon className={`${iconClasses}`} />
					</ToolbarButtonWithTooltip>
				</>

				<ToolbarSeparator />

				<ToolbarButtonWithTooltip
					tooltipContent="Quote"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					isActive={editor.isActive("blockquote")}
				>
					<QuoteIcon className={`${iconClasses}`} />
				</ToolbarButtonWithTooltip>

				<ToolbarButtonWithTooltip
					tooltipContent="Horizontal divider"
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
				>
					<DividerHorizontalIcon className={`${iconClasses}`} />
				</ToolbarButtonWithTooltip>
			</Toolbar.Root>
		</>
	);
}

// TODO: figure out types, where to spread props and forwardedRef
const ToolbarButtonWithTooltip = React.forwardRef<any, any>(
	({ children, isActive, tooltipContent, ...props }, forwardedRef) => {
		return (
			<Toolbar.Button asChild>
				<TooltipProvider tooltipContent={tooltipContent}>
					<button
						{...props}
						ref={forwardedRef}
						className={` mx-1 h-full cursor-pointer rounded p-1 hover:!bg-slate-600 disabled:opacity-50 disabled:hover:cursor-default
									${isActive ? " bg-blue-500 " : ""}
									`}
					>
						{children}
					</button>
				</TooltipProvider>
			</Toolbar.Button>
		);
	}
);

ToolbarButtonWithTooltip.displayName = "ToolbarButtonWithTooltip";

// TODO: figure out types, where to spread props and forwardedRef
export const TooltipProvider = forwardRef<any, any>(({ tooltipContent, children, ...props }, forwardedRef) => {
	return (
		<Tooltip.Provider delayDuration={100}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="rounded bg-slate-700 p-1 text-slate-50" sideOffset={10} side="bottom">
						{tooltipContent}
						<Tooltip.Arrow className="fill-slate-700" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
});

TooltipProvider.displayName = "TooltipProvider";

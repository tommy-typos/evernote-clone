import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Editor } from "@tiptap/core";
import { TooltipProvider } from "./Toolbar";
import { SelectViewPort } from "./HighlightSelector";

export const HeadingLevelSelector = ({ editor, headingLevel }: { editor: Editor; headingLevel: string }) => {
	function valueChangeHandler(value: string) {
		if (value === "heading-1") editor.chain().focus().toggleHeading({ level: 1 }).run();
		else if (value === "heading-2") editor.chain().focus().toggleHeading({ level: 2 }).run();
		else if (value === "heading-3") editor.chain().focus().toggleHeading({ level: 3 }).run();
		else if (value === "paragraph") editor.chain().focus().setParagraph().run();
	}

	return (
		<Select.Root
			value={headingLevel ? headingLevel : "paragraph"}
			onValueChange={valueChangeHandler}
			disabled={!headingLevel}
		>
			<TooltipProvider tooltipContent="Heading level">
				<Select.Trigger
					style={{ minWidth: "144px" }}
					className="mx-1 flex h-full w-36 cursor-pointer items-center justify-between rounded p-1 text-slate-50 outline-0 hover:bg-slate-600
							data-[disabled]:cursor-default data-[disabled]:text-slate-400"
				>
					<Select.Value placeholder="Normal text" />
					<Select.Icon>
						<ChevronDownIcon className={`h-4 w-4 ${headingLevel ? "text-slate-50" : "text-slate-400"}`} />
					</Select.Icon>
				</Select.Trigger>
			</TooltipProvider>

			<SelectViewPort className="w-72 border-2 border-slate-700 py-2">
				<Select.Group>
					<HeadingSelectItem value="heading-1" className="text-4xl font-bold">
						Large header
					</HeadingSelectItem>
					<Select.Separator className="m-2 h-px bg-slate-500" />
					<HeadingSelectItem value="heading-2" className="text-2xl font-bold">
						Medium header
					</HeadingSelectItem>
					<Select.Separator className="m-2 h-px bg-slate-500" />
					<HeadingSelectItem value="heading-3" className="text-xl font-bold">
						Small header
					</HeadingSelectItem>
					<Select.Separator className="m-2 h-px bg-slate-500" />
					<HeadingSelectItem value="paragraph" className="text-base">
						Normal text
					</HeadingSelectItem>
				</Select.Group>
			</SelectViewPort>
		</Select.Root>
	);
};

HeadingLevelSelector.displayName = "HeadingLevelSelector";

// TODO: figure out types
const HeadingSelectItem = ({ children, className, ...props }: any) => {
	return (
		<Select.Item
			className={`relative flex cursor-pointer items-center p-2 pl-12 outline-0 hover:bg-slate-500 data-[state=checked]:text-blue-500 data-[state=checked]:hover:bg-slate-600 
						 ${className ?? ""}`}
			{...props}
		>
			<Select.ItemIndicator className="absolute left-4 inline-flex h-full w-6 items-center">
				<CheckIcon className="h-5 w-5 text-blue-500" />
			</Select.ItemIndicator>
			<Select.ItemText>{children}</Select.ItemText>
		</Select.Item>
	);
};

HeadingSelectItem.displayName = "HeadingSelectItem";

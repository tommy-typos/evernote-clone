import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as Select from "@radix-ui/react-select";
import { Editor } from "@tiptap/core";
import React, { Dispatch, SetStateAction, forwardRef } from "react";
import { ColorHex, getHighlightColorsDarkMode } from "@/utils/colors/evernoteColors";
// import { twColors } from "@/utils/colors/twTheme";
import { TooltipProvider } from "./Toolbar";

type HighlightSelectorProps = {
	editor: Editor;
	highlightColor: string;
	setHighlightColor: Dispatch<SetStateAction<ColorHex>>;
	isActive: boolean;
};

export const HighlightSelector = forwardRef(
	({ editor, highlightColor, setHighlightColor, isActive }: HighlightSelectorProps, forwardedRef) => {
		return (
			<Select.Root
				value={highlightColor}
				onValueChange={(value) => {
					editor.chain().focus().setHighlight({ color: value }).run();
					setHighlightColor(value as ColorHex);
				}}
				//  TODO: add disabled condition
			>
				<TooltipProvider tooltipContent="Highlight colors">
					<Select.Trigger
						className="mr-1 flex h-full cursor-pointer items-center justify-between rounded p-1 text-slate-50 outline-0 
							hover:scale-125 data-[disabled]:cursor-default data-[disabled]:text-slate-400 data-[disabled]:opacity-50"
						aria-label="Highlight"
					>
						<Select.Icon>
							<ChevronDownIcon
								style={{ color: isActive ? highlightColor : "var(--slate-50)" }}
								className={`h-4 w-4  ${isActive ? "scale-125" : ""} `}
							/>
						</Select.Icon>
					</Select.Trigger>
				</TooltipProvider>

				<SelectViewPort className="w-60 border-2 border-slate-700 py-4 ">
					<Select.Group className="mx-7 grid grid-cols-6 justify-items-center gap-2">
						{getHighlightColorsDarkMode().map((highlightColorDarkMode) => (
							<ColorSelectItem
								key={highlightColorDarkMode.id}
								value={highlightColorDarkMode.twHex}
							></ColorSelectItem>
						))}
					</Select.Group>
				</SelectViewPort>
			</Select.Root>
		);
	}
);

HighlightSelector.displayName = "HighlightSelector";

export const ColorSelectItem = ({ value }: { value: ColorHex }) => {
	return (
		<Select.Item
			style={{ backgroundColor: value }}
			className={`h-5 w-5  cursor-pointer 
				rounded-full outline-0 
				hover:scale-125
				data-[state=checked]:border-2
				data-[state=checked]:border-blue-500
				data-[state=checked]:shadow-[0_0_0_2px_#0f172a_inset]
			`}
			value={value}
		></Select.Item>
	);
};

export const SelectViewPort = ({
	children,
	className,
}: {
	children: JSX.Element | JSX.Element[];
	className: string;
}) => {
	return (
		<Select.Portal>
			<Select.Content
				position="popper"
				sideOffset={15}
				side="bottom"
				onCloseAutoFocus={(e) => {
					e.preventDefault();
				}}
			>
				<Select.Viewport className={` rounded bg-slate-900  text-slate-50 ${className ? className : " "}`}>
					{children}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	);
};

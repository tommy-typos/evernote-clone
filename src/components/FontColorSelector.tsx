import * as Select from "@radix-ui/react-select";
import { Editor } from "@tiptap/core";
import React, { Dispatch, SetStateAction } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ColorWheelIcon } from "@/svgs/svgExporter";
import { Half2Icon } from "@radix-ui/react-icons";
import { ColorHex, getFontColorsDarkMode } from "@/utils/evernoteColors";
import { ColorHexOrAuto, generateAuto } from "./folder1/Tiptap";
import { ColorSelectItem, SelectViewPort } from "./HighlightSelector";
import { TooltipProvider } from "./Toolbar";

type ColorSelectorProps = {
	editor: Editor;
	fontColor: ColorHexOrAuto;
	setFontColor: Dispatch<SetStateAction<ColorHexOrAuto>>;
	selectionHasColor: boolean;
};

export const ColorSelector = React.forwardRef<any, any>(
	({ editor, selectionHasColor, fontColor, setFontColor }: ColorSelectorProps, forwardedRef) => {
		const isEntireSelectionAutoColor =
			!getFontColorsDarkMode()
				.map((color) => color.twHex)
				.includes(fontColor as ColorHex) && !selectionHasColor;

		return (
			<Select.Root
				value={fontColor}
				onValueChange={(value) => {
					if (value.slice(0, 4) === "auto") editor.chain().focus().unsetColor().run();
					else editor.chain().focus().setColor(value).run();

					setFontColor(value as ColorHexOrAuto);
				}}
				//  TODO: add disabled condition
			>
				<TooltipProvider tooltipContent="Font color">
					<Select.Trigger className="mx-1 flex h-full cursor-pointer items-center justify-between rounded p-1 text-slate-50 outline-0 hover:bg-slate-600 data-[disabled]:cursor-default data-[disabled]:text-slate-400 data-[disabled]:opacity-50">
						<div className="relative mr-1 flex items-center justify-center">
							<ColorWheelIcon className="h-5" />
							<div
								style={{
									backgroundColor: fontColor,
									display: (fontColor.slice(0, 4) as string) === "auto" ? "none" : "block",
								}}
								className="absolute h-1 rounded-full p-1"
							></div>
						</div>
						<Select.Icon>
							<ChevronDownIcon className={`h-4 text-slate-50`} />
						</Select.Icon>
					</Select.Trigger>
				</TooltipProvider>

				<SelectViewPort className="w-60 py-4">
					<Select.Group className="mx-4 mb-3">
						<Select.Item
							value={generateAuto()}
							className={`${
								isEntireSelectionAutoColor ? " rounded border-2 !border-blue-500 " : ""
							} relative flex cursor-pointer items-center justify-center rounded border-2 border-slate-900 p-2 outline-0 hover:bg-slate-500`}
						>
							<Select.ItemText>
								<div className="flex items-center">
									<Half2Icon className="mr-2 h-5 w-5 rotate-45" />
									Auto
								</div>
							</Select.ItemText>
						</Select.Item>
					</Select.Group>
					<Select.Group className="mx-7 grid grid-cols-7 justify-items-center gap-2">
						{getFontColorsDarkMode().map((fontColorDarkMode) => (
							<ColorSelectItem
								key={fontColorDarkMode.id}
								value={fontColorDarkMode.twHex}
							></ColorSelectItem>
						))}
					</Select.Group>
				</SelectViewPort>
			</Select.Root>
		);
	}
);

ColorSelector.displayName = "ColorSelector";

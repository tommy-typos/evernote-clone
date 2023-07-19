export type ColorHex = `#${string}`;

type Color = {
	id: number;
	original_DO_NOT_USE: string;
	twClass: string;
	twHex: ColorHex;
	twRGB: string;
};

type FontColorsDarkModeType = {
	color1_white: Color;
	color2_closeToWhite: Color;
	color3_gray: Color;
	color4_closeToDark: Color;
	color5_dark: Color;
	color6_purple: Color;
	color7_pink: Color;
	color8_red: Color;
	color9_orange: Color;
	color10_yellow: Color;
	color11_green: Color;
	color12_cyanish: Color;
	color13_blue: Color;
	color14_darkBlue: Color;
};

const FontColorsDarkMode: FontColorsDarkModeType = Object.freeze({
	color1_white: {
		id: 1,
		original_DO_NOT_USE: "#cccccc",
		twClass: "stone-300",
		twHex: "#D6D3D1",
		twRGB: "rgb(214, 211, 209)",
	},
	color2_closeToWhite: {
		id: 2,
		original_DO_NOT_USE: "#a5a5a5",
		twClass: "neutral-400",
		twHex: "#A3A3A3",
		twRGB: "rgb(163, 163, 163)",
	},
	color3_gray: {
		id: 3,
		original_DO_NOT_USE: "#737373",
		twClass: "neutral-500",
		twHex: "#737373",
		twRGB: "rgb(115, 115, 115)",
	},
	color4_closeToDark: {
		id: 4,
		original_DO_NOT_USE: "#404040",
		twClass: "neutral-700",
		twHex: "#404040",
		twRGB: "rgb(64, 64, 64)",
	},
	color5_dark: {
		id: 5,
		original_DO_NOT_USE: "#000000",
		twClass: "black",
		twHex: "#000",
		twRGB: "rgb(0, 0, 0)",
	},
	color6_purple: {
		id: 6,
		original_DO_NOT_USE: "#864dff",
		twClass: "violet-500",
		twHex: "#8B5CF6",
		twRGB: "rgb(139, 92, 246)",
	},
	color7_pink: {
		id: 7,
		original_DO_NOT_USE: "#e153ff",
		twClass: "fuchsia-500",
		twHex: "#D946EF",
		twRGB: "rgb(217, 70, 239)",
	},
	color8_red: {
		id: 8,
		original_DO_NOT_USE: "#ff314e",
		twClass: "rose-500",
		twHex: "#F43F5E",
		twRGB: "rgb(244, 63, 94)",
	},
	color9_orange: {
		id: 9,
		original_DO_NOT_USE: "#ef724a",
		twClass: "orange-400",
		twHex: "#FB923C",
		twRGB: "rgb(251, 146, 60)",
	},
	color10_yellow: {
		id: 10,
		original_DO_NOT_USE: "#f5cc05",
		twClass: "yellow-400",
		twHex: "#FACC15",
		twRGB: "rgb(250, 204, 21)",
	},
	color11_green: {
		id: 11,
		original_DO_NOT_USE: "#53d879",
		twClass: "green-400",
		twHex: "#4ADE80",
		twRGB: "rgb(74, 222, 128)",
	},
	color12_cyanish: {
		id: 12,
		original_DO_NOT_USE: "#4ddce5",
		twClass: "teal-300",
		twHex: "#5EEAD4",
		twRGB: "rgb(94, 234, 212)",
	},
	color13_blue: {
		id: 13,
		original_DO_NOT_USE: "#00a3f4",
		twClass: "sky-500",
		twHex: "#0EA5E9",
		twRGB: "rgb(14, 165, 233)",
	},
	color14_darkBlue: {
		id: 14,
		original_DO_NOT_USE: "#2e71ff",
		twClass: "blue-500",
		twHex: "#3B82F6",
		twRGB: "rgb(59, 130, 246)",
	},
});

type HighlightColorsDarkModeType = {
	color1_yellow: Color;
	color2_red: Color;
	color3_green: Color;
	color4_blue: Color;
	color5_purple: Color;
	color6_orange: Color;
};

const HighlightColorsDarkMode: HighlightColorsDarkModeType = Object.freeze({
	color1_yellow: {
		id: 1,
		original_DO_NOT_USE: "#ffef9e",
		twClass: "yellow-200",
		twHex: "#FEF08A",
		twRGB: "rgb(254, 240, 138)",
	},
	color2_red: {
		id: 2,
		original_DO_NOT_USE: "#fec1d0",
		twClass: "red-200",
		twHex: "#FECACA",
		twRGB: "rgb(254, 202, 202)",
	},
	color3_green: {
		id: 3,
		original_DO_NOT_USE: "#b7f7d1",
		twClass: "green-200",
		twHex: "#BBF7D0",
		twRGB: "rgb(187, 247, 208)",
	},
	color4_blue: {
		id: 4,
		original_DO_NOT_USE: "#adecf4",
		twClass: "cyan-200",
		twHex: "#A5F3FC",
		twRGB: "rgb(165, 243, 252)",
	},
	color5_purple: {
		id: 5,
		original_DO_NOT_USE: "#cbcaff",
		twClass: "indigo-200",
		twHex: "#C7D2FE",
		twRGB: "rgb(199, 210, 254)",
	},
	color6_orange: {
		id: 6,
		original_DO_NOT_USE: "#ffd1b0",
		twClass: "orange-200",
		twHex: "#FED7AA",
		twRGB: "rgb(254, 215, 170)",
	},
});

/**
 *
 * EXPORTS
 *
 */

export function getFontColorsDarkMode() {
	return Object.values(FontColorsDarkMode).map((fontColorDarkMode) => {
		return {
			id: fontColorDarkMode.id,
			twHex: fontColorDarkMode.twHex,
			twRGB: fontColorDarkMode.twRGB,
		};
	});
}

export function getHighlightColorsDarkMode() {
	return Object.values(HighlightColorsDarkMode).map((highlightColorDarkMode) => {
		return {
			id: highlightColorDarkMode.id,
			twHex: highlightColorDarkMode.twHex,
			twRGB: highlightColorDarkMode.twRGB,
		};
	});
}

import { Platform } from "react-native";

import { tv, type VariantProps } from "tailwind-variants";

const baseStyle =
	Platform.OS === "web"
		? `font-sans tracking-sm my-0 bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 
       position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word`
		: "";

export const textStyle = tv({
	base: `text-foreground font-body overflow-visible ${baseStyle}`,

	variants: {
		variant: {
			h1: "text-h1 font-sans-bold",
			h2: "text-h2 font-sans-bold",
			h3: "text-h3 font-sans-semibold",
			h4: "text-h4 font-sans-semibold",
			heading: "text-body font-sans-bold",
			body: "text-body font-sans",
			bodySm: "text-body-sm font-sans",
			document: "text-document font-sans",
			caption: "text-caption font-sans",
			captionHeading: "text-caption font-sans-semibold",
			code: "text-code font-mono",
		},
		dimmed: {
			true: "text-dimmed",
		},
		isTruncated: {
			true: "web:truncate",
		},
		underline: {
			true: "underline",
		},
		strikeThrough: {
			true: "line-through",
		},
		weight: {
			thin: "font-thin",
			extralight: "font-extralight",
			light: "font-light",
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			extrabold: "font-extrabold",
			black: "font-black",
		},
		size: {
			"2xs": "text-2xs",
			xs: "text-xs",
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
			"4xl": "text-4xl",
			"5xl": "text-5xl",
			"6xl": "text-6xl",
		},
		sub: {
			true: "text-xs",
		},
		italic: {
			true: "italic",
		},
		highlight: {
			true: "bg-warning text-warning-foreground",
		},
	},

	defaultVariants: {
		variant: "body",
		size: "md",
	},
});

export type TextStyleProps = VariantProps<typeof textStyle>;

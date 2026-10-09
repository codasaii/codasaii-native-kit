import type React from "react";
import type { View } from "react-native";
import type { AccordionStyleProps } from "./styles";

export type AccordionValueProps = {
	type?: "single" | "multiple";
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
};

export type AccordionProps = React.ComponentProps<typeof View> &
	AccordionStyleProps &
	AccordionValueProps;

export type AccordionItemProps = React.ComponentProps<typeof View> & {
	value?: string;
};

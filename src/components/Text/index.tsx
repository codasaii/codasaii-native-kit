import React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { cn } from "tailwind-variants";

import { type ColorProp, resolveColor } from "../utils";
import { type TextStyleProps, textStyle } from "./styles";

export type TextProps = RNTextProps &
	TextStyleProps & {
		highlightColor?: ColorProp;
	};

// Components ------------------------------------------------------------------------------------

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, TextProps>(
	(
		{
			className,
			variant,
			dimmed,
			isTruncated,
			underline,
			strikeThrough,
			weight,
			size,
			sub,
			italic,
			highlight,
			highlightColor,
			style,
			...props
		},
		ref,
	) => {
		const { color: backgroundColor, classToken } = resolveColor(
			highlightColor ?? "yellow",
			!!highlight,
		);

		return (
			<RNText
				className={textStyle({
					class: cn(className, classToken),
					variant,
					dimmed,
					isTruncated,
					underline,
					strikeThrough,
					weight,
					size,
					sub,
					italic,
					highlight,
				})}
				style={{ backgroundColor, ...style }}
				ref={ref}
				{...props}
			/>
		);
	},
);

Text.displayName = "Text";

export default Text;

import React from "react";
import { Pressable, type PressableProps } from "react-native";

import { cn } from "tailwind-variants";

import Text, { type TextProps } from "../Text";
import { createUIContext } from "../utils";

import { type ButtonStyleProps, type ButtonStyleReturn, buttonStyle } from "./styles";

// ContextProvider -------------------------------------------------------------------------------

const [ButtonProvider, useButtonContext] = createUIContext<
	ButtonStyleProps & {
		textStyle: ButtonStyleReturn["text"];
	}
>("Button");

// Components ------------------------------------------------------------------------------------

type ButtonProps = PressableProps &
	ButtonStyleProps & {
		isHovered?: boolean;
		isPressed?: boolean;
		isFocused?: boolean;
		isDisabled?: boolean;
	};

const ButtonComponent = React.forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
	(
		{
			className,
			color,
			variant,
			size,
			isHovered,
			isPressed,
			isFocused,
			isDisabled,
			disabled,
			...props
		},
		ref,
	) => {
		const stylesProps: ButtonStyleProps = {
			color: variant === "outline" && !color ? "secondary" : (color ?? "primary"),
			variant: variant ?? "solid",
			size: size ?? "sm",
		};

		const styles = buttonStyle({
			...stylesProps,
		});

		const resolvedDisabled = isDisabled ?? disabled;

		return (
			<ButtonProvider
				value={{
					textStyle: styles.text,
					...stylesProps,
				}}
			>
				<Pressable
					role="button"
					className={cn(styles.button({ className }))}
					disabled={resolvedDisabled}
					ref={ref}
					{...props}
				/>
			</ButtonProvider>
		);
	},
);

ButtonComponent.displayName = "Button";

const ButtonTextComponent = React.forwardRef<React.ComponentRef<typeof Text>, TextProps>(
	({ className, size: textSize, ...props }, ref) => {
		const { textStyle, size, color, variant } = useButtonContext();

		return (
			<Text
				className={textStyle({
					class: className,
					size: textSize ? undefined : size,
					color,
					variant,
				})}
				size={textSize}
				ref={ref}
				{...props}
			/>
		);
	},
);

ButtonTextComponent.displayName = "ButtonText";

const Button = Object.assign(ButtonComponent, {
	Text: ButtonTextComponent,
});

export default Button;

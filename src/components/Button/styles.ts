import { tv, type VariantProps } from "tailwind-variants";

import { buildColorCompoundVariants, colorVariants } from "../../styles/colorVariants";

export const buttonStyle = tv({
	slots: {
		button: `flex-row items-center justify-center self-start gap-2 rounded-control 
             disabled:opacity-40 focus-visible:ring-3
             web:outline-none web:select-none
             transition-all duration-100 ease-in-out`,
		text: "web:select-none",
		icon: "fill-none pointer-events-none shrink-0",
	},

	variants: {
		color: colorVariants,

		variant: {
			solid: {
				button: "bg-primary",
			},
			outline: {
				button: "border",
			},
			ghost: {
				button: "",
			},
			link: {
				text: "text-primary hover:underline active:underline",
			},
		},

		size: {
			xs: {
				button: "min-h-7 px-2.5",
				text: "text-xs",
				icon: "h-3 w-3",
			},

			sm: {
				button: "min-h-8 px-3",
				text: "text-sm",
				icon: "h-3.5 w-3.5",
			},

			md: {
				button: "min-h-10 px-4",
				text: "text-sm",
				icon: "h-4 w-4",
			},

			lg: {
				button: "min-h-11 px-5",
				text: "text-base",
				icon: "h-5 w-5",
			},

			xl: {
				button: "min-h-12 px-6",
				text: "text-base",
				icon: "h-5 w-5",
			},

			icon: {
				button: "min-h-10 min-w-10",
				text: "text-sm",
				icon: "h-4 w-4",
			},
		},
	},
	compoundVariants: buildColorCompoundVariants(
		({ background, border, text, ring }, color, join) => {
			// Accesibility style
			const buttonHighlightedColor = join(
				background.hoverHighlighted,
				background.activeHighlighted,
			);
			const focusRing = ring.focus;
			const focusRingHighlighted = ring.focusHighlighted;

			// Base style
			const buttonSolidColor = join(
				focusRingHighlighted,

				background.color,
				background.hover,
				background.active,
			);
			const textSolidColor = text.foreground;

			const buttonOutlineColor = join(
				buttonHighlightedColor,
				focusRing,
				border.outlined,
				border.hoverOutlined,
				border.activeOutlined,
			);
			const textOutlineColor = text.color;

			const buttonGhostColor = join(focusRing, buttonHighlightedColor);
			const textGhostColor = join(text.color, text.hover, text.active);

			return [
				{
					color,
					variant: "solid",
					class: {
						button: buttonSolidColor,
						text: textSolidColor,
						icon: textSolidColor,
					},
				},
				{
					color,
					variant: "outline",
					class: {
						button: buttonOutlineColor,
						text: textOutlineColor,
						icon: textOutlineColor,
					},
				},
				{
					color,
					variant: "ghost",
					class: {
						button: buttonGhostColor,
						text: textGhostColor,
						icon: textGhostColor,
					},
				},
				{
					color,
					variant: "link",
					class: {
						button: focusRing,
						text: textGhostColor,
						icon: textGhostColor,
					},
				},
			];
		},
	),
});

export type ButtonStyleReturn = ReturnType<typeof buttonStyle>;
export type ButtonStyleProps = VariantProps<typeof buttonStyle>;

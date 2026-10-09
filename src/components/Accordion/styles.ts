import { tv, type VariantProps } from "tailwind-variants";
import { colorTokens } from "../../styles/colorTokens";

export const accordionStyle = tv({
	slots: {
		accordion: "self-start",
		item: "border-b border-border last:border-b-0 ring-0 transition-all duration-300 ease-in-out",
		trigger: "focus:ring-0 focus:outline-none",
		wrapper: "absolute top-0 left-0 right-0",
		content: "overflow-hidden",
	},

	variants: {
		variant: {
			ghost: {
				trigger: "px-5 py-4",
				wrapper: "px-5 pb-4",
			},

			outline: {
				item: "first:rounded-t-2xl last:rounded-b-2xl",
				accordion: "border border-border rounded-2xl",
				trigger: "px-5 py-4",
				wrapper: "px-5 pb-4",
			},

			card: {
				item: "first:rounded-t-2xl last:rounded-b-2xl bg-card",
				accordion: "border border-border rounded-2xl",
				trigger: "px-5 py-4",
				wrapper: "px-5 pb-4",
			},
		},

		// Add gap between items and make item uses full border sides and rounded corner
		separated: {
			true: {
				accordion: "gap-2 border-0",
				item: "border last:border rounded-2xl overflow-hidden",
			},
		},

		// Distinguish content background with trigger background
		contentFilled: {
			true: {
				item: "overflow-hidden",
				content: "bg-card",
				wrapper: "py-5",
			},
		},

		isFocusVisible: {
			true: {
				item: `z-100 ring-4 ${colorTokens.primary.ring.outlined}`,
			},
		},

		isOpen: {
			true: "",
		},

		isDisabled: {
			true: {
				trigger: "component-disabled",
				content: "component-disabled",
			},
		},
	},

	compoundVariants: [
		// Trigger uses bg-card when variant is card,
		// so make content color to background to distinguish it
		{
			variant: "card",
			contentFilled: true,
			class: {
				content: "bg-background",
			},
		},

		// Let item has horizontal padding and only use bottom border
		// for each item
		{
			variant: "ghost",
			separated: true,
			class: {
				item: "border-0 last:border-0 border-b rounded-none",
				trigger: "px-5",
				wrapper: "px-5",
				accordion: "gap-0",
			},
		},

		// Let the content lifted up in card style
		{
			variant: "ghost",
			separated: false,
			contentFilled: true,
			class: {
				wrapper: "px-5 py-4",
				content: "rounded-2xl",
			},
		},
		{
			variant: "ghost",
			separated: false,
			contentFilled: true,
			isOpen: true,
			class: {
				item: "border-0 rounded-2xl",
			},
		},
	],
});

export type AccordionStyleReturn = ReturnType<typeof accordionStyle>;
export type AccordionStyleProps = Omit<
	VariantProps<typeof accordionStyle>,
	"isFocusVisible" | "isOpen"
>;

import { type ColorToken, colorTokens } from "./colorTokens";

export type Color = keyof typeof colorTokens;

const joinColor = (...colors: (string | undefined | null)[]) => colors.join(" ");

export const colorVariants = Object.fromEntries(
	Object.keys(colorTokens).map((color) => [color, ""]),
) as Record<Color, "">;

export const buildColorCompoundVariants = (
	fn: (tokens: ColorToken, color: Color, join: typeof joinColor) => object,
) => {
	return Object.entries(colorTokens).flatMap(([color, tokens]) =>
		fn(tokens, color as Color, joinColor),
	);
};

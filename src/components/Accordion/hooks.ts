import React from "react";
import type { AccordionValueProps } from "./types";

// ---------- export mirrr

export const convertToArray = <T>(value?: T | T[] | null): T[] => {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
};

export const isDefined = <T>(value: T | null | undefined): value is T =>
	value !== undefined && value !== null;

// ------------

export const useAccordion = ({ type, value, defaultValue, onValueChange }: AccordionValueProps) => {
	const [internalValue, setInternalValue] = React.useState<string[]>(() =>
		convertToArray(defaultValue),
	);

	const isSingle = type === "single";
	const isControlled = isDefined(value);
	const currentValue = isControlled ? convertToArray(value) : internalValue;

	const toggle = React.useCallback(
		(itemValue: string) => {
			const isExist = currentValue.includes(itemValue);

			const next = isSingle
				? isExist
					? []
					: [itemValue]
				: isExist
					? currentValue.filter((v) => v !== itemValue)
					: [...currentValue, itemValue];

			onValueChange?.(next);

			if (!isControlled) setInternalValue(next);
		},
		[currentValue, isSingle, isControlled, onValueChange],
	);

	return { isSingle, currentValue, toggle };
};

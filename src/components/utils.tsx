import * as React from "react";
import type { ColorValue } from "react-native";

type UIContextParams = {
	name?: string;
};

type OptionalUIContextParams = UIContextParams & {
	optional: true;
};

type RequiredUIContextParams = UIContextParams & {
	optional?: false;
};

export function createUIContext<T>(
	name: string,
	params?: RequiredUIContextParams,
): readonly [
	React.FC<{
		value: T;
		children: React.ReactNode;
	}>,
	() => T,
];

export function createUIContext<T>(
	name: string,
	params: OptionalUIContextParams,
): readonly [
	React.FC<{
		value: T;
		children: React.ReactNode;
	}>,
	() => T | null,
];

export function createUIContext<T>(
	name: string,
	{ optional = false }: UIContextParams & { optional?: boolean } = {},
) {
	const Context = React.createContext<T | null>(null);

	const Provider = ({ value, children }: { value: T; children: React.ReactNode }) => (
		<Context.Provider value={value}>{children}</Context.Provider>
	);

	const useContext = () => {
		const ctx = React.useContext(Context);

		if (!ctx && !optional) {
			throw new Error(`${name} components must be used within <${name}.Root>`);
		}

		return ctx;
	};

	return [Provider, useContext] as const;
}

export type ColorProp = ColorValue | `bg-${string}`;

export function resolveColor(value?: ColorProp, enabled = true) {
	const isClass = typeof value === "string" && value.startsWith("bg-");

	return {
		isClass,
		classToken: enabled && isClass ? value : undefined,
		color: enabled && !isClass ? value : undefined,
	} as const;
}

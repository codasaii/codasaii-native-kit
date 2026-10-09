import React from "react";
import { Platform, Pressable, type PressableProps, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import Text, { type TextProps } from "../Text";
import { createUIContext } from "../utils";
import { useAccordion } from "./hooks";
import { type AccordionStyleReturn, accordionStyle } from "./styles";
import type { AccordionItemProps, AccordionProps } from "./types";

// ContextProvider -------------------------------------------------------------------------------

const [AccordionProvider, useAccordionContext] = createUIContext<{
	isSingle: boolean;
	currentValue: string[];
	toggle: (itemValue: string) => void;
	itemStyle: AccordionStyleReturn["item"];
	triggerStyle: AccordionStyleReturn["trigger"];
	contentStyle: AccordionStyleReturn["content"];
	wrapperStyle: AccordionStyleReturn["wrapper"];
}>("Accordion");

const [AccordionItemProvider, useAccordionItemContext] = createUIContext<{
	itemValue: string;
	isOpen: boolean;
	isDisabled?: boolean;
	isFocusVisible: boolean;
	setFocusVisible: (visible: boolean) => void;
}>("AccordionItem");

// Components ------------------------------------------------------------------------------------

const AccordionComponent = React.forwardRef<React.ComponentRef<typeof View>, AccordionProps>(
	(
		{
			className,
			variant = "ghost",
			separated,
			contentFilled,
			type = "single",
			value,
			defaultValue,
			onValueChange,
			...props
		},
		ref,
	) => {
		const { isSingle, currentValue, toggle } = useAccordion({
			type,
			value,
			defaultValue,
			onValueChange,
		});

		const styles = accordionStyle({
			variant,
			separated,
			contentFilled,
		});

		return (
			<AccordionProvider
				value={{
					isSingle,
					currentValue,
					toggle,
					itemStyle: styles.item,
					triggerStyle: styles.trigger,
					contentStyle: styles.content,
					wrapperStyle: styles.wrapper,
				}}
			>
				<View className={styles.accordion({ class: className })} ref={ref} {...props} />
			</AccordionProvider>
		);
	},
);

AccordionComponent.displayName = "Accordion";

const AccordionItem = React.forwardRef<
	React.ComponentRef<typeof View>,
	AccordionItemProps & {
		isDisabled?: boolean;
		children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
	}
>(({ className, children, isDisabled, value, ...props }, ref) => {
	const [isFocusVisible, setFocusVisible] = React.useState(false);

	const { currentValue, itemStyle } = useAccordionContext();

	const generatedId = React.useId();
	const itemValue = value ?? generatedId;
	const isOpen = currentValue.includes(itemValue);

	return (
		<AccordionItemProvider
			value={{
				itemValue,
				isOpen,
				isDisabled,
				isFocusVisible,
				setFocusVisible,
			}}
		>
			<View
				className={itemStyle({
					class: className,
					isOpen,
					isDisabled,
					isFocusVisible,
				})}
				ref={ref}
				{...props}
			>
				{typeof children === "function" ? children(isOpen) : children}
			</View>
		</AccordionItemProvider>
	);
});

AccordionItem.displayName = "AccordionItem";

// ------TODO: EXPORT ME
export const checkFocusVisible = (e: { target?: unknown }) => {
	if (Platform.isTV || Platform.OS !== "web") return true;
	const el = e.target as HTMLElement | undefined;
	return el?.matches?.(":focus-visible") ?? false;
};

const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof Pressable>, PressableProps>(
	({ className, accessibilityState, disabled, onFocus, onBlur, onPress, ...props }, ref) => {
		const { toggle, triggerStyle } = useAccordionContext();
		const { itemValue, isDisabled, isOpen, setFocusVisible } = useAccordionItemContext();

		return (
			<Pressable
				className={triggerStyle({ class: className, isDisabled })}
				accessibilityRole="button"
				accessibilityState={{
					...accessibilityState,
					expanded: isOpen,
					disabled: isDisabled,
				}}
				disabled={disabled || isDisabled}
				onFocus={(e) => {
					setFocusVisible(checkFocusVisible(e));
					onFocus?.(e);
				}}
				onBlur={(e) => {
					setFocusVisible(false);
					onBlur?.(e);
				}}
				onPress={(e) => {
					toggle(itemValue);
					onPress?.(e);
				}}
				ref={ref}
				{...props}
			/>
		);
	},
);

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
	React.ComponentRef<typeof Animated.View>,
	React.ComponentProps<typeof Animated.View> & {
		children?: React.ReactNode;
		className?: string;
	}
>(({ className, style, children, ...props }, ref) => {
	const { isOpen, isDisabled, isFocusVisible } = useAccordionItemContext();
	const { contentStyle, wrapperStyle } = useAccordionContext();

	const targetHeight = useSharedValue(0);
	const progress = useSharedValue(isOpen ? 1 : 0);

	const accordionContentAnimatedStyle = useAnimatedStyle(() => ({
		height: Math.max(progress.value, 0) * targetHeight.value,
	}));

	React.useEffect(() => {
		progress.value = withSpring(isOpen ? 1 : 0);
	}, [isOpen, progress]);

	return (
		<Animated.View
			className={contentStyle({
				class: className,
				isOpen,
				isDisabled,
				isFocusVisible,
			})}
			aria-hidden={!isOpen}
			importantForAccessibility={isOpen ? "auto" : "no-hide-descendants"}
			accessibilityElementsHidden={!isOpen}
			style={[style, accordionContentAnimatedStyle]}
			ref={ref}
			{...props}
		>
			<View
				className={wrapperStyle()}
				onLayout={(event) => {
					targetHeight.value = event.nativeEvent.layout.height;
				}}
			>
				{children}
			</View>
		</Animated.View>
	);
});

AccordionContent.displayName = "AccordionContent";

const AccordionTriggerText = React.forwardRef<React.ComponentRef<typeof Text>, TextProps>(
	({ variant = "heading", weight = "medium", ...props }, ref) => (
		<Text variant={variant} weight={weight} ref={ref} {...props} />
	),
);

AccordionTriggerText.displayName = "AccordionTriggerText";

const AccordionContentText = React.forwardRef<React.ComponentRef<typeof Text>, TextProps>(
	({ variant = "body", dimmed = true, ...props }, ref) => (
		<Text variant={variant} dimmed={dimmed} ref={ref} {...props} />
	),
);

AccordionContentText.displayName = "AccordionContentText";

const Accordion = Object.assign(AccordionComponent, {
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	TriggerText: AccordionTriggerText,
	Content: AccordionContent,
	ContentText: AccordionContentText,
});

export default Accordion;

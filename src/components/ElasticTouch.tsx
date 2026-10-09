import { forwardRef, useMemo } from "react";
import type { LayoutChangeEvent, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
	type AnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	type WithSpringConfig,
	withSpring,
} from "react-native-reanimated";

import { smoothAbs, softCap } from "../utils/math";

const rubberBand = (distance: number, dimension: number, resistance: number) => {
	"worklet";
	return (distance * dimension) / (dimension + resistance * Math.abs(distance));
};

type ElasticTouchProps = Omit<AnimatedProps<ViewProps>, "onLayout" | "children"> & {
	/**
	 * Disables the interaction.
	 */
	disabled?: boolean;

	/**
	 * Controls how much the component scales when pressed.
	 */
	pressScale?: number;

	/**
	 * Controls how hard the interaction to stretch.
	 *
	 * Higher values make it harder to stretch.
	 * 0.5 = very elastic
	 * 1 = balanced
	 * 2 = highly resistant
	 */
	resistance?: number;

	/**
	 * How gradually the stretch eases in, in offset pixels.
	 * 0 = stretch starts immediately (sharp at the start of the drag).
	 * Higher values = a longer, softer ramp-up before stretch kicks in.
	 */
	smoothing?: number;

	/**
	 * Ratio of rubber-banded drag distance to element movement.
	 * 0.1 = moves 1px for every 10px dragged.
	 * Pass { x, y } to set each axis independently.
	 */
	factor?: number | { x: number; y: number };

	/**
	 * Spring configuration.
	 */
	spring?: WithSpringConfig;

	onLayout?: (event: LayoutChangeEvent) => void;
	children: React.ReactNode;
};

const ElasticTouch = forwardRef<React.ComponentRef<typeof Animated.View>, ElasticTouchProps>(
	(
		{
			children,
			disabled = false,
			pressScale = 1.2,
			resistance = 0.4,
			smoothing = 5,
			factor = {
				x: 0.1,
				y: 0.05,
			},
			spring = {
				damping: 16,
				stiffness: 220,
				mass: 0.55,
			},
			onLayout,
			style,
			...props
		},
		ref,
	) => {
		const { damping, stiffness, mass } = spring;

		const containerWidth = useSharedValue(0);
		const containerHeight = useSharedValue(0);
		const translationX = useSharedValue(0);
		const translationY = useSharedValue(0);
		const scale = useSharedValue(1);

		const panGesture = useMemo(() => {
			const springConfig = { damping, stiffness, mass };

			return Gesture.Pan()
				.enabled(!disabled)
				.onBegin(() => {
					scale.value = withSpring(pressScale, springConfig);
				})
				.onUpdate((event) => {
					const dimension = Math.max(containerWidth.value, containerHeight.value);

					if (dimension === 0) return;

					translationX.value = rubberBand(event.translationX, dimension, resistance);

					translationY.value = rubberBand(event.translationY, dimension, resistance);
				})
				.onFinalize(() => {
					translationX.value = withSpring(0, springConfig);
					translationY.value = withSpring(0, springConfig);
					scale.value = withSpring(1, springConfig);
				});
		}, [
			disabled,
			resistance,
			pressScale,
			damping,
			stiffness,
			mass,
			containerWidth.value,
			translationY,
			translationX,
			scale,
			containerHeight.value,
		]);

		const factorX = typeof factor === "number" ? factor : factor.x;
		const factorY = typeof factor === "number" ? factor : factor.y;

		const animatedStyle = useAnimatedStyle(() => {
			const width = containerWidth.value;
			const height = containerHeight.value;

			// Avoid NaN or Infinity before onLayout fires
			if (width === 0 || height === 0) {
				return {
					transform: [{ translateX: 0 }, { translateY: 0 }, { scaleX: 1 }, { scaleY: 1 }],
				};
			}

			const offsetX = translationX.value * factorX;
			const offsetY = translationY.value * factorY;

			const growthX = softCap(smoothAbs(offsetX, smoothing), width);
			const growthY = softCap(smoothAbs(offsetY, smoothing), height);

			const sx = growthX / width;
			const sy = growthY / height;

			const s = scale.value;
			const baseX = 1 + sx - sy / (1 + sy);
			const baseY = 1 + sy - sx / (1 + sx);

			return {
				transform: [
					{ translateX: offsetX },
					{ translateY: offsetY },
					{ scaleX: s * baseX },
					{ scaleY: s * baseY },
				],
			};
		});

		const handleLayout = (event: LayoutChangeEvent) => {
			const { width: layoutWidth, height: layoutHeight } = event.nativeEvent.layout;

			containerWidth.value = layoutWidth;
			containerHeight.value = layoutHeight;
			onLayout?.(event);
		};

		return (
			<GestureDetector gesture={panGesture}>
				<Animated.View onLayout={handleLayout} style={[animatedStyle, style]} ref={ref} {...props}>
					{children}
				</Animated.View>
			</GestureDetector>
		);
	},
);

ElasticTouch.displayName = "ElasticTouch";

export { ElasticTouch };

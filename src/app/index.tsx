import { type ComponentProps, Fragment, type ReactNode } from "react";
import { ScrollView, View } from "react-native";
import Accordion from "../components/Accordion";
import Button from "../components/Button";
import { ElasticTouch } from "../components/ElasticTouch";
import Text from "../components/Text";

const colors = ["primary", "secondary", "success", "warning", "destructive", "info"] as const;
const variants = ["solid", "outline", "ghost", "link"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const accordionVariants = ["ghost", "outline", "card"] as const;

const examples = [
	{ color: "primary", label: "Save" },
	{ color: "secondary", label: "Cancel" },
	{ color: "destructive", label: "Delete" },
	{ color: "success", label: "Confirm" },
	{ color: "warning", label: "Warning" },
] as const;

const faqs = [
	{
		question: "What is this feature?",
		answer:
			"This feature helps you manage your content in one place. It provides a simple way to organize information, access important details, and keep everything structured. Whether you are using it for a personal project or a larger application, the goal is to make your workflow easier and more efficient.",
	},
	{
		question: "How does it work?",
		answer:
			"The feature works by taking your input, processing the relevant information, and presenting the results in an organized format. You can interact with different elements to reveal additional details whenever you need them. The interface is designed to keep information accessible without overwhelming you with too much content at once.",
	},
	{
		question: "Can I customize the appearance?",
		answer:
			"Yes! You can customize the appearance to match your application's design system. This may include changing colors, adjusting spacing, modifying typography, and controlling how individual components behave. With a consistent set of design tokens, you can maintain a unified appearance across your entire application while still giving each component the flexibility it needs.",
	},
	{
		question: "Is it suitable for beginners?",
		answer:
			"Absolutely. The interface is designed to be straightforward and intuitive, even for people who are unfamiliar with the feature. Most actions follow familiar interaction patterns, so users can quickly understand how things work without needing to read extensive documentation. More advanced options can be introduced gradually as users become comfortable with the interface.",
	},
	{
		question: "Does it support mobile devices?",
		answer:
			"Yes, the layout can be adapted for mobile devices, tablets, and desktop screens. On smaller displays, content should remain readable, interactive elements should be easy to tap, and spacing should be adjusted to make the best use of the available screen space. Responsive behavior helps ensure that the experience remains consistent across different device sizes.",
	},
	{
		question: "Can I use multiple items at the same time?",
		answer:
			"That depends on how the component is configured. In a single-open accordion, opening one item automatically closes the previously opened item. In a multiple-open accordion, several items can remain expanded simultaneously. Both approaches are useful in different situations, so choose the behavior that best matches your interface and the amount of information being displayed.",
	},
	{
		question: "How does the animation work?",
		answer:
			"Animations help communicate changes in the interface by making transitions feel more natural. For example, when an FAQ item expands, its content can gradually become visible while the container adjusts its height. A well-tuned animation should feel responsive without delaying interaction. Consider using spring-based motion for a more natural feel, or a simple timing animation when you want predictable transitions.",
	},
	{
		question: "Will it affect application performance?",
		answer:
			"A well-implemented component should have minimal impact on performance. However, rendering a large number of items, animating complex layouts, or mounting every answer simultaneously can increase the amount of work the application needs to perform. If your FAQ contains hundreds of entries, consider rendering only the necessary content, memoizing expensive components, and measuring performance on lower-end devices.",
	},
	{
		question: "Can the answers contain formatted content?",
		answer:
			"Yes. Depending on your implementation, answers can contain plain text, links, lists, emphasized text, and other formatted elements. For example, you might include a short explanation followed by a list of steps users can follow. Rich content can make answers more useful, but it is important to preserve readable spacing and ensure that nested elements do not interfere with the accordion's layout or animation behavior.",
	},
	{
		question: "What happens if an answer is very long?",
		answer:
			"Long answers should expand naturally to accommodate their content instead of being restricted to an arbitrary fixed height. Make sure the container can display the entire answer without clipping text or hiding important information. If you animate the height, remember that animating between automatic height values can require a different implementation from animating between two numeric values. Test especially carefully when the content wraps differently across screen sizes.",
	},
	{
		question: "Can I use icons inside the questions?",
		answer:
			"Yes. Icons can help communicate the current state of an accordion item. For example, a plus icon can indicate that an item is closed, while a minus icon can indicate that it is open. You can also rotate a chevron when the state changes. Keep the icon alignment consistent and make sure that the question remains easy to read, even when the text spans multiple lines.",
	},
	{
		question: "Is the component accessible?",
		answer:
			"Accessibility should be considered from the beginning. Interactive questions should be keyboard accessible where applicable, expose their expanded or collapsed state to assistive technologies, and provide a sufficiently large interaction area. Use appropriate accessibility roles and labels, preserve visible focus indicators, and avoid relying on color or animation alone to communicate state. In React Native, check the accessibility properties supported by the components you use.",
	},
	{
		question: "Can I load FAQ data dynamically?",
		answer:
			"Yes. FAQ data can come from a local array, a database, or a remote API. When loading data asynchronously, consider showing a loading indicator while the request is in progress and an appropriate empty state when no questions are available. You should also handle request failures gracefully so that users receive useful feedback instead of seeing a blank section or an unexpected application error.",
	},
	{
		question: "How should I handle errors?",
		answer:
			"Error handling should make it clear what went wrong and what the user can do next. If the FAQ content cannot be loaded, display a friendly message and optionally provide a retry action. Avoid exposing internal error details to end users. During development, log useful diagnostic information so you can identify the underlying problem without making the interface confusing or difficult to recover from.",
	},
	{
		question: "Can I add a search function?",
		answer:
			"A search function is useful when the FAQ contains many questions. You can filter items based on their question text, answer text, or both. For a better experience, consider ignoring differences in letter casing and trimming unnecessary whitespace. You could also display a helpful empty state when no results match the search query, allowing users to adjust their search instead of assuming that the information is unavailable.",
	},
	{
		question: "How do I test the component properly?",
		answer:
			"Test the component with a variety of content rather than relying on short placeholder sentences alone. Include very short answers, multiple paragraphs, long words, links, lists, and questions that wrap onto several lines. Check what happens when items open and close quickly, when several items are expanded, and when the device orientation or screen size changes. Also verify that the component behaves correctly when the dataset is empty or contains a large number of entries.",
	},
	{
		question: "What are some common implementation mistakes?",
		answer:
			"Common mistakes include using fixed heights for content that changes dynamically, allowing multiple animation callbacks to compete, forgetting to update accessibility state, and placing interactive elements inside a pressable question without considering nested interactions. Another frequent issue is using array indexes as keys when items can be reordered or removed. Keeping state management predictable and testing unusual content lengths can prevent many of these problems.",
	},
	{
		question: "Where can I learn more?",
		answer:
			"You can learn more by exploring the documentation for the framework and animation library you are using. Reading implementation examples is also useful because it helps you understand how component state, layout measurement, and animation work together. Try experimenting with small changes, inspect the results on different devices, and keep the implementation as simple as possible until you have a clear reason to add more complexity.",
	},
];

const DISABLED_FAQ_INDEX = 2;

function Header({ title, description }: { title: string; description?: string }) {
	return (
		<View className="gap-1">
			<Text size="2xl" weight="bold">
				{title}
			</Text>
			{description && <Text className="text-muted-foreground">{description}</Text>}
		</View>
	);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<View className="gap-4">
			<Text size="lg" weight="semibold" className="capitalize">
				{title}
			</Text>
			{children}
		</View>
	);
}

function FaqAccordion(props: Omit<ComponentProps<typeof Accordion>, "children">) {
	return (
		<Accordion {...props}>
			{faqs.map((faq, index) => (
				<Accordion.Item key={faq.question} isDisabled={index === DISABLED_FAQ_INDEX}>
					<Accordion.Trigger>
						<Accordion.TriggerText>{faq.question}</Accordion.TriggerText>
					</Accordion.Trigger>
					<Accordion.Content>
						<Accordion.ContentText>{faq.answer}</Accordion.ContentText>
					</Accordion.Content>
				</Accordion.Item>
			))}
		</Accordion>
	);
}

function AccordionShowcase() {
	return (
		<>
			<Header title="Accordion" />

			{accordionVariants.map((variant) => (
				<Fragment key={variant}>
					<View className="flex-row gap-4">
						<FaqAccordion variant={variant} />
						<FaqAccordion variant={variant} separated />
					</View>
					<View className="flex-row gap-4">
						<FaqAccordion variant={variant} contentFilled />
						<FaqAccordion variant={variant} separated contentFilled />
					</View>
				</Fragment>
			))}
		</>
	);
}

function ButtonShowcase() {
	return (
		<>
			<Header title="Button" description="All button variants, colors and sizes" />

			<View className="gap-6">
				{variants.map((variant) => (
					<Section key={variant} title={variant}>
						<View className="gap-3 lg:flex-row lg:flex-wrap">
							{colors.map((color) => (
								<View key={color} className="flex-row items-center gap-4 lg:w-[calc(33.333%-8px)]">
									<Text className="w-24 capitalize text-muted-foreground lg:w-20" numberOfLines={1}>
										{color}
									</Text>
									<ElasticTouch>
										<Button color={color} variant={variant} size="md">
											<Button.Text>{variant} button</Button.Text>
										</Button>
									</ElasticTouch>
								</View>
							))}
						</View>
					</Section>
				))}
			</View>

			<Section title="Sizes">
				<View className="items-start gap-3 lg:flex-row lg:flex-wrap lg:items-center">
					{sizes.map((size) => (
						<View key={size} className="flex-row items-center gap-3">
							<Text className="w-10 uppercase text-muted-foreground">{size}</Text>
							<Button size={size}>
								<Button.Text>{size.toUpperCase()} Button</Button.Text>
							</Button>
						</View>
					))}
				</View>
			</Section>

			<Section title="Icon">
				<View className="flex-row flex-wrap gap-3">
					{variants.map((variant) => (
						<Button
							key={variant}
							size="icon"
							variant={variant}
							color="primary"
							accessibilityLabel={`${variant} icon button`}
						>
							<Button.Text>+</Button.Text>
						</Button>
					))}
				</View>
			</Section>

			<Section title="States">
				<View className="gap-3 lg:flex-row lg:flex-wrap">
					<Button>
						<Button.Text>Normal</Button.Text>
					</Button>
					<Button disabled>
						<Button.Text>Disabled</Button.Text>
					</Button>
				</View>
			</Section>

			<Section title="Examples">
				<View className="flex-row flex-wrap gap-3">
					{examples.map(({ color, label }) => (
						<Button key={label} color={color} size="sm">
							<Button.Text>{label}</Button.Text>
						</Button>
					))}
				</View>
			</Section>
		</>
	);
}

export default function ComponentShowcase() {
	return (
		<ScrollView
			className="flex-1 bg-background"
			contentContainerClassName="w-full max-w-7xl gap-8 self-center p-4 sm:p-6 lg:p-8"
			showsVerticalScrollIndicator={false}
		>
			<AccordionShowcase />
			<ButtonShowcase />
		</ScrollView>
	);
}

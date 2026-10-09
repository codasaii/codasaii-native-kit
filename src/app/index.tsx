import { ScrollView, View } from "react-native";
import Accordion from "../components/Accordion";
import Button from "../components/Button";
import { ElasticTouch } from "../components/ElasticTouch";
import Text from "../components/Text";

const colors = ["primary", "secondary", "success", "warning", "destructive", "info"] as const;

const variants = ["solid", "outline", "ghost", "link"] as const;

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const accordionData = [
	{
		question: "What is a Verlag?",
		answer:
			"A Verlag is a publishing company or publishing house. In German, it refers to a company that publishes books, magazines, newspapers, or other written works.",
	},
	{
		question: "What does Verlag mean in English?",
		answer:
			"Verlag is usually translated as publisher or publishing house. For example, a company that publishes books could be called a Buchverlag.",
	},
	{
		question: "What is the difference between Verlag and Verlagshaus?",
		answer:
			"Verlag generally refers to the publishing company itself, while Verlagshaus literally means publishing house. In everyday German, both can refer to a publisher.",
	},
	{
		question: "What is a Buchverlag?",
		answer:
			"A Buchverlag is a publisher that specializes in books. It may publish novels, textbooks, children's books, academic works, or other types of books.",
	},
	{
		question: "How do you use Verlag in a sentence?",
		answer:
			"For example: 'Das Buch wurde bei einem bekannten Verlag veröffentlicht.' This means, 'The book was published by a well-known publishing house.'",
	},
];

export default function ButtonShowcase() {
	return (
		<ScrollView
			className="flex-1 bg-background"
			contentContainerClassName="
        w-full
        max-w-7xl
        self-center
        gap-8
        p-4
        sm:p-6
        lg:p-8
      "
			showsVerticalScrollIndicator={false}
		>
			<Text size="2xl" weight="bold">
				Accordion
			</Text>
			{(["ghost", "outline", "card"] as const).map((v) => (
				<>
					<View className="flex-row gap-4">
						<Accordion variant={v}>
							{accordionData.map((item, index) => (
								<Accordion.Item key={index} isDisabled={index === 2}>
									<Accordion.Trigger>
										<Accordion.TriggerText>{item.question}</Accordion.TriggerText>
									</Accordion.Trigger>

									<Accordion.Content>
										<Accordion.ContentText>{item.answer}</Accordion.ContentText>
									</Accordion.Content>
								</Accordion.Item>
							))}
						</Accordion>

						<Accordion separated variant={v}>
							{accordionData.map((item, index) => (
								<Accordion.Item key={index} isDisabled={index === 2}>
									<Accordion.Trigger>
										<Accordion.TriggerText>{item.question}</Accordion.TriggerText>
									</Accordion.Trigger>

									<Accordion.Content>
										<Accordion.ContentText>{item.answer}</Accordion.ContentText>
									</Accordion.Content>
								</Accordion.Item>
							))}
						</Accordion>
					</View>

					<View className="flex-row gap-4">
						<Accordion contentFilled variant={v}>
							{accordionData.map((item, index) => (
								<Accordion.Item key={index} isDisabled={index === 2}>
									<Accordion.Trigger>
										<Accordion.TriggerText>{item.question}</Accordion.TriggerText>
									</Accordion.Trigger>

									<Accordion.Content>
										<Accordion.ContentText>{item.answer}</Accordion.ContentText>
									</Accordion.Content>
								</Accordion.Item>
							))}
						</Accordion>

						<Accordion separated contentFilled variant={v}>
							{accordionData.map((item, index) => (
								<Accordion.Item key={index} isDisabled={index === 2}>
									<Accordion.Trigger>
										<Accordion.TriggerText>{item.question}</Accordion.TriggerText>
									</Accordion.Trigger>

									<Accordion.Content>
										<Accordion.ContentText>{item.answer}</Accordion.ContentText>
									</Accordion.Content>
								</Accordion.Item>
							))}
						</Accordion>
					</View>
				</>
			))}

			{/* Header */}
			<View className="gap-1">
				<Text size="2xl" weight="bold">
					Button
				</Text>

				<Text className="text-muted-foreground">All button variants, colors and sizes</Text>
			</View>

			{/* Variants */}
			<View className="gap-6">
				{variants.map((variant) => (
					<View key={variant} className="gap-4">
						<Text size="lg" weight="semibold" className="capitalize">
							{variant}
						</Text>

						<View
							className="
                gap-3
                lg:flex-row
                lg:flex-wrap
              "
						>
							{colors.map((color) => (
								<View
									key={color}
									className="
                    flex-row
                    items-center
                    gap-4

                    lg:w-[calc(33.333%-8px)]
                  "
								>
									<Text
										className="
                      w-24
                      capitalize
                      text-muted-foreground
                      lg:w-20
                    "
										numberOfLines={1}
									>
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
					</View>
				))}
			</View>

			{/* Sizes */}
			<View className="gap-4">
				<Text size="lg" weight="semibold">
					Sizes
				</Text>

				<View
					className="
            items-start
            gap-3
            lg:flex-row
            lg:flex-wrap
            lg:items-center
          "
				>
					{sizes.map((size) => (
						<View key={size} className="flex-row items-center gap-3">
							<Text className="w-10 uppercase text-muted-foreground">{size}</Text>

							<Button size={size}>
								<Button.Text>{size.toUpperCase()} Button</Button.Text>
							</Button>
						</View>
					))}
				</View>
			</View>

			{/* Icon buttons */}
			<View className="gap-4">
				<Text size="lg" weight="semibold">
					Icon
				</Text>

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
			</View>

			{/* States */}
			<View className="gap-4">
				<Text size="lg" weight="semibold">
					States
				</Text>

				<View
					className="
            gap-3
            lg:flex-row
            lg:flex-wrap
          "
				>
					<Button>
						<Button.Text>Normal</Button.Text>
					</Button>

					<Button disabled>
						<Button.Text>Disabled</Button.Text>
					</Button>

					<Button variant="outline">
						<Button.Text>Outline</Button.Text>
					</Button>

					<Button variant="ghost">
						<Button.Text>Ghost</Button.Text>
					</Button>

					<Button variant="link">
						<Button.Text>Link</Button.Text>
					</Button>
				</View>
			</View>

			{/* Examples */}
			<View className="gap-4">
				<Text size="lg" weight="semibold">
					Examples
				</Text>

				<View
					className="
            flex-row
            flex-wrap
            gap-3
          "
				>
					<Button color="primary" size="sm">
						<Button.Text>Save</Button.Text>
					</Button>

					<Button color="secondary" size="sm">
						<Button.Text>Cancel</Button.Text>
					</Button>

					<Button color="destructive" size="sm">
						<Button.Text>Delete</Button.Text>
					</Button>

					<Button color="success" size="sm">
						<Button.Text>Confirm</Button.Text>
					</Button>

					<Button color="warning" size="sm">
						<Button.Text>Warning</Button.Text>
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}

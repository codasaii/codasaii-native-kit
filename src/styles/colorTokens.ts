export type ColorVariant = {
	color: string;
	foreground?: string;
	hover?: string;
	active?: string;
	focus?: string;

	highlighted?: string;
	hoverHighlighted?: string;
	activeHighlighted?: string;
	focusHighlighted?: string;

	outlined?: string;
	hoverOutlined?: string;
	activeOutlined?: string;
	focusOutlined?: string;
};

export type ColorToken = {
	background: ColorVariant;
	border: ColorVariant;
	text: ColorVariant;
	ring: ColorVariant;
};

export const colorTokens = {
	primary: {
		background: {
			color: "bg-primary",
			foreground: "bg-primary-foreground",
			hover: "hover:bg-primary/90",
			active: "active:bg-primary/80",

			highlighted: "bg-primary/20",
			hoverHighlighted: "hover:bg-primary/10",
			activeHighlighted: "active:bg-primary/20",
		},
		border: {
			color: "border-primary",
			foreground: "border-primary-foreground",
			hover: "hover:border-primary/90",
			active: "active:border-primary/80",

			outlined: "border-primary/50",
			hoverOutlined: "hover:border-primary/50",
			activeOutlined: "active:border-primary/60",
		},
		text: {
			color: "text-primary",
			foreground: "text-primary-foreground",

			hover: "hover:text-primary/90",
			active: "active:text-primary/80",
		},
		ring: {
			color: "ring-primary",
			focus: "focus-visible:ring-primary/50",

			outlined: "ring-primary/50",
			focusHighlighted: "focus-visible:ring-primary/50",
		},
	},

	secondary: {
		background: {
			color: "bg-secondary",
			foreground: "bg-secondary-foreground",
			hover: "hover:bg-foreground/10",
			active: "active:bg-foreground/15",

			highlighted: "bg-foreground/5",
			hoverHighlighted: "hover:bg-foreground/10",
			activeHighlighted: "active:bg-foreground/15",
		},
		border: {
			color: "border-secondary",
			foreground: "border-secondary-foreground",
			hover: "hover:border-secondary/90",
			active: "active:border-secondary/80",

			outlined: "border-secondary",
			hoverOutlined: "hover:border-secondary",
			activeOutlined: "active:border-secondary",
		},
		text: {
			color: "text-foreground",
			foreground: "text-secondary-foreground",

			hover: "hover:text-foreground/90",
			active: "active:text-foreground/80",
		},
		ring: {
			color: "ring-secondary",
			focus: "focus-visible:ring-foreground/40",

			focusHighlighted: "focus-visible:ring-foreground/30",
		},
	},

	destructive: {
		background: {
			color: "bg-destructive",
			foreground: "bg-destructive-foreground",
			hover: "hover:bg-destructive/85",
			active: "active:bg-destructive/75",

			highlighted: "bg-destructive/20",
			hoverHighlighted: "hover:bg-destructive/10",
			activeHighlighted: "active:bg-destructive/20",
		},
		border: {
			color: "border-destructive",
			foreground: "border-destructive-foreground",
			hover: "hover:border-destructive/90",
			active: "active:border-destructive/80",

			outlined: "border-destructive/50",
			hoverOutlined: "hover:border-destructive/50",
			activeOutlined: "active:border-destructive/60",
		},
		text: {
			color: "text-destructive",
			foreground: "text-destructive-foreground",

			hover: "hover:text-destructive/90",
			active: "active:text-destructive/80",
		},
		ring: {
			color: "ring-destructive",
			focus: "focus-visible:ring-destructive/50",

			focusHighlighted: "focus-visible:ring-destructive/70",
		},
	},

	warning: {
		background: {
			color: "bg-warning",
			foreground: "bg-warning-foreground",
			hover: "hover:bg-warning/90",
			active: "active:bg-warning/80",

			highlighted: "bg-warning/20",
			hoverHighlighted: "hover:bg-warning/10 ",
			activeHighlighted: "active:bg-warning/20 ",
		},
		border: {
			color: "border-warning",
			foreground: "border-warning-foreground",
			hover: "hover:border-warning/90",
			active: "active:border-warning/80",

			outlined: "border-warning/50",
			hoverOutlined: "hover:border-warning/50",
			activeOutlined: "active:border-warning/60",
		},
		text: {
			color: "text-warning",
			foreground: "text-warning-foreground",

			hover: "hover:text-warning/90",
			active: "active:text-warning/80",
		},
		ring: {
			color: "ring-warning",
			focus: "focus-visible:ring-warning/50",

			focusHighlighted: "focus-visible:ring-warning/50",
		},
	},

	success: {
		background: {
			color: "bg-success",
			foreground: "bg-success-foreground",
			hover: "hover:bg-success/90",
			active: "active:bg-success/80",

			highlighted: "bg-success/20",
			hoverHighlighted: "hover:bg-success/10",
			activeHighlighted: "active:bg-success/20",
		},
		border: {
			color: "border-success",
			foreground: "border-success-foreground",
			hover: "hover:border-success/90",
			active: "active:border-success/80",

			outlined: "border-success/50",
			hoverOutlined: "hover:border-success/50",
			activeOutlined: "active:border-success/60",
		},
		text: {
			color: "text-success",
			foreground: "text-success-foreground",

			hover: "hover:text-success/90",
			active: "active:text-success/80",
		},
		ring: {
			color: "ring-success",
			focus: "focus-visible:ring-success/50",

			focusHighlighted: "focus-visible:ring-success/50",
		},
	},

	info: {
		background: {
			color: "bg-info",
			foreground: "bg-info-foreground",
			hover: "hover:bg-info/90",
			active: "active:bg-info/80",

			highlighted: "bg-info/20",
			hoverHighlighted: "hover:bg-info/10",
			activeHighlighted: "active:bg-info/20",
		},
		border: {
			color: "border-info",
			foreground: "border-info-foreground",
			hover: "hover:border-info/90",
			active: "active:border-info/80",

			outlined: "border-info/50",
			hoverOutlined: "hover:border-info/50",
			activeOutlined: "active:border-info/60",
		},
		text: {
			color: "text-info",
			foreground: "text-info-foreground",

			hover: "hover:text-info/90",
			active: "active:text-info/80",
		},
		ring: {
			color: "ring-info",
			focus: "focus-visible:ring-info/50",

			focusHighlighted: "focus-visible:ring-info/50",
		},
	},
} as const satisfies Record<string, ColorToken>;

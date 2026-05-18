import { cn } from '$lib/utils';

const base =
	'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium text-sm rounded-lg transition-[background-color,border-color,color,opacity,transform,box-shadow] duration-200 ease-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0';

const variants = {
	default:
		'bg-primary-subtle-bg text-primary border border-ring shadow-glass hover:bg-primary/15 focus-visible:border-primary',
	outline:
		'bg-transparent text-foreground border border-border shadow-glass hover:bg-accent hover:text-accent-foreground focus-visible:border-primary',
	destructive:
		'bg-destructive-subtle-bg text-destructive border border-destructive-ring shadow-glass hover:bg-destructive/15 focus-visible:ring-destructive-ring',
	secondary:
		'bg-secondary text-secondary-foreground border border-border shadow-glass hover:opacity-80 focus-visible:border-primary',
	ghost:
		'hover:bg-accent hover:text-accent-foreground border border-transparent focus-visible:border-primary',
	link: 'text-primary underline-offset-4 border border-transparent hover:underline focus-visible:border-primary',
	success:
		'bg-success-subtle-bg text-success border border-success-ring shadow-glass hover:bg-success/15 focus-visible:ring-success-ring',
	warning:
		'bg-warning-subtle-bg text-warning border border-warning-ring shadow-glass hover:bg-warning/15 focus-visible:ring-warning-ring',
	info: 'bg-info-subtle-bg text-info border border-info-ring shadow-glass hover:bg-info/15 focus-visible:ring-info-ring'
} as const;

const sizes = {
	xs: 'h-6 gap-1.5 px-2 text-xs rounded-sm [&_svg:not([class*="size-"])]:size-2.5',
	sm: 'h-7 px-2.5 gap-1.5 [&_svg:not([class*="size-"])]:size-3.5',
	md: 'h-8 px-3 py-2',
	lg: 'h-9 px-3.5',
	xl: 'h-10 text-base px-4',
	'icon-xs': 'size-6 rounded-sm',
	'icon-sm': 'size-7',
	'icon-md': 'size-8',
	'icon-lg': 'size-9',
	'icon-xl': 'size-10 [&_svg:not([class*="size-"])]:size-5'
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonVariants({
	variant = 'default',
	size = 'md',
	pill = false,
	clickEffect = true,
	className = ''
}: {
	variant?: ButtonVariant;
	size?: ButtonSize;
	pill?: boolean;
	clickEffect?: boolean;
	className?: string;
} = {}): string {
	return cn(
		base,
		variants[variant],
		sizes[size],
		{
			'active:scale-98': clickEffect,
			'rounded-full': pill
		},
		className
	);
}

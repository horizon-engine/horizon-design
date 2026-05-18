<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Toggle } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		variant = 'default',
		size = 'md',
		pressed = $bindable(false),
		...rest
	}: {
		class?: string;
		children?: Snippet;
		variant?: 'default' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		pressed?: boolean;
		[key: string]: unknown;
	} = $props();

	const sizes: Record<string, string> = {
		sm: 'h-7 px-2.5 text-xs',
		md: 'h-9 px-3',
		lg: 'h-10 px-4 text-base'
	};
</script>

<Toggle.Root
	class={cn(
		'focus-visible:ring-ring text-muted-foreground inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
		variant === 'default' &&
			'hover:bg-muted-surface-active hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-transparent',
		variant === 'outline' &&
			'border-border hover:bg-muted-surface-active hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary-border-active border bg-transparent',
		sizes[size],
		className
	)}
	data-slot="toggle"
	{pressed}
	onPressedChange={(details) => (pressed = details)}
	{...rest}
>
	{@render children?.()}
</Toggle.Root>

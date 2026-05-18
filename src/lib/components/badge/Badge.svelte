<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	const sizes: Record<'sm' | 'md' | 'lg', string> = {
		sm: 'px-1.5 py-0.5 text-xs rounded',
		md: 'px-2.5 py-0.5 text-xs rounded-md',
		lg: 'px-3 py-1 text-sm rounded-md'
	};

	let {
		variant = 'default',
		size = 'md',
		class: className = '',
		children,
		...rest
	}: {
		variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const base =
		'inline-flex items-center border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring backdrop-blur-sm';

	const variants: Record<string, string> = {
		default: 'bg-primary-subtle-bg border-primary-subtle-border text-primary shadow-badge-primary',
		secondary: 'bg-secondary-muted border-border-muted text-secondary-foreground shadow-glass',
		outline: 'bg-background-ghost border-border-subtle text-foreground shadow-glass',
		destructive:
			'bg-destructive-subtle-bg border-destructive-subtle-border text-destructive shadow-glass',
		success: 'bg-success-subtle-bg border-success-subtle-border text-success shadow-glass',
		warning: 'bg-warning-subtle-bg border-warning-subtle-border text-warning shadow-glass',
		info: 'bg-info-subtle-bg border-info-subtle-border text-info shadow-glass'
	};
</script>

<span class={cn(base, variants[variant], sizes[size], className)} data-slot="badge" {...rest}>
	{@render children?.()}
</span>

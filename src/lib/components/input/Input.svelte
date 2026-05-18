<script lang="ts">
	import { Field } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		size = 'md',
		value = $bindable(),
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		value?: unknown;
		[key: string]: unknown;
	} = $props();

	const sizes: Record<string, string> = {
		sm: 'h-7 px-2.5 text-xs',
		md: 'h-9 px-3 text-sm',
		lg: 'h-11 px-4 text-base'
	};
</script>

<Field.Input
	class={cn(
		'placeholder:text-muted-foreground focus-visible:ring-ring border-border bg-input text-foreground focus-visible:border-primary flex w-full rounded-lg border shadow-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
		sizes[size],
		className
	)}
	data-slot="input"
	bind:value
	{...rest}
/>

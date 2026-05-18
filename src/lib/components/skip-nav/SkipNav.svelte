<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		href = '#main-content',
		class: className = '',
		children,
		...rest
	}: {
		href?: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<a
	class={cn(
		'focus-visible:bg-primary focus-visible:text-primary-foreground sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:rounded-lg focus-visible:px-4 focus-visible:py-2 focus-visible:shadow-lg',
		className
	)}
	{href}
	data-slot="skip-nav"
	{...rest}
>
	{@render children?.()}
</a>

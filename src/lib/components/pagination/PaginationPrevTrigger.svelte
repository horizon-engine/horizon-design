<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Pagination } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Pagination.PrevTrigger
	class={cn(
		'hover:bg-accent hover:text-accent-foreground inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
		className
	)}
	data-slot="pagination-prev-trigger"
	{...rest}
>
	{@render children?.()}
</Pagination.PrevTrigger>

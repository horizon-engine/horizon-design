<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Pagination } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		value,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		value: number;
		[key: string]: unknown;
	} = $props();
</script>

<Pagination.Item
	{value}
	type="page"
	class={cn(
		'hover:bg-accent hover:text-accent-foreground data-selected:bg-primary data-selected:text-primary-foreground inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 data-selected:border-transparent',
		className
	)}
	data-slot="pagination-item"
	{...rest}
>
	{@render children?.()}
</Pagination.Item>

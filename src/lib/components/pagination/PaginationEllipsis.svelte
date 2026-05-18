<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Pagination } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		index,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		index: number;
		[key: string]: unknown;
	} = $props();
</script>

<Pagination.Ellipsis
	{index}
	class={cn('text-muted-foreground flex size-8 items-center justify-center text-sm', className)}
	data-slot="pagination-ellipsis"
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		&#8230;
	{/if}
</Pagination.Ellipsis>

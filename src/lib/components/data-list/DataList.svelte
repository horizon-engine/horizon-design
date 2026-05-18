<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface DataListItem {
		label: string;
		value: string | Snippet;
	}

	let {
		items = [],
		class: className = '',
		...rest
	}: {
		items?: DataListItem[];
		class?: string;
		[key: string]: unknown;
	} = $props();

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<dl class={cn('flex flex-col gap-3', className)} data-slot="data-list" {...rest}>
	{#each items as item, i (i)}
		<div class="flex flex-row gap-4" data-slot="data-list-item">
			<dt class="text-muted-foreground min-w-28 text-sm font-medium" data-slot="data-list-label">
				{item.label}
			</dt>
			<dd class="text-foreground text-sm font-medium" data-slot="data-list-value">
				{#if isSnippet(item.value)}
					{@render item.value()}
				{:else}
					{item.value}
				{/if}
			</dd>
		</div>
	{/each}
</dl>

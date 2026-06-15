<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	interface ToggleItem {
		value: string;
		content: Snippet;
	}

	let {
		items = [],
		class: className = '',
		value = $bindable([]),
		...rest
	}: {
		items?: ToggleItem[];
		class?: string;
		value?: string[];
		[key: string]: unknown;
	} = $props();
</script>

<ToggleGroup.Root
	class={cn(
		'border-border bg-muted inline-flex items-center gap-1 rounded-lg border p-1',
		className
	)}
	data-slot="toggle-group"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#each items as item (item.value)}
		<ToggleGroup.Item
			value={item.value}
			class="text-muted-foreground hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:border-border inline-flex h-7 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium transition-colors data-[state=on]:shadow-sm"
			data-slot="toggle-group-item"
		>
			{@render item.content()}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>

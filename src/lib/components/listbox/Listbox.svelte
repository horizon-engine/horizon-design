<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Listbox, createListCollection } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		deselectable,
		class: className = '',
		label = '',
		items = [],
		renderItem,
		value = $bindable([]),
		...rest
	}: {
		deselectable?: boolean;
		class?: string;
		label?: string;
		items?: Array<{ label: string; value: string }>;
		renderItem?: Snippet<[{ label: string; value: string }]>;
		value?: string[];
		[key: string]: unknown;
	} = $props();

	const collection = $derived(createListCollection({ items }));
</script>

<Listbox.Root
	{collection}
	{deselectable}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="listbox"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<Listbox.Label class="text-foreground text-sm font-medium">{label}</Listbox.Label>
	{/if}
	<Listbox.Content
		class="border-border bg-popover max-h-60 overflow-auto rounded-xl border p-1 shadow-xl backdrop-blur-xl"
	>
		{#each items as item (item.value)}
			<Listbox.Item
				{item}
				class="hover:bg-accent data-highlighted:bg-accent data-[state=checked]:bg-primary-subtle-bg data-[state=checked]:text-primary relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors select-none"
				data-slot="listbox-item"
			>
				<Listbox.ItemText>
					{#if renderItem}
						{@render renderItem(item)}
					{:else}
						{item.label}
					{/if}
				</Listbox.ItemText>
				<Listbox.ItemIndicator class="ml-auto">
					<MingcuteCheckLine class="text-primary size-4" />
				</Listbox.ItemIndicator>
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox.Root>

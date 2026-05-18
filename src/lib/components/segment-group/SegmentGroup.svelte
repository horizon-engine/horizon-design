<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SegmentGroup } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	interface SegmentItem {
		value: string;
		label: string | Snippet;
	}

	type SizeConfig = { item: string };

	const sizes: Record<'sm' | 'md' | 'lg', SizeConfig> = {
		sm: { item: 'px-2 py-0.75 text-xs rounded-md' },
		md: { item: 'px-3 py-1 text-sm rounded-md' },
		lg: { item: 'px-4 py-1.5 text-base rounded-md' }
	};

	let {
		items = [],
		class: className = '',
		size = 'md',
		value = $bindable(''),
		...rest
	}: {
		items?: SegmentItem[];
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		value?: string | null;
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<SegmentGroup.Root
	class={cn(
		'bg-muted border-border inline-flex items-stretch gap-1 rounded-lg border p-1',
		className
	)}
	data-slot="segment-group"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	<SegmentGroup.Indicator
		class="bg-background border-border absolute rounded-md border shadow-sm transition-all"
		style="left: var(--left); top: var(--top); width: var(--width); height: var(--height);"
	/>
	{#each items as item (item.value)}
		<SegmentGroup.Item
			value={item.value}
			class={cn(
				'text-muted-foreground data-[state=checked]:text-foreground relative z-10 flex items-center justify-center font-medium transition-colors',
				sz.item
			)}
			data-slot="segment-group-item"
		>
			<SegmentGroup.ItemText>
				{#if isSnippet(item.label)}
					{@render item.label()}
				{:else}
					{item.label}
				{/if}
			</SegmentGroup.ItemText>
			<SegmentGroup.ItemControl class="sr-only" />
			<SegmentGroup.ItemHiddenInput />
		</SegmentGroup.Item>
	{/each}
</SegmentGroup.Root>

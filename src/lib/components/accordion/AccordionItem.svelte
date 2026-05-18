<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Accordion } from '@ark-ui/svelte';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		value,
		trigger,
		children,
		...rest
	}: {
		class?: string;
		value: string;
		trigger?: string | Snippet;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Accordion.Item
	{value}
	class={cn('border-border border-b', className)}
	data-slot="accordion-item"
	{...rest}
>
	<Accordion.ItemTrigger
		class="focus-visible:ring-ring flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all outline-none focus-visible:rounded-sm focus-visible:ring-2 [&[data-state=open]>svg]:rotate-180"
		data-slot="accordion-trigger"
	>
		{#if typeof trigger === 'string'}
			{trigger}
		{:else if trigger}
			{@render trigger()}
		{/if}
		<Accordion.ItemIndicator>
			<MingcuteDownLine class="size-4 shrink-0 transition-transform duration-200" />
		</Accordion.ItemIndicator>
	</Accordion.ItemTrigger>
	<Accordion.ItemContent
		class="data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden text-sm"
		data-slot="accordion-content"
	>
		<div class="pt-0 pb-4">
			{@render children?.()}
		</div>
	</Accordion.ItemContent>
</Accordion.Item>

<script lang="ts">
	import { Editable } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		defaultValue,
		value = $bindable(undefined),
		placeholder,
		...rest
	}: {
		class?: string;
		label?: string;
		defaultValue?: string;
		value?: string;
		placeholder?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Editable.Root
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="editable"
	{defaultValue}
	{value}
	{placeholder}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<Editable.Label class="text-foreground text-sm font-medium" data-slot="editable-label">
			{label}
		</Editable.Label>
	{/if}
	<Editable.Preview
		class="hover:border-border hover:bg-input flex min-h-8 cursor-text items-center rounded-lg border border-transparent px-3 py-1.5 text-sm transition-colors"
		data-slot="editable-preview"
	/>
	<Editable.Input
		class="border-border bg-input text-foreground focus-visible:ring-ring focus-visible:border-primary flex h-8 w-full rounded-lg border px-3 py-1 text-sm outline-none focus-visible:ring-2"
		data-slot="editable-input"
	/>
</Editable.Root>

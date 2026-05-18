<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Collapsible } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		trigger,
		children,
		open = $bindable(false),
		...rest
	}: {
		class?: string;
		trigger?: Snippet;
		children?: Snippet;
		open?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Collapsible.Root
	class={cn('flex flex-col', className)}
	data-slot="collapsible"
	{open}
	onOpenChange={(details) => (open = details.open)}
	{...rest}
>
	{#if trigger}
		<Collapsible.Trigger
			class="focus-visible:ring-ring flex items-center gap-2 text-sm font-medium outline-none focus-visible:rounded-sm focus-visible:ring-2"
			data-slot="collapsible-trigger"
		>
			{@render trigger()}
		</Collapsible.Trigger>
	{/if}
	<Collapsible.Content
		class="data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden"
		data-slot="collapsible-content"
	>
		{@render children?.()}
	</Collapsible.Content>
</Collapsible.Root>

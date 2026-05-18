<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Swap } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		on,
		off,
		class: className = '',
		swap = false,
		lazyMount = true,
		unmountOnExit = true,
		...rest
	}: {
		on?: Snippet;
		off?: Snippet;
		class?: string;
		swap?: boolean;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Swap.Root class={cn(className)} data-slot="swap" {swap} {lazyMount} {unmountOnExit} {...rest}>
	<Swap.Indicator type="on" data-slot="swap-indicator">
		{@render on?.()}
	</Swap.Indicator>
	<Swap.Indicator type="off" data-slot="swap-indicator">
		{@render off?.()}
	</Swap.Indicator>
</Swap.Root>

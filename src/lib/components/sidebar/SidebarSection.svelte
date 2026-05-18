<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		children,
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div class={cn('flex flex-col gap-0.5', className)} data-slot="sidebar-section" {...rest}>
	{#if label}
		<p class="text-muted-foreground px-2 py-1 text-xs font-semibold tracking-wider uppercase">
			{label}
		</p>
	{/if}
	{@render children?.()}
</div>

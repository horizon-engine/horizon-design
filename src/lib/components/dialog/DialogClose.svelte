<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.CloseTrigger
	class={cn(
		'text-muted-foreground focus-visible:ring-ring rounded-sm transition-opacity outline-none focus-visible:ring-2 disabled:pointer-events-none',
		{ 'absolute top-4 right-4 p-1 opacity-70 hover:opacity-100': !children },
		className
	)}
	data-slot="dialog-close"
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M18 6 6 18" /><path d="m6 6 12 12" />
		</svg>
		<span class="sr-only">Close</span>
	{/if}
</Dialog.CloseTrigger>

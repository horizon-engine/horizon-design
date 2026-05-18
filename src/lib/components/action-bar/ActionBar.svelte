<script lang="ts">
	import type { Snippet } from 'svelte';
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

<div
	class={cn(
		'border-border bg-popover-frosted fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl',
		className
	)}
	data-slot="action-bar"
	{...rest}
>
	{@render children?.()}
</div>

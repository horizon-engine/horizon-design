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
		'hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
		className
	)}
	data-slot="item"
	{...rest}
>
	{@render children?.()}
</div>

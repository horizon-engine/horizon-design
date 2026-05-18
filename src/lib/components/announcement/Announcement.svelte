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
		'border-primary-subtle-border bg-primary-subtle-bg text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm',
		className
	)}
	data-slot="announcement"
	{...rest}
>
	{@render children?.()}
</div>

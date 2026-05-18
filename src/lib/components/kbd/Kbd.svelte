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

<kbd
	class={cn(
		'border-border bg-muted text-muted-foreground inline-flex items-center justify-center rounded border px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm',
		className
	)}
	data-slot="kbd"
	{...rest}
>
	{@render children?.()}
</kbd>

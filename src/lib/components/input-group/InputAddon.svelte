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
		'border-border bg-muted text-muted-foreground flex h-9 shrink-0 items-center border border-r-0 px-3 text-sm first:rounded-l-lg last:rounded-r-lg last:border-r last:border-l-0',
		className
	)}
	data-slot="input-addon"
	{...rest}
>
	{@render children?.()}
</div>

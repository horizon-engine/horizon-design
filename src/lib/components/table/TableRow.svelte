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

<tr
	class={cn(
		'border-border hover:bg-muted-surface-hover data-[state=selected]:bg-muted border-b transition-colors',
		className
	)}
	data-slot="table-row"
	{...rest}
>
	{@render children?.()}
</tr>

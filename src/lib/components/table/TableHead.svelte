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

<th
	class={cn(
		'text-muted-foreground h-10 px-3 text-left align-middle text-xs font-medium has-[[role=checkbox]]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
		className
	)}
	data-slot="table-head"
	{...rest}
>
	{@render children?.()}
</th>

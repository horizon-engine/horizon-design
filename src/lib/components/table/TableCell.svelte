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

<td
	class={cn(
		'p-3 align-middle text-sm has-[[role=checkbox]]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
		className
	)}
	data-slot="table-cell"
	{...rest}
>
	{@render children?.()}
</td>

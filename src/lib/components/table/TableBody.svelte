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

<tbody class={cn('[&_tr:last-child]:border-0', className)} data-slot="table-body" {...rest}>
	{@render children?.()}
</tbody>

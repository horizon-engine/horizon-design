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

<thead
	class={cn('[&_tr]:border-border [&_tr]:border-b', className)}
	data-slot="table-header"
	{...rest}
>
	{@render children?.()}
</thead>

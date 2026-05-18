<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		href = '#',
		children,
		...rest
	}: {
		class?: string;
		href?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<a
	class={cn('before:absolute before:inset-0 before:z-0', className)}
	{href}
	data-slot="link-overlay"
	{...rest}
>
	{@render children?.()}
</a>

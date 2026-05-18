<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		active = false,
		href,
		children,
		...rest
	}: {
		class?: string;
		active?: boolean;
		href?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const itemClass = $derived(
		cn(
			'flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors',
			active
				? 'bg-primary-subtle-bg text-primary'
				: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
			className
		)
	);
</script>

{#if href}
	<a
		{href}
		class={itemClass}
		aria-current={active ? 'page' : undefined}
		data-slot="sidebar-item"
		{...rest}
	>
		{@render children?.()}
	</a>
{:else}
	<button type="button" class={itemClass} data-slot="sidebar-item" {...rest}>
		{@render children?.()}
	</button>
{/if}

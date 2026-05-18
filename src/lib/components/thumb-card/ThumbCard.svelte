<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		href = '',
		children,
		...rest
	}: {
		class?: string;
		label?: string;
		href?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'group border-border bg-card hover:border-primary-border-hover hover:shadow-primary-shadow relative flex flex-col overflow-hidden rounded-xl border transition-all hover:shadow-lg',
		className
	)}
	data-slot="thumb-card"
	{...rest}
>
	<div class="bg-muted-surface flex min-h-40 items-center justify-center p-6">
		{@render children?.()}
	</div>
	{#if label}
		<div class="border-border border-t px-4 py-3">
			{#if href}
				<a {href} class="text-foreground hover:text-primary text-sm font-medium transition-colors">
					{label}
				</a>
			{:else}
				<span class="text-foreground text-sm font-medium">{label}</span>
			{/if}
		</div>
	{/if}
</div>

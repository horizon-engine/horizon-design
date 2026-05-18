<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		title,
		description,
		children,
		footer,
		...rest
	}: {
		class?: string;
		title?: string;
		description?: string;
		children?: Snippet;
		footer?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'bg-card border-border text-card-foreground flex flex-col rounded-xl border shadow-sm',
		className
	)}
	data-slot="card"
	{...rest}
>
	{#if title || description}
		<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="card-header">
			{#if title}
				<h3 class="text-xl leading-none font-semibold tracking-tight" data-slot="card-title">
					{title}
				</h3>
			{/if}
			{#if description}
				<p class="text-muted-foreground text-sm" data-slot="card-description">{description}</p>
			{/if}
		</div>
	{/if}
	{#if children}
		<div class="min-h-0 flex-1 p-6 pt-4" data-slot="card-content">
			{@render children()}
		</div>
	{/if}
	{#if footer}
		<div class="flex items-center p-6 pt-0" data-slot="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

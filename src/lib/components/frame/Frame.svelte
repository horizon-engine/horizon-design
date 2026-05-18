<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		title = '',
		children,
		...rest
	}: {
		class?: string;
		title?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'border-border bg-card flex flex-col overflow-hidden rounded-xl border shadow-sm',
		className
	)}
	data-slot="frame"
	{...rest}
>
	{#if title}
		<div class="border-border bg-muted-surface-hover flex items-center gap-2 border-b px-4 py-2.5">
			<div class="flex items-center gap-1.5">
				<span class="bg-destructive-dot size-3 rounded-full"></span>
				<span class="bg-warning-dot size-3 rounded-full"></span>
				<span class="bg-success-dot size-3 rounded-full"></span>
			</div>
			{#if title}
				<span class="text-muted-foreground flex-1 text-center text-xs">{title}</span>
			{/if}
		</div>
	{/if}
	<div class="flex-1 overflow-auto">
		{@render children?.()}
	</div>
</div>

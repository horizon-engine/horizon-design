<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		collapsed = false,
		header,
		footer,
		children,
		...rest
	}: {
		class?: string;
		collapsed?: boolean;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<aside
	class={cn(
		'border-border bg-card flex h-full flex-col border-r transition-all duration-300',
		collapsed ? 'w-14' : 'w-60',
		className
	)}
	data-slot="sidebar"
	data-collapsed={collapsed}
	{...rest}
>
	{#if header}
		<div class="border-border flex h-14 items-center border-b px-4" data-slot="sidebar-header">
			{@render header()}
		</div>
	{/if}
	<div class="flex flex-1 flex-col gap-1 overflow-y-auto p-3" data-slot="sidebar-content">
		{@render children?.()}
	</div>
	{#if footer}
		<div class="border-border border-t p-3" data-slot="sidebar-footer">
			{@render footer()}
		</div>
	{/if}
</aside>

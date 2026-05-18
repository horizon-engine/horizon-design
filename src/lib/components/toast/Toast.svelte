<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Toast } from '@ark-ui/svelte';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		title,
		description,
		type = 'info',
		children,
		...rest
	}: {
		class?: string;
		title?: string;
		description?: string;
		type?: 'info' | 'success' | 'warning' | 'error';
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const typeStyles: Record<string, string> = {
		info: 'border-info-subtle-border bg-info-subtle-bg',
		success: 'border-success-subtle-border bg-success-subtle-bg',
		warning: 'border-warning-subtle-border bg-warning-subtle-bg',
		error: 'border-destructive-subtle-border bg-destructive-subtle-bg'
	};
</script>

<Toast.Root
	class={cn(
		'toast-root group bg-toast-bg shadow-toast pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 backdrop-blur-xl',
		typeStyles[type],
		className
	)}
	data-slot="toast"
	{...rest}
>
	<div class="flex flex-1 flex-col gap-1">
		{#if title}
			<Toast.Title class="text-sm leading-none font-semibold tracking-tight">
				{title}
			</Toast.Title>
		{/if}
		{#if description}
			<Toast.Description class="text-muted-foreground text-sm">
				{description}
			</Toast.Description>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	<Toast.CloseTrigger
		class="text-muted-foreground focus-visible:ring-ring absolute top-2 right-2 rounded p-1 opacity-0 transition-opacity outline-none group-hover:opacity-70 hover:opacity-100 focus-visible:ring-2"
	>
		<MingcuteCloseLine class="size-3.5" />
		<span class="sr-only">Close</span>
	</Toast.CloseTrigger>
</Toast.Root>

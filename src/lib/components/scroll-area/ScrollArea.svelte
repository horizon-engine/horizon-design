<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ScrollArea } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		innerClass = '',
		children,
		...rest
	}: {
		class?: string;
		innerClass?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	let contentEl = $state<HTMLElement | null>(null);
	let hasOverflow = $state(false);

	$effect(() => {
		if (!contentEl) return;
		const viewport = contentEl.parentElement as HTMLElement;

		const check = () => {
			hasOverflow = contentEl!.offsetHeight > viewport.clientHeight;
		};

		const ro = new ResizeObserver(check);
		ro.observe(contentEl);
		ro.observe(viewport);
		check();

		return () => ro.disconnect();
	});
</script>

<ScrollArea.Root
	class={cn('relative overflow-hidden', className)}
	data-slot="scroll-area"
	{...rest}
>
	<ScrollArea.Viewport
		class="size-full scrollbar-none rounded-[inherit] [&::-webkit-scrollbar]:hidden"
	>
		<div class={cn('size-full', innerClass)} bind:this={contentEl}>
			{@render children?.()}
		</div>
	</ScrollArea.Viewport>
	<ScrollArea.Scrollbar
		orientation="vertical"
		class={cn(
			'group/scrollbar w-2.5 touch-none border-l border-l-transparent p-px transition-colors select-none',
			hasOverflow ? 'flex' : 'hidden'
		)}
	>
		<ScrollArea.Thumb
			class="bg-border hover:bg-scroll-thumb group-data-scrolling/scrollbar:bg-scroll-thumb-hover group-data-dragging/scrollbar:bg-scroll-thumb-active relative flex-1 rounded-full transition-colors"
		/>
	</ScrollArea.Scrollbar>
	<ScrollArea.Corner />
</ScrollArea.Root>

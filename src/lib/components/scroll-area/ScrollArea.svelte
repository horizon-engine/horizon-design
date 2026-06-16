<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ScrollArea } from '@ark-ui/svelte';
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

	let viewportHeight = $state(0);
	let contentHeight = $state(0);
	let hasOverflow = $derived(contentHeight > viewportHeight);
</script>

<ScrollArea.Root
	class={cn('relative overflow-hidden', className)}
	data-slot="scroll-area"
	{...rest}
>
	<div bind:clientHeight={viewportHeight} class="size-full">
		<ScrollArea.Viewport
			class="size-full scrollbar-none rounded-[inherit] [&::-webkit-scrollbar]:hidden"
		>
			<div bind:offsetHeight={contentHeight}>
				{@render children?.()}
			</div>
		</ScrollArea.Viewport>
	</div>
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

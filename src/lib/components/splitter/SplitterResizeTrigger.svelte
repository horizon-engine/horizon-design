<script lang="ts">
	import { Splitter } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		id,
		...rest
	}: {
		class?: string;
		id: `${string}:${string}`;
		[key: string]: unknown;
	} = $props();
</script>

<Splitter.ResizeTrigger
	{id}
	class={cn(
		'focus-visible:ring-ring bg-border hover:bg-primary-bg-hover active:bg-primary flex touch-none items-center justify-center select-none focus-visible:ring-2 focus-visible:outline-none data-[orientation=horizontal]:w-1.5 data-[orientation=horizontal]:cursor-col-resize data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-full data-[orientation=vertical]:cursor-row-resize',
		className
	)}
	data-slot="splitter-resize-trigger"
	{...rest}
/>

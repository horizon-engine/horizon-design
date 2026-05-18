<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteDownLine from '~icons/mingcute/down-line';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div class="relative w-full">
	<select
		class={cn(
			'border-border bg-input text-foreground focus-visible:ring-ring focus-visible:border-primary flex h-8 w-full appearance-none rounded-lg border px-3 py-1 pr-8 text-sm shadow-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		data-slot="native-select"
		{...rest}
	>
		{@render children?.()}
	</select>
	<MingcuteDownLine
		class="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
	/>
</div>

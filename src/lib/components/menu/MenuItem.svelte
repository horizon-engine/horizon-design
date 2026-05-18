<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		value,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		value: string;
		[key: string]: unknown;
	} = $props();
</script>

<Menu.Item
	{value}
	class={cn(
		'hover:bg-accent hover:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	data-slot="menu-item"
	{...rest}
>
	{@render children?.()}
</Menu.Item>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Menu } from '@ark-ui/svelte';
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
</script>

<Menu.ItemGroupLabel
	class={cn('text-muted-foreground px-2 py-1.5 text-xs font-medium', className)}
	data-slot="menu-group-label"
	{...rest}
>
	{@render children?.()}
</Menu.ItemGroupLabel>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Drawer } from '@ark-ui/svelte';

	let {
		children,
		...rest
	}: {
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Drawer.CloseTrigger data-slot="drawer-close" {...rest}>
	{@render children?.()}
</Drawer.CloseTrigger>

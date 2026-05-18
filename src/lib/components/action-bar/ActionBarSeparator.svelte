<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		...rest
	}: {
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn('bg-border mx-1 h-6 w-px', className)}
	role="separator"
	data-slot="action-bar-separator"
	{...rest}
></div>

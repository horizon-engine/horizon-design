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
	class={cn('bg-muted animate-pulse rounded-md [animation-duration:2s]', className)}
	data-slot="skeleton"
	{...rest}
></div>

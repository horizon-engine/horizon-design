<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Progress } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		children,
		value = $bindable(0),
		max = 100,
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		value?: number;
		max?: number;
		[key: string]: unknown;
	} = $props();
</script>

<Progress.Root
	{value}
	{max}
	class={cn('flex w-full flex-col gap-2', className)}
	data-slot="progress"
	{...rest}
>
	{#if label}
		<Progress.Label class="text-sm font-medium" data-slot="progress-label">{label}</Progress.Label>
	{/if}
	{@render children?.()}
	<Progress.Track class="bg-secondary relative h-2 w-full overflow-hidden rounded-full">
		<Progress.Range class="bg-primary h-full rounded-r-full transition-all" />
	</Progress.Track>
</Progress.Root>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Slider } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		showValue = false,
		children,
		value = $bindable([0]),
		...rest
	}: {
		class?: string;
		label?: string;
		showValue?: boolean;
		children?: Snippet;
		value?: number[];
		[key: string]: unknown;
	} = $props();
</script>

<Slider.Root
	class={cn('relative flex w-full touch-none flex-col gap-2 select-none', className)}
	data-slot="slider"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label || showValue}
		<div class="flex items-center justify-between">
			{#if label}
				<Slider.Label class="text-sm leading-none font-medium" data-slot="slider-label"
					>{label}</Slider.Label
				>
			{/if}
			{#if showValue}
				<Slider.ValueText
					class="text-muted-foreground text-sm tabular-nums"
					data-slot="slider-value"
				/>
			{/if}
		</div>
	{/if}
	{@render children?.()}
	<Slider.Control class="relative flex w-full items-center">
		<Slider.Track class="bg-slider-track relative h-1.5 w-full grow overflow-hidden rounded-full">
			<Slider.Range class="bg-primary absolute h-full" />
		</Slider.Track>
		<Slider.Thumb
			index={0}
			class="border-primary focus-visible:ring-ring block size-4 rounded-full border bg-white shadow transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
		/>
	</Slider.Control>
</Slider.Root>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AngleSlider } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		size = 120,
		value = $bindable(0),
		children,
		...rest
	}: {
		class?: string;
		size?: number;
		value?: number;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<AngleSlider.Root
	class={cn('flex flex-col items-center gap-3', className)}
	data-slot="angle-slider"
	step={0.1}
	bind:value
	{...rest}
>
	<AngleSlider.Control
		class="border-border bg-muted relative rounded-full border-2"
		style="width: {size}px; height: {size}px;"
	>
		<AngleSlider.Thumb class="absolute inset-0 cursor-grab active:cursor-grabbing">
			<div
				class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full"
			>
				<div
					class="bg-primary absolute h-0.5 origin-left rounded-full"
					style="width: calc({size / 2}px - 12px); left: 50%; top: calc(50% - 1px);"
				></div>
				<div class="bg-primary relative z-10 size-3 rounded-full"></div>
			</div>
		</AngleSlider.Thumb>
	</AngleSlider.Control>
	<AngleSlider.ValueText class="text-foreground font-mono text-sm font-medium tabular-nums">
		{Math.round(value)}°
	</AngleSlider.ValueText>
	<AngleSlider.HiddenInput />
	{@render children?.()}
</AngleSlider.Root>

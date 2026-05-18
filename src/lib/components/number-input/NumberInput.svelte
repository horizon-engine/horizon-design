<script lang="ts">
	import type { Snippet } from 'svelte';
	import { NumberInput } from '@ark-ui/svelte';
	import MingcuteUpLine from '~icons/mingcute/up-line';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		children,
		value = $bindable(''),
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		value?: string;
		[key: string]: unknown;
	} = $props();
</script>

<NumberInput.Root
	class={cn('flex min-w-12 flex-col gap-1.5', className)}
	data-slot="number-input"
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	{#if label}
		<NumberInput.Label class="text-sm leading-none font-medium" data-slot="number-input-label">
			{label}
		</NumberInput.Label>
	{/if}
	{@render children?.()}
	<NumberInput.Control
		class="border-border bg-input focus-visible:border-primary focus-visible:ring-ring flex h-9 w-full overflow-hidden rounded-lg border transition-all focus-visible:ring-2"
	>
		<NumberInput.Input
			class="placeholder:text-muted-foreground text-foreground min-w-0 flex-1 bg-transparent pl-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<div class="border-border flex shrink-0 flex-col border-l">
			<NumberInput.IncrementTrigger
				class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex flex-1 items-center justify-center px-1.5 transition-colors outline-none focus-visible:ring-1"
			>
				<MingcuteUpLine class="size-3" />
			</NumberInput.IncrementTrigger>
			<NumberInput.DecrementTrigger
				class="text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex flex-1 items-center justify-center border-t px-1.5 transition-colors outline-none focus-visible:ring-1"
			>
				<MingcuteDownLine class="size-3" />
			</NumberInput.DecrementTrigger>
		</div>
	</NumberInput.Control>
</NumberInput.Root>

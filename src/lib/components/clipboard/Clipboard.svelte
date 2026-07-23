<script lang="ts">
	import { Clipboard } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteCopy2Line from '~icons/mingcute/copy-2-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		value,
		label,
		class: className = '',
		...rest
	}: {
		value: string;
		label?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Clipboard.Root
	{value}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="clipboard"
	{...rest}
>
	{#if label}
		<Clipboard.Label
			class="text-foreground mb-1 block text-sm font-medium"
			data-slot="clipboard-label"
		>
			{label}
		</Clipboard.Label>
	{/if}
	<div class="flex items-center gap-2">
		<div
			class="border-border bg-input text-foreground flex h-8 flex-1 items-center gap-2 rounded-lg border px-3 text-sm"
			data-slot="clipboard-input"
		>
			<Clipboard.ValueText class="flex-1 truncate select-text" />
		</div>
		<Clipboard.Trigger
			class="border-border hover:bg-accent text-muted-foreground hover:text-foreground relative inline-flex h-8 w-8 items-center justify-center gap-2 rounded-lg border transition-all"
			data-slot="clipboard-trigger"
		>
			<Clipboard.Indicator>
				<MingcuteCopy2Line class="size-4" />
				{#snippet copied()}
					<MingcuteCheckLine class="text-success size-4" />
				{/snippet}
			</Clipboard.Indicator>
		</Clipboard.Trigger>
	</div>
</Clipboard.Root>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SignaturePad } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label = '',
		children,
		...rest
	}: {
		class?: string;
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<SignaturePad.Root class={cn('flex flex-col gap-2', className)} data-slot="signature-pad" {...rest}>
	{#if label}
		<SignaturePad.Label class="text-foreground text-sm font-medium">{label}</SignaturePad.Label>
	{/if}
	<SignaturePad.Control
		class="border-border bg-muted-surface relative h-40 w-full cursor-crosshair overflow-hidden rounded-xl border"
	>
		<SignaturePad.Segment class="[&_path]:fill-foreground absolute inset-0 [&_path]:stroke-none" />
		<SignaturePad.Guide
			class="border-border text-muted-foreground absolute right-4 bottom-3 left-4 h-px border-b border-dashed text-xs"
		/>
	</SignaturePad.Control>
	<div class="flex justify-end">
		<SignaturePad.ClearTrigger
			class="border-border text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-7 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition-colors"
		>
			Clear
		</SignaturePad.ClearTrigger>
	</div>
	<SignaturePad.Context>
		{#snippet render(api)}
			<SignaturePad.HiddenInput value={JSON.stringify(api().paths)} />
		{/snippet}
	</SignaturePad.Context>
	{@render children?.()}
</SignaturePad.Root>

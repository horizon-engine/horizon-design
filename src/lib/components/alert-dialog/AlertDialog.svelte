<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		trigger,
		triggerClass = '',
		title,
		description,
		cancelLabel = 'Cancel',
		actionLabel = 'Confirm',
		cancelClass = '',
		actionClass = '',
		children,
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		description?: string;
		cancelLabel?: string;
		actionLabel?: string;
		cancelClass?: string;
		actionClass?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.Root closeOnInteractOutside={false} {...rest}>
	<Dialog.Trigger class={cn(triggerClass)} data-slot="alert-dialog-trigger">
		{@render trigger?.()}
	</Dialog.Trigger>
	<Dialog.Backdrop
		class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out bg-overlay-bg fixed inset-0 z-60 backdrop-blur-sm"
	/>
	<Dialog.Positioner class="fixed inset-0 z-70 flex items-center justify-center p-4">
		<Dialog.Content
			role="alertdialog"
			class="data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-card relative w-full max-w-md rounded-xl border shadow-2xl backdrop-blur-xl"
			data-slot="alert-dialog-content"
		>
			<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="alert-dialog-header">
				{#if title}
					<Dialog.Title
						class="text-lg leading-none font-semibold tracking-tight"
						data-slot="alert-dialog-title"
					>
						{title}
					</Dialog.Title>
				{/if}
				{#if description}
					<Dialog.Description
						class="text-muted-foreground text-sm"
						data-slot="alert-dialog-description"
					>
						{description}
					</Dialog.Description>
				{/if}
			</div>
			{#if children}
				<div class="p-6 pt-4" data-slot="alert-dialog-body">
					{@render children()}
				</div>
			{/if}
			<div class="flex items-center justify-end gap-2 p-6 pt-4" data-slot="alert-dialog-footer">
				<Dialog.CloseTrigger
					class={cn(
						'focus-visible:ring-ring text-foreground border-border hover:bg-accent relative inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-lg border bg-transparent px-3 py-2 text-sm font-medium whitespace-nowrap shadow-sm transition-all outline-none focus-visible:ring-[3px]',
						cancelClass
					)}
					data-slot="alert-dialog-cancel"
				>
					{cancelLabel}
				</Dialog.CloseTrigger>
				<Dialog.CloseTrigger
					class={cn(
						'focus-visible:ring-ring bg-destructive text-destructive-foreground relative inline-flex h-8 shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap shadow-sm transition-all outline-none hover:opacity-90 focus-visible:ring-[3px]',
						actionClass
					)}
					data-slot="alert-dialog-action"
				>
					{actionLabel}
				</Dialog.CloseTrigger>
			</div>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog.Root>

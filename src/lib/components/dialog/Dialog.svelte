<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	let {
		trigger,
		triggerClass = '',
		title,
		description,
		children,
		footer,
		showClose = true,
		class: className = '',
		open = $bindable(false),
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		description?: string;
		children?: Snippet;
		footer?: Snippet;
		showClose?: boolean;
		class?: string;
		open?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Dialog.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Dialog.Trigger class={triggerClass || undefined} data-slot="dialog-trigger">
			{@render trigger()}
		</Dialog.Trigger>
	{/if}
	<Portal>
		<Dialog.Backdrop
			class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out bg-overlay-bg fixed inset-0 z-60 backdrop-blur-sm"
		/>
		<Dialog.Positioner class="fixed inset-0 z-70 flex items-center justify-center p-4">
			<Dialog.Content
				class={cn(
					'data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out border-border bg-card relative w-full max-w-lg rounded-xl border shadow-2xl backdrop-blur-xl',
					className
				)}
				data-slot="dialog-content"
			>
				{#if showClose}
					<Dialog.CloseTrigger
						class="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2"
						data-slot="dialog-close"
					>
						<MingcuteCloseLine class="size-4" />
						<span class="sr-only">Close</span>
					</Dialog.CloseTrigger>
				{/if}
				{#if title || description}
					<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="dialog-header">
						{#if title}
							<Dialog.Title
								class="text-lg leading-none font-semibold tracking-tight"
								data-slot="dialog-title"
							>
								{title}
							</Dialog.Title>
						{/if}
						{#if description}
							<Dialog.Description
								class="text-muted-foreground text-sm"
								data-slot="dialog-description"
							>
								{description}
							</Dialog.Description>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="p-6" data-slot="dialog-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div class="flex items-center justify-end gap-2 p-6 pt-0" data-slot="dialog-footer">
						{@render footer()}
					</div>
				{/if}
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>

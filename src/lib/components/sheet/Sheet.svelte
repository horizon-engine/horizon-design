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
		side = 'right',
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
		side?: 'top' | 'bottom' | 'left' | 'right';
		showClose?: boolean;
		class?: string;
		open?: boolean;
		[key: string]: unknown;
	} = $props();

	const sides: Record<string, string> = {
		top: 'inset-x-0 top-0 border-b data-[state=open]:animate-sheet-enter-top data-[state=closed]:animate-sheet-exit-top max-h-[80vh] w-full rounded-b-xl',
		bottom:
			'inset-x-0 bottom-0 border-t data-[state=open]:animate-sheet-enter-bottom data-[state=closed]:animate-sheet-exit-bottom max-h-[80vh] w-full rounded-t-xl',
		left: 'inset-y-0 left-0 border-r data-[state=open]:animate-sheet-enter-left data-[state=closed]:animate-sheet-exit-left h-full w-full max-w-sm rounded-r-xl',
		right:
			'inset-y-0 right-0 border-l data-[state=open]:animate-sheet-enter-right data-[state=closed]:animate-sheet-exit-right h-full w-full max-w-sm rounded-l-xl'
	};
</script>

<Dialog.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Dialog.Trigger class={triggerClass || undefined} data-slot="sheet-trigger">
			{@render trigger()}
		</Dialog.Trigger>
	{/if}
	<Portal>
		<Dialog.Backdrop
			class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out bg-overlay-bg fixed inset-0 z-60 backdrop-blur-sm"
		/>
		<Dialog.Positioner class="fixed inset-0 z-70 overflow-hidden">
			<Dialog.Content
				class={cn(
					'border-border bg-card absolute flex flex-col shadow-2xl',
					sides[side],
					className
				)}
				data-slot="sheet-content"
			>
				{#if showClose}
					<Dialog.CloseTrigger
						class="text-muted-foreground hover:text-foreground hover:bg-accent absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-md transition-colors"
						data-slot="sheet-close"
					>
						<MingcuteCloseLine class="size-4" />
					</Dialog.CloseTrigger>
				{/if}
				{#if title || description}
					<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="sheet-header">
						{#if title}
							<h2 class="text-lg leading-none font-semibold tracking-tight" data-slot="sheet-title">
								{title}
							</h2>
						{/if}
						{#if description}
							<p class="text-muted-foreground text-sm" data-slot="sheet-description">
								{description}
							</p>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="flex-1 overflow-auto p-6" data-slot="sheet-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div class="flex items-center gap-2 p-6 pt-0" data-slot="sheet-footer">
						{@render footer()}
					</div>
				{/if}
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>

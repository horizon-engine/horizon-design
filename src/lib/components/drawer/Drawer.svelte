<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Drawer } from '@ark-ui/svelte';
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

<Drawer.Root {open} onOpenChange={(details) => (open = details.open)} {...rest}>
	{#if trigger}
		<Drawer.Trigger class={triggerClass || undefined} data-slot="drawer-trigger">
			{@render trigger()}
		</Drawer.Trigger>
	{/if}
	<Portal>
		<Drawer.Backdrop
			class="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out bg-overlay-bg fixed inset-0 z-60 backdrop-blur-sm"
		/>
		<Drawer.Positioner class="fixed inset-0 z-70 flex justify-end overflow-hidden">
			<Drawer.Content
				class={cn(
					'data-[state=open]:animate-sheet-enter-right data-[state=closed]:animate-sheet-exit-right border-border bg-card flex h-full w-full max-w-sm flex-col border-l shadow-2xl',
					className
				)}
				data-slot="drawer-content"
			>
				{#if showClose}
					<Drawer.CloseTrigger
						class="text-muted-foreground hover:text-foreground hover:bg-accent absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-md transition-colors"
						data-slot="drawer-close"
					>
						<MingcuteCloseLine class="size-4" />
					</Drawer.CloseTrigger>
				{/if}
				{#if title || description}
					<div class="flex flex-col space-y-1.5 p-6 pb-0" data-slot="drawer-header">
						{#if title}
							<h2
								class="text-lg leading-none font-semibold tracking-tight"
								data-slot="drawer-title"
							>
								{title}
							</h2>
						{/if}
						{#if description}
							<p class="text-muted-foreground text-sm" data-slot="drawer-description">
								{description}
							</p>
						{/if}
					</div>
				{/if}
				{#if children}
					<div class="flex-1 overflow-auto p-6" data-slot="drawer-body">
						{@render children()}
					</div>
				{/if}
				{#if footer}
					<div class="flex items-center gap-2 p-6 pt-0" data-slot="drawer-footer">
						{@render footer()}
					</div>
				{/if}
			</Drawer.Content>
		</Drawer.Positioner>
	</Portal>
</Drawer.Root>

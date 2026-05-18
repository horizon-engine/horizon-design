<script lang="ts">
	import type { Snippet } from 'svelte';
	import { FloatingPanel } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';

	let {
		trigger,
		triggerClass = '',
		title,
		children,
		class: className = '',
		...rest
	}: {
		trigger?: Snippet;
		triggerClass?: string;
		title?: string;
		children?: Snippet;
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<FloatingPanel.Root {...rest}>
	<FloatingPanel.Trigger class={cn(triggerClass)} data-slot="floating-panel-trigger">
		{@render trigger?.()}
	</FloatingPanel.Trigger>
	<Portal>
		<FloatingPanel.Positioner class="z-80">
			<FloatingPanel.Content
				class={cn(
					'data-[state=open]:animate-zoom-in border-border bg-card w-80 overflow-hidden rounded-xl border shadow-2xl backdrop-blur-xl',
					className
				)}
				data-slot="floating-panel-content"
			>
				<FloatingPanel.Header
					class="border-border relative flex items-center justify-between border-b px-4 py-3"
					data-slot="floating-panel-header"
				>
					<FloatingPanel.DragTrigger class="absolute inset-0 cursor-grab active:cursor-grabbing" />
					{#if title}
						<FloatingPanel.Title
							class="text-foreground relative z-10 text-sm font-semibold"
							data-slot="floating-panel-title"
						>
							{title}
						</FloatingPanel.Title>
					{/if}
					<FloatingPanel.CloseTrigger
						class="text-muted-foreground hover:bg-accent hover:text-foreground relative z-10 inline-flex size-6 items-center justify-center rounded-md transition-colors"
						data-slot="floating-panel-close"
					>
						<MingcuteCloseLine class="size-3.5" />
					</FloatingPanel.CloseTrigger>
				</FloatingPanel.Header>
				{#if children}
					<div class="p-4" data-slot="floating-panel-body">
						{@render children()}
					</div>
				{/if}
			</FloatingPanel.Content>
		</FloatingPanel.Positioner>
	</Portal>
</FloatingPanel.Root>

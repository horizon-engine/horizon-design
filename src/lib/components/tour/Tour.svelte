<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tour, Portal, useTour, type TourStepDetails } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		steps = [],
		trigger,
		showProgress = true,
		showClose = true,
		lazyMount = true,
		unmountOnExit = true,
		...rest
	}: {
		steps?: TourStepDetails[];
		trigger?: Snippet<[() => void]>;
		showProgress?: boolean;
		showClose?: boolean;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
		[key: string]: unknown;
	} = $props();

	const tour = useTour(() => ({ steps }));

	function handleStart() {
		tour().start();
	}
</script>

<Tour.Root {lazyMount} {tour} {unmountOnExit} {...rest}>
	{#if trigger}
		{@render trigger(handleStart)}
	{/if}
	<Portal>
		<Tour.Backdrop
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 bg-overlay-bg fixed inset-0 z-90"
			data-slot="tour-overlay"
		/>
		<Tour.Positioner
			class="z-90 flex items-center justify-center data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=tooltip]:absolute"
			data-slot="tour-positioner"
		>
			<Tour.Content
				class={cn(
					'relative z-90 w-full max-w-md',
					'flex flex-col gap-4',
					'bg-background rounded-lg border shadow-lg',
					'focus:ring-0 focus:outline-none',
					'data-[state=closed]:animate-out data-[state=open]:animate-in',
					'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
					'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95'
				)}
				data-slot="tour-content"
			>
				{#if showClose}
					<Tour.CloseTrigger
						class="text-muted-foreground hover:bg-accent absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-lg border-none opacity-70 transition-all hover:opacity-100"
						data-slot="tour-close-trigger"
					>
						<MingcuteCloseLine class="size-4" />
						<span class="sr-only">Close</span>
					</Tour.CloseTrigger>
				{/if}

				<Tour.Context>
					{#snippet render(ctx)}
						{@const api = ctx()}
						<div class="flex flex-col gap-1.5 px-6 pt-6" data-slot="tour-header">
							<Tour.Title
								class="text-base leading-none font-semibold tracking-tight"
								data-slot="tour-title"
							>
								{api.step?.title}
							</Tour.Title>
							<Tour.Description class="text-muted-foreground text-sm" data-slot="tour-description">
								{api.step?.description}
							</Tour.Description>
						</div>
						<div class="px-6" data-slot="tour-body">
							{#if showProgress}
								<Tour.ProgressText
									class="text-muted-foreground text-sm"
									data-slot="tour-progress-text"
								/>
							{/if}
						</div>
						{#if (api.step?.actions ?? []).length > 0}
							<div
								class="flex items-center justify-between gap-2 px-6 pt-2 pb-6"
								data-slot="tour-footer"
							>
								<div class="flex flex-wrap gap-2" data-slot="tour-actions">
									{#each api.step?.actions ?? [] as action (action.label)}
										<Tour.ActionTrigger
											{action}
											class={cn(
												'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors',
												action.action === 'dismiss' || action.action === 'prev'
													? 'border-border hover:bg-accent hover:text-accent-foreground border bg-transparent'
													: 'bg-primary text-primary-foreground hover:bg-primary-faded'
											)}
											data-slot="tour-action-trigger"
										>
											{#if action.action === 'prev'}
												<MingcuteLeftLine class="size-3.5" />
											{/if}
											{action.label}
											{#if action.action === 'next'}
												<MingcuteRightLine class="size-3.5" />
											{/if}
										</Tour.ActionTrigger>
									{/each}
								</div>
							</div>
						{/if}
					{/snippet}
				</Tour.Context>
			</Tour.Content>
		</Tour.Positioner>
		<Tour.Spotlight class="border-primary z-90 border-2" data-slot="tour-spotlight" />
	</Portal>
</Tour.Root>

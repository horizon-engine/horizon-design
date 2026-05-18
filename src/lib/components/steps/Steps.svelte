<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Steps } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	interface StepConfig {
		title: string;
		content: Snippet;
	}

	let {
		steps = [],
		step = $bindable(),
		completedContent,
		prevLabel = 'Back',
		nextLabel = 'Next',
		class: className = '',
		...rest
	}: {
		steps?: StepConfig[];
		step?: number;
		completedContent?: Snippet;
		prevLabel?: string;
		nextLabel?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const count = $derived(steps.length);
</script>

<Steps.Root
	bind:step
	{count}
	class={cn('flex flex-col gap-4', className)}
	data-slot="steps"
	{...rest}
>
	<Steps.List class="flex w-full items-center gap-2" data-slot="steps-list">
		{#each steps as s, i (i)}
			<Steps.Item index={i} class="flex items-center gap-2" data-slot="steps-item">
				<Steps.Trigger
					class="hover:text-foreground text-muted-foreground data-[state=current]:text-foreground data-[state=complete]:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
					data-slot="steps-trigger"
				>
					<Steps.Indicator
						class="border-steps-indicator-border text-muted-foreground data-[state=complete]:bg-primary data-[state=complete]:border-primary data-[state=complete]:text-primary-foreground data-[state=current]:border-primary data-[state=current]:text-primary flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors"
						data-slot="steps-indicator"
					>
						{i + 1}
					</Steps.Indicator>
					<span class="hidden sm:inline">{s.title}</span>
				</Steps.Trigger>
				{#if i < steps.length - 1}
					<Steps.Separator
						class="bg-steps-separator data-[state=complete]:bg-primary h-0.5 flex-1 rounded-full transition-colors"
						data-slot="steps-separator"
					/>
				{/if}
			</Steps.Item>
		{/each}
	</Steps.List>

	{#each steps as s, i (i)}
		<Steps.Content index={i} data-slot="steps-content">
			{@render s.content()}
		</Steps.Content>
	{/each}

	{#if completedContent}
		<Steps.CompletedContent data-slot="steps-completed-content">
			{@render completedContent()}
		</Steps.CompletedContent>
	{/if}

	<div class="mt-4 flex gap-2">
		<Steps.PrevTrigger
			class="border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-60"
			data-slot="steps-prev-trigger"
		>
			{prevLabel}
		</Steps.PrevTrigger>
		<Steps.NextTrigger
			class="bg-primary text-primary-foreground shadow-glow-primary hover:bg-primary-hover inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-transparent px-3 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-60"
			data-slot="steps-next-trigger"
		>
			{nextLabel}
		</Steps.NextTrigger>
	</div>
</Steps.Root>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tabs } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	interface TabConfig {
		value: string;
		label: string | Snippet;
		content: Snippet;
	}

	type SizeConfig = { list: string; trigger: string };

	const sizes: Record<'sm' | 'md' | 'lg', SizeConfig> = {
		sm: {
			list: 'h-7',
			trigger: 'px-2 py-0.5 text-xs'
		},
		md: {
			list: 'h-9',
			trigger: 'px-3 py-1 text-sm'
		},
		lg: {
			list: 'h-11',
			trigger: 'px-4 py-1.5 text-base'
		}
	};

	let {
		tabs = [],
		variant = 'default',
		size = 'md',
		defaultValue,
		value = $bindable(undefined),
		class: className = '',
		...rest
	}: {
		tabs?: TabConfig[];
		variant?: 'default' | 'underline';
		size?: 'sm' | 'md' | 'lg';
		defaultValue?: string;
		value?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);

	function isSnippet(v: string | Snippet): v is Snippet {
		return typeof v === 'function';
	}
</script>

<Tabs.Root
	class={cn('flex flex-col gap-2', className)}
	data-slot="tabs"
	{defaultValue}
	{value}
	onValueChange={(details) => (value = details.value)}
	{...rest}
>
	<Tabs.List
		class={cn(
			'flex w-fit items-center gap-1',
			variant === 'default' && cn('text-muted-foreground bg-muted rounded-lg p-1', sz.list),
			variant === 'underline' && 'border-border gap-4 rounded-none border-b bg-transparent p-0',
			variant === 'underline' && sz.list
		)}
		data-slot="tabs-list"
		data-variant={variant}
	>
		{#if variant === 'underline'}
			<Tabs.Indicator
				class="bg-primary bottom-0 h-0.5 transition-all duration-200"
				data-slot="tabs-indicator"
			/>
		{/if}
		{#each tabs as tab (tab.value)}
			<Tabs.Trigger
				value={tab.value}
				class={cn(
					'focus-visible:ring-ring inline-flex items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
					sz.trigger,
					variant === 'default' &&
						'data-selected:bg-background data-selected:text-foreground rounded-md data-selected:shadow-sm',
					variant === 'underline' &&
						cn(
							'data-selected:border-primary data-selected:text-foreground rounded-none border-b-2 border-transparent pb-3',
							sz.list
						)
				)}
				data-slot="tabs-trigger"
			>
				{#if isSnippet(tab.label)}
					{@render tab.label()}
				{:else}
					{tab.label}
				{/if}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each tabs as tab (tab.value)}
		<Tabs.Content
			value={tab.value}
			class="focus-visible:ring-ring mt-2 outline-none focus-visible:rounded-md focus-visible:ring-2"
			data-slot="tabs-content"
		>
			{@render tab.content()}
		</Tabs.Content>
	{/each}
</Tabs.Root>

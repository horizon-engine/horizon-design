<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Switch } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	type SizeConfig = {
		control: string;
		thumb: string;
		checkedTranslate: string;
		iconPx: number;
		label: string;
	};

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', SizeConfig> = {
		sm: {
			control: 'h-4 w-7',
			thumb: 'size-3',
			checkedTranslate: 'data-[state=checked]:translate-x-3',
			iconPx: 10,
			label: 'text-xs'
		},
		md: {
			control: 'h-5 w-9',
			thumb: 'size-4',
			checkedTranslate: 'data-[state=checked]:translate-x-4',
			iconPx: 12,
			label: 'text-sm'
		},
		lg: {
			control: 'h-6 w-11',
			thumb: 'size-5',
			checkedTranslate: 'data-[state=checked]:translate-x-5',
			iconPx: 14,
			label: 'text-base'
		},
		xl: {
			control: 'h-7 w-13',
			thumb: 'size-6',
			checkedTranslate: 'data-[state=checked]:translate-x-6',
			iconPx: 16,
			label: 'text-lg'
		}
	};

	let {
		class: className = '',
		size = 'md',
		variant = 'default',
		label,
		checked = $bindable(undefined),
		checkedContent,
		uncheckedContent,
		children,
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		variant?: 'default' | 'secondary';
		label?: string;
		checked?: boolean;
		checkedContent?: Snippet;
		uncheckedContent?: Snippet;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const sz = $derived(sizes[size]);
</script>

<Switch.Root
	class={cn(
		'flex cursor-pointer items-center gap-2 data-disabled:pointer-events-none data-disabled:opacity-50',
		className
	)}
	data-slot="switch"
	{checked}
	onCheckedChange={(details) => (checked = details.checked)}
	{...rest}
>
	<Switch.Control
		class={cn(
			'focus-visible:ring-ring bg-input inline-flex shrink-0 items-center rounded-full border-2 border-transparent shadow-sm transition-colors outline-none focus-visible:ring-2',
			{
				'data-[state=checked]:bg-primary': variant === 'default',
				'data-[state=checked]:bg-accent': variant === 'secondary'
			},
			sz.control
		)}
	>
		<Switch.Thumb
			class={cn(
				'group bg-switch-thumb pointer-events-none flex items-center justify-center rounded-full shadow-lg ring-0 transition-transform',
				'data-[state=unchecked]:translate-x-0',
				sz.thumb,
				sz.checkedTranslate
			)}
		>
			{#if checkedContent}
				<span
					class={cn(
						'absolute scale-50 opacity-0 transition-all duration-200 group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100',
						{
							'data-[state=checked]:bg-primary': variant === 'default',
							'text-muted-foreground': variant === 'secondary'
						}
					)}
				>
					{@render checkedContent()}
				</span>
			{/if}
			{#if uncheckedContent}
				<span
					class="text-muted-foreground absolute scale-50 opacity-0 transition-all duration-200 group-data-[state=unchecked]:scale-100 group-data-[state=unchecked]:opacity-100"
				>
					{@render uncheckedContent()}
				</span>
			{/if}
		</Switch.Thumb>
	</Switch.Control>
	{#if label || children}
		<Switch.Label class={cn('leading-none font-medium', sz.label)}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</Switch.Label>
	{/if}
	<Switch.HiddenInput />
</Switch.Root>

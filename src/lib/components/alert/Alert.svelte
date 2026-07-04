<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';

	let {
		variant = 'default',
		title,
		description,
		icon,
		children,
		class: className = '',
		...rest
	}: {
		variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'destructive';
		title?: string;
		description?: string;
		icon?: Snippet;
		children?: Snippet;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const base = 'flex gap-3 items-start p-4 rounded-lg border backdrop-blur-sm shadow-glass';

	const variants: Record<string, string> = {
		default: 'bg-muted border-border',
		info: 'bg-info-subtle-bg border-info-subtle-border',
		success: 'bg-success-subtle-bg border-success-subtle-border',
		warning: 'bg-warning-subtle-bg border-warning-subtle-border',
		error: 'bg-destructive-subtle-bg border-destructive-subtle-border',
		destructive: 'bg-destructive-subtle-bg border-destructive-subtle-border'
	};
</script>

<div
	class={cn(base, variants[variant], className)}
	role="alert"
	data-slot="alert"
	data-variant={variant}
	{...rest}
>
	{#if icon}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			{@render icon()}
		</div>
	{:else if variant === 'info'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteInformationLine class="size-4" />
		</div>
	{:else if variant === 'success'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteCheckCircleLine class="size-4" />
		</div>
	{:else if variant === 'warning'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteAlertLine class="size-4" />
		</div>
	{:else if variant === 'error' || variant === 'destructive'}
		<div class="mt-0.5 shrink-0" data-slot="alert-icon">
			<MingcuteCloseCircleLine class="size-4" />
		</div>
	{/if}
	<div class="flex flex-col gap-0.5">
		{#if title}
			<h5 class="mb-1 leading-none font-semibold tracking-tight" data-slot="alert-title">
				{title}
			</h5>
		{/if}
		{#if description}
			<p class="text-sm opacity-90" data-slot="alert-description">{description}</p>
		{/if}
		{@render children?.()}
	</div>
</div>

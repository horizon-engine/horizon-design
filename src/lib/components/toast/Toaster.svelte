<script lang="ts">
	import { Toaster } from '@ark-ui/svelte';
	import Toast from './Toast.svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		toaster,
		...rest
	}: {
		class?: string;
		toaster: ReturnType<typeof import('@ark-ui/svelte').createToaster>;
		[key: string]: unknown;
	} = $props();
</script>

<Toaster
	{toaster}
	class={cn('pointer-events-none fixed right-4 bottom-4 z-100 w-full max-w-sm', className)}
	{...rest}
>
	{#snippet children(toast)}
		<Toast
			title={toast().title as string | undefined}
			description={toast().description as string | undefined}
			type={(toast().type as 'info' | 'success' | 'warning' | 'error') ?? 'info'}
		/>
	{/snippet}
</Toaster>

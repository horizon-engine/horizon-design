<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		variant = 'online',
		class: className = '',
		...rest
	}: {
		variant?: 'online' | 'offline' | 'away' | 'busy';
		class?: string;
		[key: string]: unknown;
	} = $props();

	const variants: Record<string, string> = {
		online: 'bg-success shadow-pulse-success',
		offline: 'bg-muted-foreground',
		away: 'bg-warning shadow-pulse-warning',
		busy: 'bg-destructive shadow-pulse-destructive'
	};
</script>

<span
	class={cn('inline-block size-2.5 rounded-full', variants[variant], className)}
	data-slot="status"
	data-variant={variant}
	aria-label={variant}
	{...rest}
></span>

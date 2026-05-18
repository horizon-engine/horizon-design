<script lang="ts">
	import { cn } from '$lib/utils';
	import MingcuteLoading3Fill from '~icons/mingcute/loading-3-fill';

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
		sm: 'size-3',
		md: 'size-4',
		lg: 'size-5',
		xl: 'size-6'
	};

	let {
		class: className = '',
		size = 'md',
		'aria-label': ariaLabel = 'Loading',
		...rest
	}: {
		class?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		'aria-label'?: string;
		[key: string]: unknown;
	} = $props();
</script>

<MingcuteLoading3Fill
	aria-label={ariaLabel}
	class={cn('animate-spin', sizes[size], className)}
	data-slot="spinner"
	role="status"
	{...rest}
/>

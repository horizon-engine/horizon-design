<script lang="ts">
	import { Avatar } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		src,
		alt = '',
		fallback,
		size = 'md',
		...rest
	}: {
		class?: string;
		src?: string;
		alt?: string;
		fallback?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		[key: string]: unknown;
	} = $props();

	const sizes: Record<string, string> = {
		sm: 'size-8 text-xs',
		md: 'size-10 text-sm',
		lg: 'size-12 text-base',
		xl: 'size-16 text-xl'
	};
</script>

<Avatar.Root
	class={cn('relative flex shrink-0 overflow-hidden rounded-full', sizes[size], className)}
	data-slot="avatar"
	{...rest}
>
	{#if src}
		<Avatar.Image
			{src}
			{alt}
			class="aspect-square size-full object-cover"
			data-slot="avatar-image"
		/>
	{/if}
	<Avatar.Fallback
		class="text-muted-foreground bg-muted flex size-full items-center justify-center rounded-full font-medium"
		data-slot="avatar-fallback"
	>
		{fallback ?? ''}
	</Avatar.Fallback>
</Avatar.Root>

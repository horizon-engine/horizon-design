<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'text-foreground [&>blockquote]:border-primary-subtle-border [&>blockquote]:text-muted-foreground [&>code]:bg-muted [&>hr]:border-border max-w-none [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic [&>code]:rounded [&>code]:px-1 [&>code]:py-0.5 [&>code]:font-mono [&>code]:text-sm [&>h1]:mb-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>hr]:my-4 [&>li]:mb-1 [&>ol]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-3 [&>p]:leading-relaxed [&>ul]:mb-3 [&>ul]:list-disc [&>ul]:pl-5',
		className
	)}
	data-slot="prose"
	{...rest}
>
	{@render children?.()}
</div>

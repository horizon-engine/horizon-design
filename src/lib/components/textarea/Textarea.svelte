<script lang="ts">
	import { Field } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		...rest
	}: {
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<Field.Textarea
	class={cn(
		'placeholder:text-muted-foreground border-border bg-input text-foreground flex min-h-20 w-full resize-y rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	data-slot="textarea"
	{...rest}
/>

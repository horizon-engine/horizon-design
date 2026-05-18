<script lang="ts">
	import { cn } from '$lib/utils';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	interface BreadcrumbItemConfig {
		label: string;
		href?: string;
	}

	let {
		items = [],
		class: className = '',
		...rest
	}: {
		items?: BreadcrumbItemConfig[];
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<nav class={cn(className)} aria-label="breadcrumb" data-slot="breadcrumb" {...rest}>
	<ol
		class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm"
		data-slot="breadcrumb-list"
	>
		{#each items as item, i (i)}
			<li class="inline-flex items-center gap-1.5" data-slot="breadcrumb-item">
				{#if item.href}
					<a
						class="hover:text-foreground transition-colors"
						href={item.href}
						data-slot="breadcrumb-link"
					>
						{item.label}
					</a>
				{:else}
					<span class="text-foreground font-medium" aria-current="page" data-slot="breadcrumb-page">
						{item.label}
					</span>
				{/if}
			</li>
			{#if i < items.length - 1}
				<li class="flex items-center" aria-hidden="true" data-slot="breadcrumb-separator">
					<MingcuteRightLine class="size-3" />
				</li>
			{/if}
		{/each}
	</ol>
</nav>

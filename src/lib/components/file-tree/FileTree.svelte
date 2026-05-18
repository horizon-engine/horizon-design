<script lang="ts">
	import { TreeView, type TreeCollection, type TreeNode } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import MingcuteFolder2Line from '~icons/mingcute/folder-2-line';
	import MingcuteFolderOpenLine from '~icons/mingcute/folder-open-line';
	import MingcuteFileLine from '~icons/mingcute/file-line';

	type AnyNode = TreeNode & { children?: AnyNode[]; name?: string; label?: string };

	let {
		class: className = '',
		collection,
		icon,
		selectedValue = $bindable<string[]>([]),
		expandedValue = $bindable<string[]>([]),
		focusedValue = $bindable<string | undefined>(undefined),
		onSelectionChange,
		onExpandedChange,
		onFocusChange,
		ref: rootRef
	}: {
		class?: string;
		collection: TreeCollection<TreeNode>;
		icon?: Snippet<[AnyNode]>;
		selectedValue?: string[];
		expandedValue?: string[];
		focusedValue?: string;
		onSelectionChange?: (details: { selectedValue: string[] }) => void;
		onExpandedChange?: (details: { expandedValue: string[] }) => void;
		onFocusChange?: (details: { focusedValue: string | null }) => void;
		ref?: Element;
	} = $props();

	let pivot = $state<string | null>(null);
	let containerEl = $state<HTMLElement | null>(null);

	function getVisibleLeafValues(): string[] {
		const result: string[] = [];
		function traverse(nodes: AnyNode[]) {
			for (const node of nodes) {
				const value = collection.getNodeValue(node as TreeNode);
				const isBranch = !!(node.children && node.children.length > 0);
				if (!isBranch) {
					result.push(value);
				} else if (expandedValue.includes(value)) {
					traverse(node.children!);
				}
			}
		}
		traverse((collection.rootNode as AnyNode).children ?? []);
		return result;
	}

	function handleClick(e: MouseEvent) {
		const target = e.target as Element;
		if (target.closest('[data-part="branch-trigger"]')) return;

		// Only leaf items are selectable in FileTree
		const itemEl = target.closest('[data-part="item"]');
		if (!itemEl) return;

		const value = itemEl.getAttribute('data-value');
		if (!value) return;

		e.stopPropagation();

		const isSelected = selectedValue.includes(value);

		if (isSelected) {
			const next = selectedValue.filter((v) => v !== value);
			selectedValue = next;
			if (next.length === 0) pivot = null;
			onSelectionChange?.({ selectedValue: next });
			return;
		}

		// Shift+click: range select
		if (e.shiftKey && pivot) {
			const visible = getVisibleLeafValues();
			const pivotIdx = visible.indexOf(pivot);
			const currIdx = visible.indexOf(value);
			if (pivotIdx !== -1 && currIdx !== -1) {
				const [start, end] = pivotIdx < currIdx ? [pivotIdx, currIdx] : [currIdx, pivotIdx];
				const range = visible.slice(start, end + 1);
				if (e.ctrlKey || e.metaKey) {
					// Ctrl+Shift: add range to existing selection
					const next = [...new Set([...selectedValue, ...range])];
					selectedValue = next;
					onSelectionChange?.({ selectedValue: next });
				} else {
					selectedValue = range;
					onSelectionChange?.({ selectedValue: range });
				}
				return;
			}
		}

		// Ctrl+click: add to selection
		if (e.ctrlKey || e.metaKey) {
			const next = [...selectedValue, value];
			selectedValue = next;
			pivot = value;
			onSelectionChange?.({ selectedValue: next });
			return;
		}

		// Plain click: select only this
		selectedValue = [value];
		pivot = value;
		onSelectionChange?.({ selectedValue: selectedValue });
	}

	$effect(() => {
		const el = containerEl;
		if (!el) return;
		el.addEventListener('click', handleClick, true);
		return () => el.removeEventListener('click', handleClick, true);
	});

	$effect(() => {
		function onOutsidePointerDown(e: PointerEvent) {
			if (!containerEl || containerEl.contains(e.target as Node)) return;
			selectedValue = [];
			pivot = null;
			onSelectionChange?.({ selectedValue: [] });
		}
		document.addEventListener('pointerdown', onOutsidePointerDown, true);
		return () => document.removeEventListener('pointerdown', onOutsidePointerDown, true);
	});
</script>

<div bind:this={containerEl} class={cn('flex flex-col text-sm', className)}>
	<TreeView.Root
		{collection}
		selectionMode="multiple"
		{selectedValue}
		{expandedValue}
		{focusedValue}
		onFocusChange={(details) => {
			focusedValue = details.focusedValue ?? undefined;
			onFocusChange?.(details);
		}}
		onExpandedChange={(details) => {
			expandedValue = details.expandedValue;
			onExpandedChange?.(details);
		}}
		class="flex flex-col"
		data-slot="file-tree"
		ref={rootRef}
	>
		<TreeView.Tree class="flex flex-col">
			{#each collection.rootNode.children ?? [] as node, i (i)}
				{@render renderNode(node as AnyNode, [i])}
			{/each}
		</TreeView.Tree>
	</TreeView.Root>
</div>

{#snippet renderNode(node: AnyNode, indexPath: number[])}
	<TreeView.NodeProvider {node} {indexPath}>
		<TreeView.NodeContext>
			{#snippet render(nodeState)}
				{#if node.children && node.children.length > 0}
					<TreeView.Branch class="flex flex-col" data-slot="file-tree-branch">
						<TreeView.BranchControl
							style="padding-left: calc(var(--depth) * 1rem)"
							class="hover:bg-muted flex w-full items-center py-1 pr-2 transition-colors"
							data-slot="file-tree-branch-control"
						>
							<TreeView.BranchTrigger class="flex flex-1 cursor-default items-center gap-1.5">
								<TreeView.BranchIndicator
									class="text-muted-foreground shrink-0 transition-transform data-[state=open]:rotate-90"
								>
									<MingcuteRightLine class="size-3.5" />
								</TreeView.BranchIndicator>
								{#if icon}
									{@render icon(node)}
								{:else if nodeState().expanded}
									<MingcuteFolderOpenLine class="text-primary size-4 shrink-0" />
								{:else}
									<MingcuteFolder2Line class="text-primary size-4 shrink-0" />
								{/if}
								<span class="truncate">{node.name ?? node.label ?? ''}</span>
							</TreeView.BranchTrigger>
						</TreeView.BranchControl>
						<TreeView.BranchContent
							class="data-[state=open]:animate-collapsible-open data-[state=closed]:animate-collapsible-close flex flex-col"
							data-slot="file-tree-branch-content"
						>
							{#each node.children as child, j (j)}
								{@render renderNode(child as AnyNode, [...indexPath, j])}
							{/each}
						</TreeView.BranchContent>
					</TreeView.Branch>
				{:else}
					<TreeView.Item
						style="padding-left: calc(var(--depth) * 1rem)"
						class="data-selected:bg-accent data-selected:text-accent-foreground hover:bg-muted flex w-full cursor-default items-center gap-2 py-1 pr-2 transition-colors"
						data-slot="file-tree-item"
					>
						{#if icon}
							{@render icon(node)}
						{:else}
							<MingcuteFileLine class="text-muted-foreground size-4 shrink-0" />
						{/if}
						<span class="truncate">{node.name ?? node.label ?? ''}</span>
					</TreeView.Item>
				{/if}
			{/snippet}
		</TreeView.NodeContext>
	</TreeView.NodeProvider>
{/snippet}

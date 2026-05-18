<script lang="ts">
	import { FileUpload } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteFileUploadLine from '~icons/mingcute/file-upload-line';

	let {
		class: className = '',
		label,
		accept,
		maxFiles,
		maxFileSize,
		...rest
	}: {
		class?: string;
		label?: string;
		accept?: string;
		maxFiles?: number;
		maxFileSize?: number;
		[key: string]: unknown;
	} = $props();
</script>

<FileUpload.Root
	class={cn('flex flex-col gap-3', className)}
	data-slot="file-upload"
	{accept}
	{maxFiles}
	{maxFileSize}
	{...rest}
>
	{#if label}
		<FileUpload.Label
			class="text-foreground block text-sm font-medium"
			data-slot="file-upload-label"
		>
			{label}
		</FileUpload.Label>
	{/if}
	<FileUpload.Dropzone
		class="border-border bg-muted-surface hover:bg-muted-surface-hover data-dragging:border-primary data-dragging:bg-primary-subtle-bg flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors outline-none"
		data-slot="file-upload-dropzone"
	>
		<MingcuteFileUploadLine class="text-muted-foreground size-8" />
		<div>
			<p class="text-foreground text-sm font-medium">Drop files here or click to browse</p>
			<p class="text-muted-foreground mt-1 text-xs">Drag and drop your files here</p>
		</div>
		<FileUpload.HiddenInput />
	</FileUpload.Dropzone>
</FileUpload.Root>

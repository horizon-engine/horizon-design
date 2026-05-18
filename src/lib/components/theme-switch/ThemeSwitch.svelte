<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteComputerFill from '~icons/mingcute/computer-fill';
	import MingcuteMoonStarsFill from '~icons/mingcute/moon-stars-fill';
	import MingcuteSunFill from '~icons/mingcute/sun-fill';
	import { theme, type ThemeMode } from '$lib/theme.svelte';

	let mounted = $state(false);
	onMount(() => (mounted = true));

	let {
		size = 'md',
		class: className = ''
	}: {
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	} = $props();

	function setThemeMode(next: ThemeMode) {
		if (!document.startViewTransition) {
			theme.set(next);
			return;
		}
		const style = document.createElement('style');
		style.textContent = '*:not([data-slot="theme-switch-thumb"]) { transition: none !important; }';
		document.head.appendChild(style);
		const t = document.startViewTransition(() => {
			flushSync(() => theme.set(next));
		});
		t.finished.finally(() => style.remove());
	}

	type SizeConfig = {
		thumb: string;
		iconPx: number;
		translateByMode: Record<ThemeMode, string>;
	};

	const sizes: Record<'sm' | 'md' | 'lg' | 'xl', SizeConfig> = {
		sm: {
			thumb: 'size-5',
			iconPx: 11,
			translateByMode: { system: 'translate-x-0', dark: 'translate-x-5', light: 'translate-x-10' }
		},
		md: {
			thumb: 'size-6',
			iconPx: 13,
			translateByMode: { system: 'translate-x-0', dark: 'translate-x-6', light: 'translate-x-12' }
		},
		lg: {
			thumb: 'size-7',
			iconPx: 15,
			translateByMode: { system: 'translate-x-0', dark: 'translate-x-7', light: 'translate-x-14' }
		},
		xl: {
			thumb: 'size-8',
			iconPx: 17,
			translateByMode: { system: 'translate-x-0', dark: 'translate-x-8', light: 'translate-x-16' }
		}
	};

	const sz = $derived(sizes[size]);

	type ModeConfig = {
		value: ThemeMode;
		IconComponent: typeof MingcuteComputerFill;
		label: string;
	};

	const modes: ModeConfig[] = [
		{ value: 'system', IconComponent: MingcuteComputerFill, label: 'System mode' },
		{ value: 'dark', IconComponent: MingcuteMoonStarsFill, label: 'Dark mode' },
		{ value: 'light', IconComponent: MingcuteSunFill, label: 'Light mode' }
	];
</script>

<div
	role="radiogroup"
	aria-label="Theme mode"
	class={cn(
		{ invisible: !mounted },
		'inline-flex rounded-full border-2 border-transparent select-none',
		'bg-input p-0.5 shadow-sm',
		className
	)}
>
	<div class="relative flex items-center">
		<div
			data-slot="theme-switch-thumb"
			class={cn(
				'bg-switch-thumb pointer-events-none absolute z-0 rounded-full shadow-md ring-0',
				{ 'transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]': mounted },
				sz.thumb,
				sz.translateByMode[theme.mode]
			)}
		></div>

		{#each modes as m (m.value)}
			<button
				type="button"
				role="radio"
				aria-checked={theme.mode === m.value}
				aria-label={m.label}
				class={cn(
					'relative z-10 flex cursor-pointer items-center justify-center rounded-full outline-none',
					'focus-visible:ring-ring focus-visible:ring-2',
					sz.thumb
				)}
				onclick={() => setThemeMode(m.value)}
			>
				<m.IconComponent
					width={sz.iconPx - 2}
					height={sz.iconPx - 2}
					class={cn({
						'text-primary': theme.mode === m.value && m.value === 'dark',
						'text-warning': theme.mode === m.value && m.value === 'light',
						'text-foreground': theme.mode === m.value && m.value === 'system',
						'text-foreground-dim': theme.mode !== m.value
					})}
				/>
			</button>
		{/each}
	</div>
</div>

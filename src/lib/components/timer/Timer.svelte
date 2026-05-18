<script lang="ts">
	import { Timer } from '@ark-ui/svelte';
	import MingcutePlayFill from '~icons/mingcute/play-fill';
	import MingcutePauseFill from '~icons/mingcute/pause-fill';
	import MingcuteRefresh2Line from '~icons/mingcute/refresh-2-line';
	import { cn } from '$lib/utils';

	const btnClass =
		'border-border hover:bg-accent inline-flex size-8 items-center justify-center rounded-lg border transition-colors';

	let {
		class: className = '',
		countdown = false,
		startMs = 0,
		autoStart = false,
		...rest
	}: {
		class?: string;
		countdown?: boolean;
		startMs?: number;
		autoStart?: boolean;
		[key: string]: unknown;
	} = $props();
</script>

<Timer.Root
	{countdown}
	{startMs}
	{autoStart}
	class={cn('flex flex-col items-center gap-4', className)}
	data-slot="timer"
	{...rest}
>
	<Timer.Context>
		{#snippet api(timer)}
			<div
				class="text-foreground flex items-center gap-1 font-mono text-3xl font-bold tabular-nums"
			>
				<span class="bg-muted rounded-lg px-3 py-2">{timer().formattedTime.hours}</span>
				<span class="text-muted-foreground">:</span>
				<span class="bg-muted rounded-lg px-3 py-2">{timer().formattedTime.minutes}</span>
				<span class="text-muted-foreground">:</span>
				<span class="bg-muted rounded-lg px-3 py-2">{timer().formattedTime.seconds}</span>
			</div>
			<div class="flex items-center gap-2">
				<Timer.ActionTrigger action="start" class={btnClass}>
					<MingcutePlayFill class="size-4" />
				</Timer.ActionTrigger>
				<Timer.ActionTrigger action="resume" class={btnClass}>
					<MingcutePlayFill class="size-4" />
				</Timer.ActionTrigger>
				<Timer.ActionTrigger action="pause" class={btnClass}>
					<MingcutePauseFill class="size-4" />
				</Timer.ActionTrigger>
				<Timer.ActionTrigger action="reset" class={btnClass}>
					<MingcuteRefresh2Line class="size-4" />
				</Timer.ActionTrigger>
			</div>
		{/snippet}
	</Timer.Context>
</Timer.Root>

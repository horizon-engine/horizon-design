import { getContext, setContext } from 'svelte';

const KEY = Symbol('circular-slider');

export interface CircularSliderContext {
	size: number;
	thickness: number;
	ringRadius: number;
	ringCircumference: number;
	thumbSize: number;
}

export function setCircularSliderContext(ctx: CircularSliderContext) {
	setContext(KEY, ctx);
}

export function getCircularSliderContext(): CircularSliderContext {
	return getContext(KEY);
}

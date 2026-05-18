export type ThemeMode = 'system' | 'dark' | 'light';

const STORAGE_KEY = 'horizon-theme';

function getSystemDark(): boolean {
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyMode(mode: ThemeMode) {
	const isDark = mode === 'dark' || (mode === 'system' && getSystemDark());
	document.documentElement.classList.toggle('light', !isDark);
}

function getInitialMode(): ThemeMode {
	if (typeof localStorage === 'undefined') return 'system';
	return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? 'system';
}

type ThemeChangeCallback = (resolved: 'dark' | 'light', mode: ThemeMode) => void;

class ThemeStore {
	mode = $state<ThemeMode>(getInitialMode());
	#listeners = new Set<ThemeChangeCallback>();

	get resolved(): 'dark' | 'light' {
		if (this.mode === 'dark') return 'dark';
		if (this.mode === 'light') return 'light';
		return getSystemDark() ? 'dark' : 'light';
	}

	init() {
		applyMode(this.mode);

		window.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			if (this.mode === 'system') {
				applyMode('system');
				this.#notify();
			}
		});
	}

	set(mode: ThemeMode) {
		this.mode = mode;
		localStorage.setItem(STORAGE_KEY, mode);
		applyMode(mode);
		this.#notify();
	}

	onChange(callback: ThemeChangeCallback): () => void {
		this.#listeners.add(callback);
		return () => this.#listeners.delete(callback);
	}

	#notify() {
		const resolved = this.resolved;
		for (const cb of this.#listeners) cb(resolved, this.mode);
	}
}

export const theme = new ThemeStore();

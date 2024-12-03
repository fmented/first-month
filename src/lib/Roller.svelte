<script lang="ts">
	import { onMount } from 'svelte';

	const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

	const BG = [
		'bg-primary text-primary-content',
		'bg-secondary text-secondary-content',
		'bg-accent text-accent-content',
		'bg-neutral text-neutral-content',
		'bg-warning text-warning-content',
		'bg-error text-error-content',
		'bg-success text-success-content',
		'bg-info text-info-content'
	];

	function randomBg() {
		return BG[Math.floor(Math.random() * BG.length)];
	}

	function randomBool() {
		return Math.random() < 0.5;
	}

	const {
		word = "I'M SORRY",
		number = false,
		easterEgg = false
	}: { word?: string; number?: boolean; easterEgg?: boolean } = $props();

	type Roll = {
		letter: string;
		unlock: boolean;
		bg?: string;
	};

	let roller: Roll[] = $state(
		removeNonAlphabetic(word)
			.split('')
			.map((char) => ({ letter: char, unlock: false }))
	);

	let easterEggReady = $derived.by(() => {
		return roller.every((r) => r.unlock) && easterEgg;
	});

	if (easterEgg) {
		roller.push({
			letter: '💕',
			unlock: false
		});
	}

	let els: HTMLElement[] = $state([]);

	function randomize(el: HTMLElement) {
		let shouldAnimate = true;

		if (shouldAnimate) {
			let currentBg = 'bg-primary text-primary-content';
			let nextBg = randomBg();
			let nowDuration = randomBetween(100, 3000);

			el.style.transitionDuration = `${nowDuration}ms`;

			function onEnd() {
				currentBg = nextBg;
				nextBg = randomBg();

				el.style.transitionDuration = `${randomBetween(100, 3000)}ms`;
				el.ontransitionend = onEnd;
				el.classList.replace(currentBg.split(' ')[0], nextBg.split(' ')[0]);
				el.classList.replace(currentBg.split(' ')[1], nextBg.split(' ')[1]);
			}
			el.ontransitionend = onEnd;

			el.classList.replace(currentBg.split(' ')[0], nextBg.split(' ')[0]);
			el.classList.replace(currentBg.split(' ')[1], nextBg.split(' ')[1]);
		}
	}

	function loc(str: string) {
		const lowerCaseA = 'a'.charCodeAt(0);

		if (!alphabet.toLowerCase().includes(str.toLowerCase())) return 0;

		return str
			.toLowerCase()
			.split('')
			.map((char) => char.charCodeAt(0) - lowerCaseA + 1);
	}

	function removeNonAlphabetic(str: string) {
		return str.replace(/[^a-zA-Z]/g, '');
	}

	export function unlock(n: number) {
		if (roller[n]) {
			if (roller[n].unlock) return;
			roller[n].unlock = true;
		}
	}

	export function roll() {
		for (let i = 0; i < roller.length; i++) {
			if (easterEgg && i === roller.length - 1) {
				setTimeout(
					() => {
						unlock(i);
					},
					alphabet.length * 200 + randomBetween(-100, 100)
				);
			} else unlock(i);
		}
	}

	function randomBetween(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function playAudio(e: Event) {
		if (!easterEggReady) return;
		try {
			// e.preventDefault();

			els = Array.from(document.querySelectorAll('[data-letter="true"]'));
			els.forEach((el) => {
				randomize(el);
			});
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		setTimeout(() => {
			roll();
		}, 50);
	});

	$effect(() => {
		if (easterEggReady) {
			setTimeout(() => {
				playAudio({} as Event);
			}, 500);
		}
	});
</script>

<div
	class="my-1 grid h-32 gap-1 overflow-y-hidden lg:justify-center lg:gap-3"
	style="grid-template-columns: repeat({roller.length}, 1fr);"
>
	{#each roller as r, i}
		<div
			class="letter relative flex h-32 flex-col bg-primary text-primary-content"
			class:unlock={r.unlock}
			style="--roller: {loc(r.letter)}; --random: {randomBetween(-100, 100)}ms;"
		>
			<div
				role="button"
				class="h-32 bg-primary py-8 text-center text-primary-content transition-all"
				class:text-[3rem]={!easterEgg ||
					i !== roller.length - 1 ||
					!roller[roller.length - 1].unlock}
				class:text-[1.75rem]={easterEgg &&
					i === roller.length - 1 &&
					roller[roller.length - 1].unlock}
				class:py-14={easterEgg && i === roller.length - 1 && roller[roller.length - 1].unlock}
				data-letter={easterEgg && i === roller.length - 1 && roller[roller.length - 1].unlock}
			>
				{easterEgg && i === roller.length - 1 && roller[roller.length - 1].unlock ? '💕' : '?'}
			</div>
			{#each alphabet as char, i}
				<div
					data-letter={char.toUpperCase() == r.letter.toUpperCase()}
					class="relative h-32 bg-primary py-8 text-center text-[3rem] text-primary-content transition-all"
				>
					<div class="h-32 min-h-32">{char}</div>
					{#if number}
						<div class="number absolute h-max">
							<span class="bg-accent px-1 text-xl text-accent-content">{i + 1}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.unlock {
		transform: translateY(calc(var(--roller) * -8rem));
	}

	.letter {
		--speed: calc(var(--random) + 200ms);
		transition: transform calc(var(--roller) * var(--speed)) ease-in-out;
	}

	.number {
		top: -1.8rem;
		width: 100%;
	}
</style>

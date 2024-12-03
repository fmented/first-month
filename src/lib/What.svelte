<script lang="ts">
	import Correct from './Correct.svelte';
	import Wrong from './Wrong.svelte';

	type Props = {
		question: string;
		correctAnswer: string | ((answer: string) => boolean);
	};

	let answers: string | null = $state(null);
	let confirmed: boolean = $state(false);

	let { question, correctAnswer }: Props = $props();

	let isCorrect: boolean = $derived.by(() => {
		if (!answers) return false;
		if (typeof correctAnswer === 'string') return answers.trim() === correctAnswer;
		return correctAnswer(answers.trim());
	});
</script>

<section class="p-4">
	<div class="lg:max-w-lg">
		<h2 class="text-xl font-bold">{question}</h2>

		<div class="flex flex-col">
			<div class="form-control">
				<label class="label cursor-pointer gap-2">
					<input
						type="text"
						class="input input-bordered w-full"
						readonly={confirmed}
						bind:value={answers}
						placeholder="Answer here"
					/>

					{#if confirmed}
						{#if isCorrect}
							<Correct />
						{:else}
							<Wrong />
						{/if}
					{/if}
				</label>
			</div>
		</div>
	</div>

	<div class="mt-2 flex flex-row-reverse lg:max-w-lg">
		<button
			class="btn btn-primary btn-md"
			onclick={() => (confirmed = true)}
			disabled={answers === null}>Confirm</button
		>
	</div>
</section>

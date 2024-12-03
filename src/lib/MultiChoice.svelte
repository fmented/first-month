<script lang="ts" generics="T extends Record<string, Option>">
	import Correct from './Correct.svelte';
	import type { Option, QuestionMultipleChoice } from './type';
	import Wrong from './Wrong.svelte';

	let answers: (keyof T)[] = $state([]);
	let confirmed: boolean = $state(false);

	let { question, options, correctAnswer }: Omit<QuestionMultipleChoice<T>, 'type'> = $props();
</script>

<section class="p-4">
	<div class="lg:max-w-lg">
		<h2 class="text-xl font-bold">{question}</h2>

		<div class="flex flex-col">
			{#each Object.entries(options) as [key, value]}
				<div class="form-control">
					<label class="label cursor-pointer">
						{#if typeof value === 'string' || value.type === 'text'}
							<span>{value}</span>
						{:else if value.type === 'image'}
							<img
								src={value.src}
								alt={value.label}
								style="aspect-ratio: {value.aspectRatio || 'auto'};"
							/>
						{:else if value.type === 'audio'}
							<audio src={value.src} controls></audio>
						{:else if value.type === 'video'}
							<video
								src={value.src}
								controls
								title={value.label}
								style="aspect-ratio: {value.aspectRatio || 'auto'};"
							>
								<track kind="captions" />
							</video>
						{:else if value.type === 'url'}
							<a href={value.url} title={value.label} target="_blank" rel="noopener noreferrer"
								>{value.label || value.url}</a
							>
						{/if}
						<input
							type="checkbox"
							class="radio"
							class:hidden={confirmed}
							disabled={confirmed}
							bind:group={answers}
							value={key}
						/>
						{#if confirmed && answers.includes(key as keyof T)}
							{#if correctAnswer.includes(key as keyof T)}
								<Correct />
							{:else}
								<Wrong />
							{/if}
						{/if}
					</label>
				</div>
			{/each}
		</div>
	</div>
	<div class="mt-2 flex flex-row-reverse lg:max-w-lg">
		<button
			class="btn btn-primary btn-md"
			disabled={answers.length === 0}
			onclick={() => (confirmed = true)}>Confirm</button
		>
	</div>
</section>
